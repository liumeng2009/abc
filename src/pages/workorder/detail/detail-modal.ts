import {Component} from '@angular/core';
import {NavController,Navbar,NavParams,IonicPage,Events,ViewController} from 'ionic-angular'
import {AuthService} from "../../../util/auth.service";
import {Operation} from "../../../bean/operation";
import {DetailService} from "./detail.service";
import {ToolService} from "../../../util/tool.service";


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
    private viewCtrl:ViewController
  ){}

  private operation:Operation;
  ionViewWillEnter(){
    let id=this.navParams.get('id');
    this.authService.checkLogin().then(()=>{
      this.getData(id);
    }).catch((e)=>{
      this.toolService.toast(e.message);
      if(e.action&&e.action=='login'){
        setTimeout(()=>{
          this.events.publish('user:logout');
        },0)
      }
    })
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
}
