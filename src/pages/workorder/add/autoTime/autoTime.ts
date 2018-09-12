import {Component} from '@angular/core'
import {NavParams} from "ionic-angular";
import * as moment from 'moment'

@Component({
  selector:'autotime-page',
  templateUrl:'autoTime.html'
})

export class AutoTimePage{
  constructor(
    private navParams:NavParams
  ){

  }

  private startString=moment().format();
  private endString=moment().format();
  ionViewWillEnter(){
    let opCount=this.navParams.data.opCount;
    let start=this.navParams.data.start;
    this.startString=moment(start).format();
    this.endString=moment(start).add(1,'h').format()
  }

  save(){
    console.log(this.startString);
    console.log(this.endString);
  }

  start_change(e){
    console.log(e);
  }
  end_change(e){
    console.log(e);
  }
}
