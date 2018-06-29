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
  ){}

  ionViewWillEnter(){
    let operationId=this.navParams.get('operationId');
    let corporationId=this.navParams.get('corporationId');
    alert(operationId+' '+corporationId);
  }

}
