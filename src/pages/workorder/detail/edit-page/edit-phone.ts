import {Component} from '@angular/core';
import {NavController,Navbar,NavParams,Events,ViewController} from 'ionic-angular'
import {ToolService} from "../../../../util/tool.service";
import {PublicDataService} from "../../../../util/data/public-data.service";
import {Group} from "../../../../bean/Group";
import {Corporation} from "../../../../bean/Corporation";
import {DetailService} from "../detail.service";
import {ResponseData} from "../../../../bean/responseData";


@Component({
  templateUrl:'edit-phone.html',
  selector:'edit-phone'
})

export class EditSimplePage{
  constructor(
    private navParams: NavParams,
    private toolService:ToolService,
    private events:Events,
    private viewCtrl:ViewController,
    private detailService:DetailService
  ){
    this.listenToEvents();
  }

  private placeHolder;
  ngOnInit(){
    this.phone=this.navParams.data.inputValue;
    let action=this.navParams.data.action;
    switch (action){
      case 'phone':
        this.placeHolder='客户电话'
        break;
      case 'customname':
        this.placeHolder='客户称呼'
        break;
      default:
        this.placeHolder=''
        break;
    }
  }

  ionViewWillLeave(){
    this.events.unsubscribe('pop:shutdown')
  }
  listenToEvents(){
    this.events.subscribe('pop:shutdown',()=>{
      console.log('received');
      this.viewCtrl.dismiss();
    })
  }

  private phone;

  save(){
    let operationId=this.navParams.data.operationId;
    let action=this.navParams.data.action;
    this.detailService.editOperation({operationId:operationId,inputValue:this.phone,action:action}).then(
      data=>{
        if(data.status==0){
          this.toolService.toast(data.message);
          //发出通知，告诉modal页面，更新operation
          this.events.publish('operation:updated');
          this.viewCtrl.dismiss();
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
}
