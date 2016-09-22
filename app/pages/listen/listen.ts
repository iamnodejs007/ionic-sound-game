import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SoundData} from "../../providers/sound-data/sound-data";
import {AudioTrackComponent, AudioTrackProgressComponent, AudioTrackProgressBarComponent, AudioTimePipe, AudioProvider} from 'ionic-audio/dist/ionic-audio';
import {AudioTrackPlayStopComponent} from "../../components/audio-track-play-stop/ionic-audio-track-play-component";

/*
 Generated class for the ListenPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/listen/listen.html',
  directives: [AudioTrackComponent, AudioTrackPlayStopComponent, AudioTrackProgressComponent, AudioTrackProgressBarComponent],
})
export class ListenPage {

  sounds: Array<{name: string,
    sounds: Array<{name: string, filename: string, description: string}>
  }> = [];

  allTracks:any[];

  constructor(private audioProvider:AudioProvider, private navCtrl: NavController, soundData: SoundData) {
    soundData.getCategorizedSounds().then(sounds=> {
      for(let cat in sounds){
        this.sounds.push({name:cat, sounds:sounds[cat]});
      }
    });
  }

  ngAfterContentInit() {
    // get all tracks managed by AudioProvider so we can control playback via the API
    this.allTracks = this.audioProvider.tracks;
  }
  ionViewWillLeave() {
    this.audioProvider.stop();
  }
}
