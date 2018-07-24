import {Component,ViewChild,ElementRef} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser'
import {NavController,NavParams,ViewController,Events} from 'ionic-angular'
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import {SignService} from "./sign.service";
import {ToolService} from "../../../util/tool.service";


@Component({
  templateUrl:'sign.html',
  selector:'signs',

})

export class SignsPage {
  constructor(
              private navParams: NavParams,
              private viewCtrl:ViewController,
              private signService:SignService,
              private toolService:ToolService,
              private events:Events
  ) {

  }
  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  private signaturePadOptions:any = {
    canvasWidth: 500,
    canvasHeight: 300
  }
  @ViewChild('head') head:ElementRef;
  @ViewChild('foot') foot:ElementRef;
  ngAfterViewInit() {
    let ops=this.navParams.get('opList');
    console.log(ops);
    this.calSignWH();
    this.signaturePad.clear();
  }

  calSignWH(){
    let hAll=window.document.body.clientHeight;
    let wAll=window.document.body.clientWidth;

    let headH=this.head.nativeElement.clientHeight;
    let itemH=this.foot.nativeElement.clientHeight;

    let h=hAll-itemH-headH-4;

    this.signaturePad.set('canvasWidth',wAll)
    this.signaturePad.set('canvasHeight',h)

    this.signaturePadOptions.canvasWidth=wAll;
    this.signaturePadOptions.canvasHeight=h;

  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    //console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    //console.log('begin drawing');
  }

  clear(){
    this.signaturePad.clear();
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  save(){
    let ops=this.navParams.get('opList');
    this.signService.saveSign({
      ids:ops,
      sign:this.signaturePad.toDataURL()
    }).then(
      data=>{
        let result=this.toolService.apiResult(data);
        this.toolService.toast(result.message);
        if(result&&result.status==0){
          this.events.publish('list sign:updated');
        }
      },
      error=>{
        this.toolService.toast(error)
      }
    )
  }


}
