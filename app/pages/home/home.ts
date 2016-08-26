import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ListenPage} from "../listen/listen";
import {PlayPage} from "../play/play";

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(private navCtrl: NavController) {
  }

  clickPlay() {
    this.navCtrl.push(PlayPage);
  }

  clickListen() {
    this.navCtrl.push(ListenPage);
  }
}
