import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule} from '@angular/http';

import {CookieService} from 'angular2-cookie/core'

import { MyApp } from './app.component';
import {ListModule} from '../pages/main/list.module'
import {DetailModule} from '../pages/detail/detail.module'
import {LoginModule} from '../pages/login/login.module'
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

    ListModule,
    DetailModule,
    LoginModule
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
