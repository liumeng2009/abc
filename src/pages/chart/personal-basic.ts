import {Component,ViewChild,ElementRef} from '@angular/core'
import {Title} from '@angular/platform-browser'
import {AuthService} from "../../util/auth.service";
import {ToolService} from "../../util/tool.service";
import {User} from "../../bean/user";
import * as echarts from 'echarts'
import * as moment from 'moment'
import {PopoverController,Events} from "ionic-angular";
import {DateSelectComponent} from "./date-select";
import {SearchDate} from "../../bean/searchDate";
import {ChartService} from "./chart.service";

@Component({
  selector:'personal-basic-page',
  templateUrl:'personal-basic.html'
})

export class PersonalBasicPage{
  constructor(
    private title:Title,
    private authService:AuthService,
    private toolService:ToolService,
    private popoverCtrl:PopoverController,
    private events:Events,
    private chartService:ChartService
  ){

  }

  private user:User;
  @ViewChild('chart') chart:ElementRef;
  @ViewChild('chart2') chart2:ElementRef;

  private chartObj1;
  private chartObj2;

  ionViewWillEnter(){
    this.title.setTitle('个人基本数据统计');
    this.addAppEventListener();
    //默认本月
    let startStamp=moment().startOf('month').valueOf();
    let endStamp=moment().endOf('month').valueOf();

    this.authService.checkAuth('simple').then((user:User)=>{
      this.user=user;
      this.initChart();
      this.getData(startStamp,endStamp);
    }).catch(()=>{})
  }

  private start:number=moment().startOf('month').valueOf();
  private end:number=moment().endOf('month').valueOf();
  addAppEventListener(){
    this.events.subscribe('data:search',(searchDate:SearchDate)=>{
      this.getData(searchDate.start,searchDate.end)
      this.searchText=this.getSearchText(searchDate.start,searchDate.end)
      this.start=searchDate.start;
      this.end=searchDate.end;
    })
  }

  initChart(){
    this.chartObj1=echarts.init(this.chart.nativeElement);
    this.chartObj1.setOption({
      title: {
        text: '个人工单数',
        textStyle:{
          fontSize:14
        },
        padding:10
      },
      series: [{
        type: 'pie',
        data: [0],
        center: ['50%', '50%'],
        label:{
          show:true,
          color:'#000',
          formatter: '{@[0]}个'
        }
      }]
    });

    this.chartObj2=echarts.init(this.chart2.nativeElement);
    this.chartObj2.setOption({
      title: {
        text: '个人工时数',
        textStyle:{
          fontSize:14
        },
        padding:10
      },
      series: [{
        type: 'pie',
        data: [0],
        label:{
          show:true,
          color:'#000',
          formatter: '{@[0]}分钟'
        }
      }]
    });
  }

  getData(start:number,end:number){
    this.chartObj1.showLoading('default',{text:'加载中...'});
    this.chartService.workerOpCount(this.user.id,start,end).then(
      data=>{
        let result=this.toolService.apiResult(data)
        if(result){
          this.chartObj1.hideLoading();
          this.chartObj1.setOption({
            series: [{
              data: [
                result.data
              ]
            }]
          })
        }
      },
      error=>{
        this.chartObj1.hideLoading();
        this.toolService.apiException(error)
      }
    )
    this.chartObj2.showLoading('default',{text:'加载中...'});
    this.chartService.workerOpStamp(this.user.id,start,end).then(
      data=>{
        let result=this.toolService.apiResult(data)
        if(result){
          this.chartObj2.hideLoading();
          this.chartObj2.setOption({
            series: [{
              data: [
                result.data
              ]
            }]
          })
        }
      },
      error=>{
        this.chartObj2.hideLoading();
        this.toolService.apiException(error)
      }
    )
  }

  search(){
    let popover = this.popoverCtrl.create(DateSelectComponent,{
      start:this.start,
      end:this.end
    });
    popover.present();
  }

  private searchText='本月';
  private getSearchText(start,end){
    let monthstart=moment().startOf('month').valueOf();
    let monthend=moment().endOf('month').valueOf();
    if(monthstart==start&&monthend==(end+999)){
      return '本月'
    }
    let yearstart=moment().startOf('year').valueOf();
    let yearend=moment().endOf('year').valueOf();
    if(yearstart==start&&yearend==(end+999)){
      return '本年度'
    }

    let startString=moment(start).format('YYYY-MM-DD')
    let endString=moment(end).format('YYYY-MM-DD')
    return startString+'到'+endString

  }

  refresh(){
    this.getData(this.start,this.end)
  }
}
