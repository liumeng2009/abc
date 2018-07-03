import {Component} from '@angular/core';
import {NavController,Navbar,NavParams,IonicPage,Events,ViewController,PopoverController} from 'ionic-angular'
import {AuthService} from "../../../util/auth.service";
import {Operation} from "../../../bean/operation";
import {DetailService} from "./detail.service";
import {ToolService} from "../../../util/tool.service";
import {EditCorporationPage} from "./edit-page/edit-corporation";
import {EditSimplePage} from "./edit-page/edit-simple";
import {EditContentPage} from "./edit-page/edit-content";

@Component({
  templateUrl:'detail-modal.html',
  selector:'detail-modal'
})

export class DetailModalPage{
  constructor(
    private navParams: NavParams,
    private authService:AuthService,
    private detailService:DetailService,
    private toolService:ToolService,
    private events:Events,
    private viewCtrl:ViewController,
    private popupCtrl:PopoverController
  ){
    this.listenToEvents();
  }

  private operation:Operation;
  ionViewWillEnter(){
    let id=this.navParams.get('id');
    this.getData(id);
  }
  ionViewWillLeave(){
    console.log('canceled');
    this.events.unsubscribe('pop:shutdown')
  }


  getData(id){
    this.detailService.getOperation(id).then(
      data=>{
        if(data.status==0){
          this.operation={...data.data};
        }
        else{
          this.toolService.toast(data.message);
        }
      },
      error=>{
        this.toolService.toast(error);
      }
    )
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  listenToEvents(){
    this.events.subscribe('pop:shutdown',()=>{
      this.dismiss();
    })
    this.events.subscribe('operation:updated',()=>{
      let id=this.navParams.get('id');
      this.getData(id);
    })
  }

  openCorporationEditPage(opId,corpId,groupId){
    let popover=this.popupCtrl.create(EditCorporationPage,{
      operationId:opId,
      corporationId:corpId,
      groupId:groupId,
      action:'corporation'
    });
    popover.present();
  }

  openPhoneEditPage(opId,value){
    let popover=this.popupCtrl.create(EditSimplePage,{
      operationId:opId,
      inputValue:value,
      action:'phone'
    });
    popover.present();
  }
  openUserEditPage(opId,value){
    let popover=this.popupCtrl.create(EditSimplePage,{
      operationId:opId,
      inputValue:value,
      action:'customname'
    });
    popover.present();
  }
  openContentEditPage(opId,typecode,equipment,opid){
    let popover=this.popupCtrl.create(EditContentPage,{
      operationId:opId,
      typecode:typecode,
      equipment:equipment,
      businessId:opid,
      action:'op'
    });
    popover.present();
  }
}
