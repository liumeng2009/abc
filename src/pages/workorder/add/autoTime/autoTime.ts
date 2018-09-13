import {Component} from '@angular/core'
import {NavParams,Events,ViewController} from "ionic-angular";
import * as moment from 'moment'
import {ToolService} from "../../../../util/tool.service";

@Component({
  selector:'autotime-page',
  templateUrl:'autoTime.html'
})

export class AutoTimePage{
  constructor(
    private navParams:NavParams,
    private events:Events,
    private viewCtrl:ViewController,
    private toolService:ToolService
  ){

  }

  private startString=moment().format();
  private endString=moment().format();

  ngOnInit(){
    let opCount=this.navParams.data.opCount;
    let start=this.navParams.data.start;
    this.startString=moment(start).format();
    this.endString=moment(start).add(1,'h').format()
  }

  ionViewWillLeave(){

  }

  save(){
    console.log(this.startString);
    console.log(this.endString);

    let startStamp=moment(this.startString).valueOf();
    let endStamp=moment(this.endString).valueOf();

    if(endStamp-startStamp<1000*60*30){
      this.toolService.toast('起止间隔不建议低于30分钟！')
      return;
    }


    this.events.publish('op:cuttime',{
      start:this.startString,
      end:this.endString
    })
    this.viewCtrl.dismiss()
  }
}
