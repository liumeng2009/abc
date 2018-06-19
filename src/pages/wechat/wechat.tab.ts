import { Component } from '@angular/core';

import { WeChat } from './wechat';
import {IonicPage, NavController} from "ionic-angular";



@Component({
  templateUrl: 'wechat.tab.html'
})
export class WeChatPage {

  tab1Root = WeChat;

  constructor(
    private navCtrl:NavController
  ) {

  }

  onTabSelect(e){
    let index=e.index;
    switch(index){
      case 0:
        this.navCtrl.push('list');
        break;
      case 1:
        //this.navCtrl.push('wechat');
        break;
      case 2:
        this.navCtrl.push('setting');
        break;
      default:
        this.navCtrl.push('list');
        break;
    }
  }
}

