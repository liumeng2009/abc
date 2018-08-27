import {Component} from '@angular/core'
import {NavController} from "ionic-angular";
import {TabsPage} from "../tabs/tab";
import {AuthService} from "../../util/auth.service";
import {ToolService} from "../../util/tool.service";
import {RememberService} from "../../util/remember.service";
import {User} from "../../bean/user";

@Component({
  selector:'chart-page',
  templateUrl:'chart.html'
})

export class ChartPage{
  constructor(
    private navCtrl:NavController,
    private authService:AuthService,
    private toolService:ToolService,
    private rememberService:RememberService
  ){

  }

  private user:User;
  ionViewWillEnter(){
    this.authService.getUserInfo().then(
      data=>{
        let result=this.toolService.apiResult(data)
        if(result){
          this.user={...result};
          let userRemember=this.rememberService.getUser();

          if(userRemember!=null){

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
    this.navCtrl.push(TabsPage)
  }



}
