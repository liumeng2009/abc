import {Component} from '@angular/core';
import {NavParams,Events,ViewController} from 'ionic-angular'
import {ToolService} from "../../../util/tool.service";

@Component({
  templateUrl:'edit-password.html',
  selector:'edit-setting-password'
})

export class EditSettingPasswordPage{
  constructor(
    private navParams: NavParams,
    private toolService:ToolService,
    private events:Events,
    private viewCtrl:ViewController
  ){
  }

  private name:string='';
  ionViewWillEnter(){
    this.name=this.navParams.data.inputValue;
  }

  save(){
    /*    this.detailService.editOperation({operationId:operationId,inputValue:this.phone,action:action}).then(
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
        )*/
  }
}
