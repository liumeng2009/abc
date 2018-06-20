import { Component } from '@angular/core';

import { List } from '../workorder/main/list';
import { WeChat } from '../wechat/wechat';
import { Setting } from '../settings/setting';
import {IonicPage} from "ionic-angular";
import {NavParams} from "ionic-angular/index";
@IonicPage({
  name:'tab',
  segment:'tab'
})
@Component({
  templateUrl: 'tab.html'
})
export class TabsPage {

  tab1Root = List;
  tab2Root = WeChat;
  tab3Root = Setting;

  constructor(
    private navParams:NavParams
  ) {

  }

  ngOnInit(){
    let tabaction=this.navParams.get('tabaction');
    console.log(this.navParams);
    console.log(tabaction);
  }

  onTabSelect(e){
    console.log(e);
  }
}
