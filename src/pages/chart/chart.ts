import {Component} from '@angular/core'
import {NavController} from "ionic-angular";
import {Title} from '@angular/platform-browser';
import {TabsPage} from "../tabs/tab";
import {AuthService} from "../../util/auth.service";
import {ToolService} from "../../util/tool.service";
import {RememberService} from "../../util/remember.service";
import {User} from "../../bean/user";
import {PersonalBasicPage} from "./personal-basic";

@Component({
  selector:'chart-page',
  templateUrl:'chart.html'
})

export class ChartPage{
  constructor(
    private navCtrl:NavController,
    private authService:AuthService,
    private toolService:ToolService,
    private rememberService:RememberService,
    private title:Title
  ){

  }

  private user:User;
  ionViewWillEnter(){
    this.title.setTitle('数据统计')
    this.authService.getUserInfo().then(
      data=>{
        let result=this.toolService.apiResult(data)
        if(result){
          this.user={...result.data};
          let userRemember=this.rememberService.getUser();

          if(userRemember){

          }
          else{
            this.toolService.toast('登录成功');
          }
          this.rememberService.setUser(this.user);
        }
      },
      error=>{
        this.toolService.apiException(error);
      }
    )
  }

  backToTab(){
    this.navCtrl.push(TabsPage,{},{direction:'back'})
  }

  private personalBasicPage=PersonalBasicPage



}
