import {Component,ViewChild} from '@angular/core';
import {NavController,NavParams,ViewController} from 'ionic-angular'
import { SignaturePad } from 'angular2-signaturepad/signature-pad';


@Component({
  templateUrl:'sign.html',
  selector:'sign',

})

export class SignPage {
  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private viewCtrl:ViewController
  ) {

  }
  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  private signaturePadOptions: Object = {
    'canvasWidth': 500,
    'canvasHeight': 300
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }


}
