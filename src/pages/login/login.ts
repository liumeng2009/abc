import {Component} from '@angular/core'
import {
  NavController
} from "ionic-angular";
import {User} from '../../bean/user'
import {LoginService} from "./login.service";
import {ToolService} from "../../util/tool.service";
import {CookieService} from "angular2-cookie/core";

import {TabsPage} from '../tabs/tab'

import * as moment from 'moment'

@Component({
  selector:'login',
  templateUrl:'login.html'
})

export class LoginPage{
  constructor(
    private navCtrl:NavController,
    private cookieService:CookieService,
    private toolService:ToolService,
    private loginService:LoginService
  ){}

  private user:User=new User('','');
  private isLoading:boolean=false;
  login(){
    if(!this.isLoading){
      this.isLoading=true;
      this.loginService.login(this.user).then(
        data=>{
          this.isLoading=false;
          console.log(data);
          if(data&&data.status==0){
            moment.locale('zh_cn');
            let date=moment().add(7, 'days');
            console.log(date);
            this.cookieService.put('optAppToken',data.data.token,{expires:date.toISOString()});
            console.log(data.data.name);
            this.navCtrl.push(TabsPage,{ev:data.data.name});
          }
          else{
            this.toolService.toast(data.message);
          }
        },
        error=>{
          this.isLoading=true;
          this.toolService.toast(error);
        }
      )
    }
  }
}
