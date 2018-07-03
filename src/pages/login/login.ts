import {Component} from '@angular/core'
import {
  NavController,
  LoadingController
} from "ionic-angular";
import {User} from '../../bean/user'
import {LoginService} from "./login.service";
import {ToolService} from "../../util/tool.service";
import {CookieService} from "angular2-cookie/core";

import {TabsPage} from '../tabs/tab'

@Component({
  selector:'login',
  templateUrl:'login.html'
})

export class LoginPage{
  constructor(
    private navCtrl:NavController,
    private loadingCtrl:LoadingController,
    private cookieService:CookieService,
    private toolService:ToolService,
    private loginService:LoginService
  ){}

  private user:User=new User('','');

  login(){
    let loading=this.loadingCtrl.create({
      content:'请稍等...',
    });
    loading.present();
    this.loginService.login(this.user).then(
      data=>{
        loading.dismiss()
        console.log(data);
        if(data&&data.status==0){
          this.cookieService.put('optAppToken',data.data.token);
          console.log(data.data.name);
          this.navCtrl.push(TabsPage,{ev:data.data.name});
        }
        else{
          this.toolService.toast(data.message);
        }
      },
      error=>{
        loading.dismiss()
        this.toolService.toast(error);
      }
    )
  }
}
