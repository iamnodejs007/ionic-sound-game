import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {NativeAudio} from 'ionic-native';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';


@Injectable()
export class SoundData {

  data: any;
  categorized_data: any = {};

  constructor(private http: Http) {
  };

  load() {
    if (this.data) {
      return Promise.resolve(true);
    }
    return new Promise(resolve => {
      this.http.get('data/sounds.json').subscribe(res => {
        this.data = res.json();
        this.data.map(item=> {
          NativeAudio.preloadComplex(item.filename, 'data/sounds/' + item.filename, 1, 1, 0);
          for (let cat of item.categories) {
            if (!(cat in this.categorized_data)) {
              this.categorized_data[cat] = [item]
            } else {
              this.categorized_data[cat].push(item);
            }
          }
        });
        resolve(true);
      });
    });
  }

  getCategories() {
    return this.load().then(()=> {
        let ret: string[] = [];
        for (let cat in this.categorized_data) {
          ret.push(cat);
        }
        return ret;
      }
    )
  }

  getSounds(category: string) {
    return this.load().then(()=> {
        if (category) {
          return this.categorized_data[category];
        } else {
          return this.data;
        }
      }
    )
  }

  getCategorizedSounds() {
    return this.load().then(()=> {
        return this.categorized_data;
      }
    )
  }


  getRandomSounds(category: string) {
    return this.getSounds(category).then(data=> {
      let items;
      if (data.length < 5) {
        items = _.shuffle(data);
      } else {
        items = _.sampleSize(data, 5);
      }
      return {
        "correct": items.pop(),
        "other_values": items
      }
    })
  }
}

