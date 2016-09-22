import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {HeartMonitor} from "../../components/heart-monitor/heart-monitor";
import {SoundData} from "../../providers/sound-data/sound-data";
import * as _ from "lodash";
import {IAudioTrack, AudioProvider} from 'ionic-audio/dist/ionic-audio';

/*
  Generated class for the PlayPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/play/play.html',
  directives: [HeartMonitor]
})
export class PlayPage {

  state:string = 'beating';
  sounds: Array<{name: string, filename: string, description: string}> = [];
  correct: string;
  is_playing = true;
  category:string = "";
  track: IAudioTrack;

  constructor(private navCtrl: NavController, navParams:NavParams, private soundData:SoundData, private audioProvider:AudioProvider) {
    this.category = navParams.get('category');
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
      this.track.pause();
      this.track.seekTo(0);
    }
    this.soundData.getRandomSounds(this.category).then(randomSounds=>{
      let s = [];
      randomSounds.other_values.forEach(val=>s.push(val));
      s.push(randomSounds.correct);
      this.correct = randomSounds.correct['filename'];
      this.track = this.audioProvider.create(randomSounds.correct);
      this.track.audio.addEventListener("ended", () => {
        this.track.seekTo(0);
        this.track.play();
      }, false);
      console.log(randomSounds.correct['filename']);
      this.sounds = _.shuffle(s);
      if(this.is_playing){
        this.track.play();
        this.state = 'beating';
      }
    });
  }

  setState(state:string){
    this.state = state;
  }

  toggle(){
    if(this.is_playing){
      console.log("stopping " + this.correct);
      this.track.pause();
      this.track.seekTo(0);
      this.is_playing = false;
      this.state = 'normal';

    }else{
      console.log("playing " + this.correct);
      this.track.play();
      this.is_playing = true;
      this.state = 'beating';

    }
  }

  ionViewWillLeave() {
    this.track.pause();
  }
}
