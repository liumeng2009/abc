import {Component} from '@angular/core'
import {IonicPage,NavController} from "ionic-angular";
import {User} from '../../bean/user'

@IonicPage({
  name:'login',
  segment:'login'
})

@Component({
  selector:'login',
  templateUrl:'login.html'
})

export class LoginComponent{
  constructor(private navCtrl:NavController){}

  private user:User=new User('','');

  loginSuccess(){
    this.navCtrl.push('list').then(()=>{
      console.log('login success');
    });
  }
}
