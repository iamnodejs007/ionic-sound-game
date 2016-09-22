import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SoundData} from "../../providers/sound-data/sound-data";
import {NativeAudio} from "ionic-native";

/*
 Generated class for the ListenPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/listen/listen.html',
})
export class ListenPage {

  sounds: Array<{name: string,
    sounds: Array<{name: string, filename: string, description: string}>
  }> = [];

  constructor(private navCtrl: NavController, soundData: SoundData) {
    soundData.getCategorizedSounds().then(sounds=> {
      for(let cat in sounds){
        this.sounds.push({name:cat, sounds:sounds[cat]});
      }
    });
  }

  playItem(item) {
    console.log("playing " + item.filename);
    NativeAudio.play(item.filename, function () {
    });
  }
}
