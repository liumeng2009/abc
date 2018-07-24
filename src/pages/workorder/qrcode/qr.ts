import {Component} from '@angular/core';
import {NavParams,ViewController,Events} from 'ionic-angular'
import {ToolService} from "../../../util/tool.service";
import {QrService} from "./qr.service";


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
              private events:Events
  ) {

  }

  private qrcode:string;
  ngAfterViewInit() {
    let ops = this.navParams.get('opList');
    this.qrService.getQr().then(
      data=>{
        console.log(data);
        this.qrcode=data.data
      },
      error=>{
        this.toolService.toast(error)
      }
    )
  }

  dismiss(){
    this.events.publish('list sign:updated');
    this.viewCtrl.dismiss();
  }


}
