import {Component,ViewChild,ElementRef} from '@angular/core'
import {Title} from '@angular/platform-browser'
import {AuthService} from "../../util/auth.service";
import {ToolService} from "../../util/tool.service";
import {RememberService} from "../../util/remember.service";
import {User} from "../../bean/user";
var echarts = require('echarts');

@Component({
  selector:'personal-basic-page',
  templateUrl:'personal-basic.html'
})

export class PersonalBasicPage{
  constructor(
    private title:Title,
    private authService:AuthService,
    private toolService:ToolService,
    private rememberService:RememberService
  ){

  }

  private user:User;
  @ViewChild('chart') chart:ElementRef;
  @ViewChild('chart2') chart2:ElementRef;
  ionViewWillEnter(){
    this.title.setTitle('个人基本数据统计');
    this.user=this.rememberService.getUser();
    if(this.user){
      this.getData();
    }
    else{
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

            this.getData();

          }
        },
        error=>{
          this.toolService.apiException(error);
        }
      )
    }
  }

  getData(){
    let my=echarts.init(this.chart.nativeElement);
    my.setOption({
      title: {
        text: '个人工单数'
      },
      tooltip: {},
      xAxis: {
        data: ['工单数']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5]
      }]
    });
    let my2=echarts.init(this.chart2.nativeElement);
    my2.setOption({
      title: {
        text: '个人工时数'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5]
      }]
    });
  }

}
