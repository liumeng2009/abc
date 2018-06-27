import {Component,ViewEncapsulation} from '@angular/core';
import {NavController, Refresher, IonicPage,Events} from 'ionic-angular'

import {ListService} from "./list.service";
import {ToolService} from "../../../util/tool.service";
import {AuthService} from "../../../util/auth.service";
import {ResponseData} from "../../../bean/responseData";

import {DetailPage} from '../detail/detail'
import {LoginPage} from '../../login/login'

import * as moment from 'moment'
import {OperationGroup} from "../../../bean/OpGroup";
import {Operation} from "../../../bean/operation";


@Component({
  templateUrl:'list.html',
  selector:'page-list',

})

export class ListPage{
  constructor(
    private navCtrl:NavController,
    private listService:ListService,
    private toolService:ToolService,
    private authService:AuthService,
    private events:Events
  ){

  }

  private today=new Date();
  private todayString='';
  private workStatus='working';
  private statusCount={
    working:0,
    done:0,
    all:0
  }

  ngOnInit(){
    this.getTodayString();
    this.authService.checkLogin().then(()=>{
      this.getOpCount();
      this.getData().then((data:ResponseData)=>{
        if(data.status==0){
          this.listToGroup(data.data);
          console.log(this.groups);
        }
        else{
          this.toolService.toast(data.message);
        }
      }).catch((e)=>{
        this.toolService.toast(e);
      });
    }).catch((e)=>{
      this.toolService.toast(e.message);
      if(e.action&&e.action=='login'){
        //this.navCtrl.push(LoginPage);
        setTimeout(()=>{
          this.events.publish('user:logout');
        },0)
      }
    });
  }

  private getTodayString(){
    let year=this.today.getFullYear();
    let month=this.today.getMonth()+1;
    let day=this.today.getDate();
    this.todayString=year+'-'+(month<10?('0'+month):month)+'-'+(day<10?('0'+day):day);
  }

  private groups:OperationGroup[]=[];
  private opList:any[]=[];
  getData(){
    return new Promise((resolve,reject)=>{
      this.opList.splice(0,this.opList.length);
      let now=new Date(this.todayString);
      this.today=now;
      let date=this.today;
      switch(this.workStatus){
        case 'working':
          this.listService.getWorkingOpList(parseInt((date.getTime()/1000).toString())).then(
            data=>{
              if(data.status==0){
                this.statusCount.working=data.total;
                for(let d of data.data){
                  moment.locale('zh_cn');
                  d.create_time_show=moment(d.create_time).fromNow();
                }
              }
              resolve(data);
            },
            error=>{
              reject(error);
            }
          );
          break;
        case 'done':
          this.listService.getDoneOpList(parseInt((date.getTime()/1000).toString())).then(
            data=>{
              if(data.status==0){
                this.statusCount.done=data.total;
              }
              resolve(data);
            },
            error=>{
              reject(error);
            }
          );
          break;
        case 'all':
          this.listService.getAllOpList(parseInt((date.getTime()/1000).toString())).then(
            data=>{
              if(data.status==0){
                this.statusCount.all=data.total;
              }
              resolve(data);
            },
            error=>{
              reject(error);
            }
          );
          break;
        default:
          this.listService.getWorkingOpList(parseInt((date.getTime()/1000).toString())).then(
            data=>{
              resolve(data);
            },
            error=>{
              reject(error);
            }
          );
          break;
      }
    })
  }

  listToGroup(data){
    for(let d of data){
      let create_time_hour=moment(d.create_time).hour();
      let ExistResult=this.isHourExistInGroup(create_time_hour,this.groups);
      if(ExistResult){
        let op:Operation={...d};
        ExistResult.opList.push(op)
      }
      else{
        let opList:Operation[]=[];
        let op:Operation={...d};
        opList.push(op);
        let create_time_hour_show='上午 '+create_time_hour+':00'
        if(create_time_hour<12){

        }
        else if(create_time_hour==12){
          create_time_hour_show='中午 '+create_time_hour+':00'
        }
        else{
          create_time_hour_show='下午 '+(create_time_hour-12)+':00'
        }
        let g:OperationGroup=new OperationGroup(create_time_hour,create_time_hour_show,opList);
        this.groups.push(g);
      }
    }
  }

  isHourExistInGroup(hour,group:OperationGroup[]){
    if(group.length==0){
      return false;
    }
    else{
      for(let g of group){
        if(g.hour==hour){
          return g;
        }
      }
    }
    return false;
  }

  getOpCount(){
    let now=new Date(this.todayString);
    this.today=now;
    let date=this.today;
    this.listService.getOpCount(parseInt((date.getTime()/1000).toString())).then(
      data=>{
        if(data.status==0){
          this.statusCount=data.data;
        }
      },
      error=>{
        this.toolService.toast(error);
      }
    )
  }

  doRefresh(refresher:Refresher){
    this.groups.splice(0,this.groups.length);
    this.getData().then((data:ResponseData)=>{
      if(data.status==0){
        this.listToGroup(data.data);
        refresher.complete();
      }
      else{
        this.toolService.toast(data.message);
        refresher.complete();
      }
    }).catch((e)=>{
      this.toolService.toast(e);
      refresher.complete();
    })
  }

  canDateClick(){
    let date=new Date();
    let dateComp=new Date(date.getFullYear(),date.getMonth(),date.getDate(),0,0,0);
    let todayStamp=this.today.getTime();
    if(todayStamp<dateComp.getTime()){
      return true;
    }
    else{
      return false;
    }
  }

  ok(e){
    this.groups.splice(0,this.groups.length);
    this.getData().then((data:ResponseData)=>{
      if(data.status==0){
        this.listToGroup(data.data);
      }
      else{
        this.toolService.toast(data.message);
      }
    }).catch((e)=>{
      this.toolService.toast(e)
    });
  }

  statusChanged(e){
    this.groups.splice(0,this.groups.length);
    this.getData().then((data:ResponseData)=>{
      if(data.status==0){
        this.listToGroup(data.data);
      }
      else{
        this.toolService.toast(data.message);
      }
    }).catch((e)=>{
      this.toolService.toast(e)
    });
  }

  goToDetail(id){
    this.navCtrl.push(DetailPage,{
      id:id
    })
  }
}

