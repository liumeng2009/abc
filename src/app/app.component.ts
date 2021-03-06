import { Component,ViewChild } from '@angular/core';
import { Platform,Events,Nav,MenuController,PopoverController,AlertController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard'


import {CookieService} from "angular2-cookie/core";
import {TabsPage} from '../pages/tabs/tab'
import {AuthService} from "../util/auth.service";
import {User} from "../bean/user";
import {ResponseData} from "../bean/responseData";
import {WebSocketService} from "../util/WebSocketService";
import {RememberService} from "../util/remember.service";
import {ToolService} from "../util/tool.service";
import {OptConfig} from "../config/config";
import {PublicDataService} from "../util/data/public-data.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = TabsPage;

  private user:User;
  private serverPath:string=new OptConfig().serverPath;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyBoard:Keyboard,
    public events:Events,
    public authService:AuthService,
    public webSocketService:WebSocketService,
    public rememberService:RememberService,
    public toolService:ToolService,
    private cookieService:CookieService,
    private menuCtrl:MenuController,
    private publicDataService:PublicDataService,
    private alertCtrl:AlertController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      keyBoard.disableScroll(true);

      this.events.subscribe('user:logout',()=>{

        this.nav.setRoot('Login', {}).then(()=>{
          this.user=null;
        }).catch((err: any) => {
          console.log(`Didn't set nav root: ${err}`);

        });
      })

      //这个页面是程序入口，在这里获取user，其他页面都获取这个user
      this.events.subscribe('user:login',(user)=>{
        this.getUserInfo();
      })

      this.events.subscribe('userinfo:updated',()=>{
        this.getUserInfo();
      })

      this.events.subscribe('op:updated',()=>{
        //console.log('更新数据');
        this.getUserWorkData(this.user.id)
      })

      this.getUserInfo();

      this.webSocketService.createObservableSocket().subscribe(
        data=>{
          //console.log(data);
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

  getUserInfo(){
    this.authService.getUserInfo().then((data:ResponseData)=>{
      //let result=this.toolService.apiResult(data)
      if(data.status==0){
        this.user={...data.data};
        this.getUserWorkData(this.user.id);
      }
    }).catch((e)=>{

    })
  }

  private opCount=0;
  private opStamp=0;
  getUserWorkData(userid){
    if(userid){
      this.getOpCount(userid)
      this.getOpStamp(userid)
    }
  }

  getOpCount(userid){
    this.publicDataService.getWorkerOpCount(userid).then(
      data=>{
        if(data.status==0){
          this.opCount=data.data;
        }
      },
      error=>{

      }
    )
  }

  getOpStamp(userid){
      this.publicDataService.getWorkerOpStamp(userid).then(
        data=>{
          if(data.status==0){
            this.opStamp=data.data;
          }
        },
        error=>{

        }
      )

  }

  goData(){
    this.menuCtrl.close();
    //this.nav.push(ChartPage);
    this.nav.setRoot('Chart', {},{}).then(()=>{

    }).catch((err: any) => {
      console.log(`Didn't set nav root: ${err}`);
    });
  }

  goSettings(){
    this.menuCtrl.close();
    //this.nav.push(ChartPage);
    this.nav.setRoot('Setting', {},{}).then(()=>{

    }).catch((err: any) => {
      console.log(`Didn't set nav root: ${err}`);
    });
  }

  goAbout(){
    this.menuCtrl.close();
    //this.nav.push(ChartPage);
    this.nav.setRoot('About', {},{}).then(()=>{

    }).catch((err: any) => {
      console.log(`Didn't set nav root: ${err}`);
    });
  }

  exit(){
    let t=this;
    const confirm = this.alertCtrl.create({
      title: '确定?',
      message: '您确定要退出账户吗?',
      buttons: [
        {
          text: '取消',
          handler: () => {

          }
        },
        {
          text: '退出',
          handler: () => {
            t.user=null;
            t.cookieService.remove('optAppToken');
            t.nav.setRoot('Login', {}).then(()=>{}).catch((err: any) => {
              console.log(`Didn't set nav root: ${err}`);
            });
            t.menuCtrl.close();
          }
        }
      ]
    });
    confirm.present();
  }
}

