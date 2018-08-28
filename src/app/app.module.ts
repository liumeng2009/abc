import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule} from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import {CookieService} from 'angular2-cookie/core'
import { SignaturePadModule } from 'angular2-signaturepad';

import { MyApp } from './app.component';
import {TabsPage} from '../pages/tabs/tab';
import {ListPage} from '../pages/workorder/main/list'
import {DetailPage} from '../pages/workorder/detail/detail'
import {DetailModalPage} from "../pages/workorder/detail/detail-modal"
import {LoginPage} from '../pages/login/login'
import {WeChatPage} from '../pages/wechat/wechat';
import {SettingPage} from '../pages/settings/setting'
import {PublicDataService} from '../util/data/public-data.service';
import {ListService} from '../pages/workorder/main/list.service'
import {LoginService} from '../pages/login/login.service'

import {ToolService} from "../util/tool.service";
import {AuthService} from "../util/auth.service";

import {PipesModule} from '../util/pipe/pipe.module';
import {DetailService} from "../pages/workorder/detail/detail.service";
import {EditCorporationPage} from "../pages/workorder/detail/edit-page/edit-corporation";
import {EditSimplePage} from "../pages/workorder/detail/edit-page/edit-simple";
import {EditContentPage} from "../pages/workorder/detail/edit-page/edit-content";
import {EditImportantPage} from "../pages/workorder/detail/edit-page/edit-important";
import {EditMarkPage} from "../pages/workorder/detail/edit-page/edit-mark";

import { Autosize} from '../util/autosize';
import {SignPage} from "../pages/workorder/sign/sign";
import {RememberService} from "../util/remember.service";
import {SignService} from "../pages/workorder/sign/sign.service";
import {SignsPage} from "../pages/workorder/sign/signs";
import {QrService} from "../pages/workorder/qrcode/qr.service";
import {QrPage} from "../pages/workorder/qrcode/qr";
import {WebSocketService} from "../util/WebSocketService";
import {AddPage} from "../pages/workorder/add/add";
import {ActionHelpPage} from "../pages/workorder/add/actionHelp";
import {AddService} from "../pages/workorder/add/add.service";
import {AddOpPage} from "../pages/workorder/addOp/addOp";
import {ChartPage} from "../pages/chart/chart";
import {PersonalBasicPage} from "../pages/chart/personal-basic";

@NgModule({
  declarations: [
    MyApp,

    TabsPage,
    ListPage,
    DetailPage,
    DetailModalPage,

    EditCorporationPage,
    EditSimplePage,
    EditContentPage,
    EditImportantPage,
    EditMarkPage,

    SignPage,
    SignsPage,
    QrPage,

    LoginPage,
    WeChatPage,
    SettingPage,

    AddPage,
    AddOpPage,
    ActionHelpPage,

    ChartPage,
    PersonalBasicPage,

    Autosize
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
        {component:DetailPage,name:'Detail',segment:'detail/:id',defaultHistory:[TabsPage]},
        {component:WeChatPage,name:'WeChat',segment:'wechat'},
        {component:SettingPage,name:'Setting',segment:'setting'},
        {component:LoginPage,name:'Login',segment:'login'},
        {component:AddPage,name:'Add',segment:'add',defaultHistory:[TabsPage]},
        {component:AddOpPage,name:'AddOp',segment:'addop',defaultHistory:[TabsPage]},
        {component:ChartPage,name:'Chart',segment:'chart'},
        {component:PersonalBasicPage,name:'PerBasic',segment:'chart/perbasic',defaultHistory:[ChartPage]}
      ]
    }),
    IonicStorageModule.forRoot(),
    PipesModule,
    SignaturePadModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ListPage,
    DetailPage,
    DetailModalPage,

    EditCorporationPage,
    EditSimplePage,
    EditContentPage,
    EditImportantPage,
    EditMarkPage,

    SignPage,
    SignsPage,
    QrPage,

    LoginPage,
    WeChatPage,
    SettingPage,

    AddPage,
    AddOpPage,
    ActionHelpPage,

    ChartPage,
    PersonalBasicPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CookieService,

    ListService,
    DetailService,
    LoginService,
    PublicDataService,
    RememberService,
    SignService,
    QrService,
    WebSocketService,
    AddService,

    AuthService,
    ToolService

  ]
})
export class AppModule {
  constructor(){

  }
}

/*important*/
//ionic-angular component datetime.js
/*DateTime.prototype.getValueOrDefault = function () {
  if (this.hasValue()) {
    return this._value;
  }
  var initialDateString = this.getDefaultValueDateString();
  var _default = {};
  updateDate(_default, initialDateString);
  _default.tzOffset=480;
  _default.hour=_default.hour+8;
  if(_default.hour>23){
    _default.day=_default.day+1;
    _default.hour=_default.hour-24;
  }
  return _default;
};*/
