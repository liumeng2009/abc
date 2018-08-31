import {Component} from '@angular/core'
import {NavController} from "ionic-angular";
import {Title} from '@angular/platform-browser';
import {TabsPage} from "../tabs/tab";
import {AuthService} from "../../util/auth.service";
import {PersonalBasicPage} from "./personal-basic";
import {PersonalBkPage} from "./personal-bk";
import {PersonalAdvancePage} from "./personal-advance";
import {AllBasicPage} from "./all-basic";

@Component({
  selector:'chart-page',
  templateUrl:'chart.html'
})

export class ChartPage{
  constructor(
    private navCtrl:NavController,
    private authService:AuthService,
    private title:Title
  ){

  }

  ionViewWillEnter(){
    this.title.setTitle('数据统计')
    this.authService.checkAuth('normal').then(()=>{

    }).catch(()=>{})
  }

  backToTab(){
    this.navCtrl.push(TabsPage,{},{direction:'back'})
  }

  private personalBasicPage=PersonalBasicPage
  private personalBKPage=PersonalBkPage
  private personalAdvancePage=PersonalAdvancePage

  private allBasicPage=AllBasicPage
}
