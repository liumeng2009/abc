import {Component,ViewChild} from '@angular/core';
import {NavController,Navbar,NavParams,IonicPage,Events} from 'ionic-angular'
import {AuthService} from "../../../util/auth.service";
import {Operation} from "../../../bean/operation";
import {DetailService} from "./detail.service";
import {ToolService} from "../../../util/tool.service";


@Component({
  templateUrl:'detail.html',
  selector:'detail'
})

export class DetailPage{
  constructor(
    private navCtrl:NavController,
    private navParams: NavParams,
    private authService:AuthService,
    private detailService:DetailService,
    private toolService:ToolService,
    private events:Events
  ){}


  private operation:Operation;
  ionViewWillEnter(){
    let id=this.navParams.data.id;
    console.log(id);
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

}
