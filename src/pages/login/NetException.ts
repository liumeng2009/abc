import {Component} from '@angular/core'
import {Events} from 'ionic-angular'

@Component({
  selector:'netException',
  templateUrl:'NetException.html'
})

export class NetExceptionPage{
  constructor(
    private events:Events
  ){

  }

  private isRetry:boolean=false;
  retry(){
    this.isRetry=true;
    this.events.publish('retry');
  }

  eventListener(){

  }
}
