import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule} from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import {CookieService} from 'angular2-cookie/core'

import { MyApp } from './app.component';

import {TabsPage} from '../pages/tabs/tab';
import {ListPage} from '../pages/workorder/main/list'
import {DetailPage} from '../pages/workorder/detail/detail'
import {DetailModalPage} from "../pages/workorder/detail/detail-modal"
import {LoginPage} from '../pages/login/login'
import {WeChatPage} from '../pages/wechat/wechat';
import {SettingPage} from '../pages/settings/setting'

import {ListService} from '../pages/workorder/main/list.service'
import {LoginService} from '../pages/login/login.service'

import {ToolService} from "../util/tool.service";
import {AuthService} from "../util/auth.service";

import {PipesModule} from '../util/pipe/pipe.module';
import {DetailService} from "../pages/workorder/detail/detail.service";
import {EditCorporationPage} from "../pages/workorder/detail/edit-page/edit-corporation";


@NgModule({
  declarations: [
    MyApp,

    TabsPage,
    ListPage,
    DetailPage,
    DetailModalPage,

    EditCorporationPage,

    LoginPage,
    WeChatPage,
    SettingPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages:true
    },{
      links:[
        {component:TabsPage,name:'TabsPage',segment:'main'},
        {component:ListPage,name:'List',segment:'list'},
        {component:DetailPage,name:'Detail',segment:'detail/:id',defaultHistory:[ListPage]},
        {component:WeChatPage,name:'WeChat',segment:'wechat'},
        {component:SettingPage,name:'Setting',segment:'setting'},
        {component:LoginPage,name:'Login',segment:'login'}
      ]
    }),
    IonicStorageModule.forRoot(),
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ListPage,
    DetailPage,
    DetailModalPage,

    EditCorporationPage,

    LoginPage,
    WeChatPage,
    SettingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CookieService,

    ListService,
    DetailService,
    LoginService,

    AuthService,
    ToolService
  ]
})
export class AppModule {}
