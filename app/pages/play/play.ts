import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HeartMonitor} from "../../components/heart-monitor/heart-monitor";
import {SoundData} from "../../providers/sound-data/sound-data";
import * as _ from "lodash";
import {NativeAudio} from "ionic-native";

/*
  Generated class for the PlayPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/play/pla' +
  'y.html',
  directives: [HeartMonitor]
})
export class PlayPage {

  state:string = 'normal';
  sounds: Array<{name: string, filename: string, description: string}> = [];
  correct: string;
  is_playing = false;

  constructor(private navCtrl: NavController, private soundData:SoundData) {
    this.resetGame()
  }

  selectSound(filename:string){
    if(filename == this.correct){
      this.state = 'right';
    }else{
      this.state = 'wrong'
    }
    setTimeout(()=>{
      this.resetGame()
    }, 1500)
  }

  resetGame(){
    this.state = 'normal';
    if(this.is_playing && this.correct){
      NativeAudio.stop(this.correct);
    }
    this.soundData.getRandomSounds().then(randomSounds=>{
      let s = [];
      randomSounds.other_values.forEach(val=>s.push(val));
      s.push(randomSounds.correct);
      this.correct = randomSounds.correct['filename'];
      console.log(randomSounds.correct['filename']);
      this.sounds = _.shuffle(s);
      if(this.is_playing){
        NativeAudio.loop(this.correct);
      }
    });
  }

  setState(state:string){
    this.state = state;
  }

  clickPlay(){
    if(this.is_playing){
      console.log("stopping " + this.correct);
      NativeAudio.stop(this.correct);
      this.is_playing = false;
    }else{
      console.log("playing " + this.correct);
      NativeAudio.loop(this.correct);
      this.is_playing = true;
    }
  }
}
