import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ListenPage} from "../listen/listen";
import {PlayPage} from "../play/play";
import {SoundData} from "../../providers/sound-data/sound-data";


@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  categories: string[] = [];

  constructor(private navCtrl: NavController, private soundData:SoundData) {
    soundData.getCategories().then(categories=> {
      this.categories = categories;
    });
  }

  clickPlay(category:string) {
    this.navCtrl.push(PlayPage, {category: category});
  }

  clickListen() {
    this.navCtrl.push(ListenPage);
  }
}
