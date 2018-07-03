import {Component} from '@angular/core';
import {NavController,Navbar,NavParams,Events,ViewController} from 'ionic-angular'
import {ToolService} from "../../../../util/tool.service";
import {PublicDataService} from "../../../../util/data/public-data.service";
import {Group} from "../../../../bean/Group";
import {Corporation} from "../../../../bean/Corporation";
import {DetailService} from "../detail.service";
import {ResponseData} from "../../../../bean/responseData";


@Component({
  templateUrl:'edit-content.html',
  selector:'edit-content'
})

export class EditContentPage{
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

  save(){
    let operationId=this.navParams.data.operationId;
    let action=this.navParams.data.action;
    this.detailService.editOperation({operationId:operationId,action:action}).then(
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
