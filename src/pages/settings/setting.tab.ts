import { Component } from '@angular/core';

import { Setting } from './setting';
import {IonicPage, NavController} from "ionic-angular";



@Component({
  templateUrl: 'setting.tab.html'
})
export class SettingPage {

  tab1Root = Setting;

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
        this.navCtrl.push('wechat');
        break;
      case 2:
        //this.navCtrl.push('setting');
        break;
      default:
        this.navCtrl.push('list');
        break;
    }
  }
}

