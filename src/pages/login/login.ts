import {Component} from '@angular/core'
import {IonicPage,
  NavController,
  ToastController,
  LoadingController
} from "ionic-angular";
import {User} from '../../bean/user'
import {LoginService} from "./login.service";
import {ToolService} from "../../util/tool.service";
import {CookieService} from "angular2-cookie/core";

@IonicPage({
  name:'login',
  segment:'login'
})

@Component({
  selector:'login',
  templateUrl:'login.html'
})

export class LoginComponent{
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
      duration: 500
    });
    loading.present();
    this.loginService.login(this.user).then(
      data=>{
        loading.dismiss()
        console.log(data);
        if(data&&data.status==0){
          this.cookieService.put('optAppToken',data.data.token);
          this.navCtrl.push('list');
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
