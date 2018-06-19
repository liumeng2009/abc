import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule} from '@angular/http';

import {CookieService} from 'angular2-cookie/core'

import { MyApp } from './app.component';

import {TabModule} from '../pages/tabs/tab.module';
import {ListModule} from '../pages/workorder/main/list.module'
import {ListPageModule} from '../pages/workorder/main/list.tab.module'
import {DetailModule} from '../pages/workorder/detail/detail.module'
import {DetailPageModule} from '../pages/workorder/detail/detail.tab.module'
import {LoginModule} from '../pages/login/login.module'
import {WeChatModule} from '../pages/wechat/wechat.module';
import {WeChatPageModule} from '../pages/wechat/wechat.tab.module';
import {SettingModule} from '../pages/settings/setting.module'
import {SettingPageModule} from '../pages/settings/setting.tab.module'

import {ToolService} from "../util/tool.service";
import {AuthService} from "../util/auth.service";

import {PipesModule} from '../util/pipe/pipe.module';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),

    PipesModule,

    TabModule,
    ListModule,
    ListPageModule,
    DetailModule,
    DetailPageModule,
    LoginModule,
    WeChatModule,
    WeChatPageModule,
    SettingModule,
    SettingPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CookieService,

    AuthService,
    ToolService
  ]
})
export class AppModule {}
