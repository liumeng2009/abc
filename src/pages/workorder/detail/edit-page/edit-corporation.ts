import {Component} from '@angular/core';
import {NavController,Navbar,NavParams,IonicPage,Events,ViewController} from 'ionic-angular'
import {AuthService} from "../../../../util/auth.service";
import {ToolService} from "../../../../util/tool.service";


@Component({
  templateUrl:'edit-corporation.html',
  selector:'edit-corporation'
})

export class EditCorporationPage{
  constructor(
    private navParams: NavParams,
    private authService:AuthService,
    private toolService:ToolService,
    private events:Events,
    private viewCtrl:ViewController
  ){
    this.listenToEvents();
  }

  ionViewWillEnter(){
    let operationId=this.navParams.get('operationId');
    let corporationId=this.navParams.get('corporationId');
    console.log(operationId+' '+corporationId);
  }
  ionViewWillLeave(){
    // console.log('canceled');
    this.events.unsubscribe('pop:shutdown')
  }
  private subs;
  listenToEvents(){
    this.subs=this.events.subscribe('pop:shutdown',()=>{
      console.log('received');
      this.viewCtrl.dismiss();
    })
  }
}
