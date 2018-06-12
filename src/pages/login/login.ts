import {Component} from '@angular/core'
import {IonicPage,NavController,ToastController} from "ionic-angular";
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
    private cookieService:CookieService,
    private toolService:ToolService,
    private loginService:LoginService
  ){}

  private user:User=new User('','');

  login(){
    this.loginService.login(this.user).then(
      data=>{
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
        this.toolService.toast(error);
      }
    )
  }
}
