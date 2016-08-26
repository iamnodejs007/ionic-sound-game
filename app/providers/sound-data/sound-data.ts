import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {NativeAudio} from 'ionic-native';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

@Injectable()
export class SoundData {

  data: any;

  constructor(private http: Http) {}

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      this.http.get('data/sounds.json').subscribe(res => {
        this.data = res.json();
        this.data.map(item=>{
          NativeAudio.preloadComplex(item.filename, 'data/sounds/' + item.filename, 1, 1, 0);
        });
        resolve(this.data);
      });
    });
  }

  getSounds(){
    return this.load().then(data=>{
        return data
      }
    )
  }

  getRandomSounds(){
    return this.getSounds().then(data=>{
      let items = _.sampleSize(data, 5);
      return {
        "correct": items.pop(),
        "other_values": items
      }
    })
  }
}

