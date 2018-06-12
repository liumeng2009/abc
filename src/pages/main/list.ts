import {Component} from '@angular/core';
import {NavController,IonicPage} from 'ionic-angular'
import {ListService} from "./list.service";
import {ToastController} from "ionic-angular/index";
import {ToolService} from "../../util/tool.service";
import {AuthService} from "../../util/auth.service";

@IonicPage({
  name:'list',
  segment:'list'
})
@Component({
  templateUrl:'list.html'
})

export class List{
  constructor(
    private navCtrl:NavController,
    private listService:ListService,
    private toolService:ToolService,
    private authService:AuthService
  ){

  }

  private today=new Date();

  ngOnInit(){
    this.checkLogin();
  }

  checkLogin(){
    this.authService.getUserInfo().then(
      data=>{
        console.log(data);
        if(data&&data.status==0){
          //正常
        }
        else{
          this.toolService.toast(data.message);
          setTimeout(()=>{
            this.navCtrl.push('login');
          })
        }
      },
      error=>{
        this.toolService.toast(error);
      }
    )
  }



}

