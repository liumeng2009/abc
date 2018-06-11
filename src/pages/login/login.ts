import {Component} from '@angular/core'
import {IonicPage,NavController,ToastController} from "ionic-angular";
import {User} from '../../bean/user'
import {LoginService} from "./login.service";

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
    private toastCtrl:ToastController,
    private loginService:LoginService
  ){}

  private user:User=new User('','');

  login(){
    this.loginService.login(this.user).then(
      data=>{
        console.log(data);
        if(data&&data.status==0){
          this.navCtrl.push('list');
        }
        else{
          const toast = this.toastCtrl.create({
            message:data.message,
            duration: 3000,
            position:'top'
          });
          toast.present();
        }
      },
      error=>{
        console.log(error);
      }
    )
  }
}
