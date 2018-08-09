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
import {RememberService} from "../util/remember.service";
import {ToolService} from "../util/tool.service";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = TabsPage;

  private user:User;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public events:Events,
    public authService:AuthService,
    public webSocketService:WebSocketService,
    public rememberService:RememberService,
    public toolService:ToolService
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

      this.webSocketService.createObservableSocket().subscribe(
        data=>{
          console.log(data);
          let dataJson=JSON.parse(data);
          //console.log(dataJson);
          if(dataJson.action){
            switch(dataJson.action){
              case 'sign complete':
                let signidOwn=this.rememberService.getSignId();
                if(signidOwn&&signidOwn==dataJson.signId){
                  this.events.publish('client sign complete',{ids:dataJson.ids});
                  this.toolService.toast('客户已签名');
                }
                break;
              default:
                break;
            }
          }
        },
        error=>{console.log(error);},
        ()=>{console.log('complete');}
      )

    });
  }
}

