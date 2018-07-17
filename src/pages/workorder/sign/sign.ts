import {Component,ViewChild,ElementRef} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser'
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
    canvasWidth: 500,
    canvasHeight: 300
  }

  private no:string;
/*  @ViewChild('head') head:ElementRef;*/
  @ViewChild('foot') foot:ElementRef;
  ngAfterViewInit() {
    let type=this.navParams.get('type');
    this.no=this.navParams.get('no');
    this.calSignWH();
    this.signaturePad.clear();
  }

  calSignWH(){
    let hAll=window.document.body.clientHeight;
    let wAll=window.document.body.clientWidth;

    //let headH=this.head.nativeElement.clientHeight;
    let itemH=this.foot.nativeElement.clientHeight;

    let h=hAll-itemH;

    //this.signaturePadOptions.canvasWidth=wAll;
    //this.signaturePadOptions.canvasHeight=h;

    //console.log(h);
    this.signaturePad.set('canvasWidth',wAll)
    this.signaturePad.set('canvasHeight',h)

  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }

  clear(){
    this.signaturePad.clear();
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }


}
