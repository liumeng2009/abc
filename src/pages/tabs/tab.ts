import { Component } from '@angular/core';

import { List } from '../workorder/main/list';
import { WeChat } from '../wechat/wechat';
import { Setting } from '../settings/setting';

@Component({
  selector: 'lm-tab',
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
