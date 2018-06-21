import { Component } from '@angular/core';

import { ListPage } from '../workorder/main/list';
import { WeChatPage } from '../wechat/wechat';
import { SettingPage } from '../settings/setting';
import {IonicPage} from "ionic-angular";
import {NavParams} from "ionic-angular/index";

@Component({
  templateUrl: 'tab.html'
})
export class TabsPage {

  tab1Root = ListPage;
  tab2Root = WeChatPage;
  tab3Root = SettingPage;

  constructor(
    private navParams:NavParams
  ) {

  }

  ngOnInit(){

  }
}
