import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Song } from '../../models/song.interface';
import { FirestoreService } from '../../services/data/firestore.service';
import { Observable } from 'rxjs';
import { LoadingController, AlertController } from '@ionic/angular';
import { RouterModule, RouteReuseStrategy, Routes, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public song: Observable<Song>;
  public songId: string = this.route.snapshot.paramMap.get('id');
  //public albumName: string = this.route.snapshot.paramMap.get('albumName');
  public updateSongForm: FormGroup;
  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    public router : Router,
    public loadingCtrl: LoadingController,
    public alertController: AlertController,
    formBuilder: FormBuilder
  ) {

    this.updateSongForm = formBuilder.group({
      albumName: ['', Validators.nullValidator],
      artistName: ['', Validators.nullValidator],
      songDescription: ['', Validators.nullValidator],
      songName: ['', Validators.nullValidator],
    });

  }

  ngOnInit() {
    
    this.song = this.firestoreService.getSongDetail(this.songId).valueChanges();
  }

  async deleteSong() {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to delete the song?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: blah => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Okay',
          handler: () => {
              this.firestoreService.deleteSong(this.songId).then(() => {
              this.router.navigateByUrl('');
            });
          },
        },
      ],
    });
  
    await alert.present();
  }

  async updateSong(){
    const albumName = this.updateSongForm.value.albumName;
    const artistName = this.updateSongForm.value.artistName;
    const songDescription = this.updateSongForm.value.songDescription;
    const songName = this.updateSongForm.value.songName;
    const loading = await this.loadingCtrl.create();
    
    this.firestoreService
    .updateSong(this.songId,albumName,artistName,songDescription,songName)
    .then(
      () => {
        loading.dismiss().then(() => {
          this.router.navigateByUrl('');
        });
      },
      error => {
        console.error(error);
      }
    );
  
    return await loading.present();
    }
}
