import { Component } from '@angular/core';

import { ListPage } from '../workorder/main/list';
import { WeChatPage } from '../wechat/wechat';
import { SettingPage } from '../settings/setting';
import {NavParams} from "ionic-angular/index";
import {ToolService} from "../../util/tool.service";

@Component({
  templateUrl: 'tab.html'
})
export class TabsPage {

  tab1Root = ListPage;
  tab2Root = WeChatPage;
  tab3Root = SettingPage;

  constructor(
    private navParams:NavParams,
    private toolService:ToolService
  ) {

  }

  ngOnInit(){
    let name=this.navParams.get('ev');
    if(name&&name!='')
      this.toolService.toast(name+',欢迎您！')
  }
}
