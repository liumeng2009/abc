import {Injectable} from '@angular/core';
import {ToastController} from "ionic-angular/index";

@Injectable()
export class ToolService{
  constructor(public toastCtrl:ToastController){}

  toast(msg){
    const toast = this.toastCtrl.create({
      message:msg,
      duration: 3000,
      position:'top'
    });
    toast.present();
  }

}
