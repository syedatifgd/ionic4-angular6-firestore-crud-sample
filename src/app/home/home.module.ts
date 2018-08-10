import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { HomePage } from './home.page';

// import { Observable } from 'rx';
// import { Song } from '../models/song.interface';
// import { FirestoreService } from '../services/data/firestore.service';
// import { Router } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {

  // public songList;
  // constructor(
  //   private firestoreService: FirestoreService,
  //   private router: Router
  // ) {}

  // ionViewDidLoad() {
  //   this.songList = this.firestoreService.getSongList().valueChanges();
  // }

}
