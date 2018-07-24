import {Component} from '@angular/core';
import {NavParams,Events,ViewController,PopoverController} from 'ionic-angular'
import {AuthService} from "../../../util/auth.service";
import {Operation} from "../../../bean/operation";
import {DetailService} from "./detail.service";
import {ToolService} from "../../../util/tool.service";
import {EditCorporationPage} from "./edit-page/edit-corporation";
import {EditSimplePage} from "./edit-page/edit-simple";
import {EditContentPage} from "./edit-page/edit-content";
import {EditImportantPage} from "./edit-page/edit-important";
import {EditMarkPage} from "./edit-page/edit-mark";
import {SignService} from "../sign/sign.service";
import {SignPage} from "../sign/sign";
import {ModalController} from "ionic-angular/index";

@Component({
  templateUrl:'detail-modal.html',
  selector:'detail-modal'
})

export class DetailModalPage{
  constructor(
    private navParams: NavParams,
    private detailService:DetailService,
    private signService:SignService,
    private toolService:ToolService,
    private events:Events,
    private viewCtrl:ViewController,
    private popupCtrl:PopoverController,
    private modalCtrl:ModalController
  ){
    this.listenToEvents();
  }

  private operation:Operation;
  ionViewWillEnter(){
    let id=this.navParams.get('id');
    this.getData(id).then(()=>{}).catch(()=>{});
    this.getSign(id).then(()=>{}).catch(()=>{});
  }



  getData(id){
    return new Promise((resolve, reject)=>{
      this.detailService.getOperation(id).then(
        data=>{
          console.log(data);
          if(data.status==0){
            this.operation={...data.data};
            resolve();
          }
          else{
            this.toolService.toast(data.message);
            reject()
          }
        },
        error=>{
          this.toolService.toast(error);
          reject()
        }
      )
    })
  }

  private sign:string;
  getSign(id){
    return new Promise((resolve, reject)=>{
      this.signService.getSign(id).then(
        data=>{
          console.log(data);
          let result=this.toolService.apiResult(data);
          if(result&&result.status==0){
            this.sign=result.data;
            resolve();
          }
          else{
            this.toolService.toast(data.message)
            reject()
          }
        },
        error=>{
          this.toolService.toast(error);
          reject()
        }
      )
    })
  }
  doRefresh(e){
    let id=this.navParams.get('id');
    this.getData(id).then(()=>{
      this.getSign(id).then(()=>{
        e.complete();
      }).catch(()=>{
        e.complete();
      })
    }).catch(()=>{
      e.complete();
    })
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  listenToEvents(){
    this.events.subscribe('operation:updated',()=>{
      let id=this.navParams.get('id');
      this.getData(id);
    })
  }

  private popover;
  openCorporationEditPage(opId,corpId,groupId){
    this.popover=this.popupCtrl.create(EditCorporationPage,{
      operationId:opId,
      corporationId:corpId,
      groupId:groupId,
      action:'corporation'
    });
    this.popover.present();
  }

  openPhoneEditPage(opId,value){
    this.popover=this.popupCtrl.create(EditSimplePage,{
      operationId:opId,
      inputValue:value,
      action:'phone'
    });
    this.popover.present();
  }
  openUserEditPage(opId,value){
    this.popover=this.popupCtrl.create(EditSimplePage,{
      operationId:opId,
      inputValue:value,
      action:'customname'
    });
    this.popover.present();
  }
  openContentEditPage(opId,typecode,equipment,opid){
    this.popover=this.popupCtrl.create(EditContentPage,{
      operationId:opId,
      typecode:typecode,
      equipment:equipment,
      businessId:opid,
      action:'op'
    });
    this.popover.present();
  }
  openImportantEditPage(opId,important){
    this.popover=this.popupCtrl.create(EditImportantPage,{
      operationId:opId,
      inputValue:important
    });
    this.popover.present();
  }

  openMarkEditPage(opId,value){
    this.popover=this.popupCtrl.create(EditMarkPage,{
      operationId:opId,
      inputValue:value,
    });
    this.popover.present();
  }

  ngOnDestroy() {
    if(this.popover)
      this.popover.dismiss();
  }

  private infoModal;
  editSign(operationId){
    let id=this.navParams.get('id');
    this.infoModal=this.modalCtrl.create(SignPage,{
      opList:[id]
    });
    this.infoModal.present();
  }

}
