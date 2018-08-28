import {Component,ViewChild,ElementRef} from '@angular/core'
import {Title} from '@angular/platform-browser'
import {AuthService} from "../../util/auth.service";
import {ToolService} from "../../util/tool.service";
import {User} from "../../bean/user";
import * as echarts from 'echarts'
import {PopoverController} from "ionic-angular";
import {DateSelectComponent} from "./date-select";

@Component({
  selector:'personal-basic-page',
  templateUrl:'personal-basic.html'
})

export class PersonalBasicPage{
  constructor(
    private title:Title,
    private authService:AuthService,
    private toolService:ToolService,
    private popoverCtrl:PopoverController
  ){

  }

  private user:User;
  @ViewChild('chart') chart:ElementRef;
  @ViewChild('chart2') chart2:ElementRef;
  ionViewWillEnter(){
    this.title.setTitle('个人基本数据统计');
    this.authService.checkAuth('simple').then(()=>{
      this.getData();
    }).catch(()=>{})
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

  search(){
    let popover = this.popoverCtrl.create(DateSelectComponent);
    popover.present();
  }

}
