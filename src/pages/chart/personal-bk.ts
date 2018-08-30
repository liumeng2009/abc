import {Component, ElementRef, ViewChild} from '@angular/core'
import {Title} from "@angular/platform-browser";
import {AuthService} from "../../util/auth.service";
import {ToolService} from "../../util/tool.service";
import {Events, PopoverController} from "ionic-angular";
import {ChartService} from "./chart.service";
import {User} from "../../bean/user";
import * as echarts from 'echarts'
import * as moment from "moment";
import {SearchDate} from "../../bean/searchDate";
import {DateSelectComponent} from "./date-select";

@Component({
  selector:'personal-bk-page',
  templateUrl:'personal-bk.html'
})

export class PersonalBkPage{
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

  private chartObj1;

  ionViewWillEnter(){
    this.title.setTitle('个人业务类别统计');
    this.calHeight();
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


  @ViewChild('head') head:ElementRef;
  @ViewChild('list') list:ElementRef;
  private canvasStyle={
    width:'100%',
    height:'0px'
  }
  calHeight(){
    let hAll=window.document.body.clientHeight;
    let wAll=window.document.body.clientWidth;

    let headH=this.head.nativeElement.clientHeight;
    let listH=this.list.nativeElement.clientHeight;

    let h=hAll-headH-listH;
    console.log(h);
    this.canvasStyle.height=(h-50)+'px'
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
      grid:{
        x:0,
        y:0,
        x2:0,
        y2:0,
      },
      xAxis: {
        type: 'value',
      },
      yAxis:{
        type:'category'
      },
      series: [{
        type: 'bar',
        barCategoryGap:'60%',
        data: []
/*        label:{
          show:true,
          color:'#000',
          formatter: '{b}:{@[0]}个'
        }*/
      }]
    });
  }
  getData(start:number,end:number){
    if(this.chartObj1)
      this.chartObj1.showLoading('default',{text:'加载中...'});
    this.chartService.workerEquipment(this.user.id,start,end).then(
      data=>{
        console.log(data);
        this.chartObj1.hideLoading();
        let result=this.toolService.apiResult(data)
        if(result){
          this.chartObj1.hideLoading();
          this.chartObj1.setOption({
            series: [{
              data: result.data
            }]
          })
        }
      },
      error=>{
        this.chartObj1.hideLoading();
        this.toolService.apiException(error)
      }
    )
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
    if(this.user)
      this.getData(this.start,this.end)
  }
  search(){
    let popover = this.popoverCtrl.create(DateSelectComponent,{
      start:this.start,
      end:this.end
    });
    popover.present();
  }
}
