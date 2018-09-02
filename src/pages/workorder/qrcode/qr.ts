import {Component} from '@angular/core';
import {NavParams,ViewController,Events} from 'ionic-angular'
import {ToolService} from "../../../util/tool.service";
import {QrService} from "./qr.service";
import {RememberService} from "../../../util/remember.service";


@Component({
  templateUrl:'qr.html',
  selector:'qr',

})


export class QrPage {
  constructor(
              private navParams: NavParams,
              private viewCtrl: ViewController,
              private toolService: ToolService,
              private qrService:QrService,
              private events:Events,
              private rememberService:RememberService
  ) {

  }

  private qrcode:string;
  ionViewWillEnter() {
    let ops = this.navParams.get('opList');
    this.qrService.getQr({ids:ops}).then(
      data=>{
        let result=this.toolService.apiResult(data);
        if(result){
          this.qrcode=data.data.qr
          let signid=data.data.signid;
          this.rememberService.setSignId(signid);
        }
      },
      error=>{
        this.toolService.toast(error)
      }
    )
    this.addEventListener();
  }

  private listener1;
  addEventListener(){
    this.listener1=this.events.subscribe('client sign complete',()=>{
      this.dismiss();
    })
  }

  ionViewWillLeave(){
    try{
      this.listener1.unsubscribe();
    }
    catch(e){

    }
  }

  doRefresh(e){
    let ops = this.navParams.get('opList');
    this.qrService.getQr({ids:ops}).then(
      data=>{
        let result=this.toolService.apiResult(data);
        if(result){
          this.qrcode=data.data.qr
          let signid=data.data.signid;
          this.rememberService.setSignId(signid);
        }
        e.complete()
      },
      error=>{
        this.toolService.toast(error)
        e.complete()
      }
    )
  }

  dismiss(){
    this.events.publish('list sign:updated');
    this.viewCtrl.dismiss();
  }
}
