import { Component } from '@angular/core';

import { Detail } from './detail';
import {IonicPage, NavController} from "ionic-angular";

@IonicPage({
  name:'detail',
  segment:'detail'
})

@Component({
  templateUrl: 'detail.tab.html'
})
export class DetailPage {

  tab1Root = Detail;

  constructor(
    private navCtrl:NavController
  ) {

  }

  onTabSelect(e){
    let index=e.index;
    switch(index){
      case 0:
        //this.navCtrl.push('list');
        break;
      case 1:
        this.navCtrl.push('wechat');
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

