import {Component, Input} from '@angular/core';

/*
  Generated class for the HeartMonitor component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'heart-monitor',
  templateUrl: 'build/components/heart-monitor/heart-monitor.html',
  styles: ["ion-icon{font-size: 100px;}"]
})
export class HeartMonitor {

  @Input() state:string;

  constructor(){
  }
}
