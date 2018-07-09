import {Component} from '@angular/core';
import {NavController,Navbar,NavParams,Events,ViewController} from 'ionic-angular'
import {ToolService} from "../../../../util/tool.service";
import {PublicDataService} from "../../../../util/data/public-data.service";
import {Group} from "../../../../bean/Group";
import {Corporation} from "../../../../bean/Corporation";
import {DetailService} from "../detail.service";
import {ResponseData} from "../../../../bean/responseData";


@Component({
  templateUrl:'edit-mark.html',
  selector:'edit-mark'
})

export class EditMarkPage{
  constructor(
    private navParams: NavParams,
    private toolService:ToolService,
    private events:Events,
    private viewCtrl:ViewController,
    private detailService:DetailService
  ){
    this.listenToEvents();
  }

  private remark;
  ngOnInit(){
    this.remark=this.navParams.data.inputValue;
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
    console.log(this.remark)
    let operationId=this.navParams.data.operationId;
    this.detailService.editOperation({operationId:operationId,inputValue:this.remark,action:'mark'}).then(
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
