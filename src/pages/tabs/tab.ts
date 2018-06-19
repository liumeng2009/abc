import { Component } from '@angular/core';

import { List } from '../workorder/main/list';
import { WeChat } from '../wechat/wechat';
import { Setting } from '../settings/setting';
import {IonicPage} from "ionic-angular";
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

  constructor() {

  }

  onTabSelect(e){
    console.log(e);
  }
}
