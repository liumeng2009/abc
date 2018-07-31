import { Component,ViewChild } from '@angular/core';
import { Platform,Events,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { ListPage } from '../pages/workorder/main/list.tab';
import {TabsPage} from '../pages/tabs/tab'
import {AuthService} from "../util/auth.service";
import {User} from "../bean/user";
import {ResponseData} from "../bean/responseData";
import {WebSocketService} from "../util/WebSocketService";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = TabsPage;

  private user:User;

  private socketurl='ws://192.168.1.106:8102'

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public events:Events,
    public authService:AuthService,
    public webSocketService:WebSocketService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.events.subscribe('user:logout',()=>{
        this.nav.setRoot('Login', {}).then(()=>{}).catch((err: any) => {
          console.log(`Didn't set nav root: ${err}`);
        });
      })

      this.authService.getUserInfo().then((data:ResponseData)=>{
        if(data.status==0){
          this.user={...data.data};
        }
      }).catch((e)=>{
        console.log(e);
      })

      this.webSocketService.createObservableSocket(this.socketurl).subscribe(
        data=>{console.log(data);},
        error=>{console.log(error);},
        ()=>{console.log('complete');}
      )

    });
  }
}

