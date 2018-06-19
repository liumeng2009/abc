import { Component } from '@angular/core';

import { List } from './list';
import {IonicPage, NavController} from "ionic-angular";



@Component({
  templateUrl: 'list.tab.html'
})
export class ListPage {

  tab1Root = List;

  constructor(
    private navCtrl:NavController
  ) {

  }

  onTabSelect(e){
    let index=e.index;
    console.log(index);
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
