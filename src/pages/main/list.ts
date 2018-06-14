import {Component} from '@angular/core';
import {NavController,IonicPage,Refresher} from 'ionic-angular'
import {ListService} from "./list.service";
import {ToolService} from "../../util/tool.service";
import {AuthService} from "../../util/auth.service";
import {ResponseData} from "../../bean/responseData";

@IonicPage({
  name:'list',
  segment:'list'
})
@Component({
  templateUrl:'list.html'
})

export class List{
  constructor(
    private navCtrl:NavController,
    private listService:ListService,
    private toolService:ToolService,
    private authService:AuthService
  ){

  }

  private today=new Date();
  private todayString='';

  ngOnInit(){
    this.getTodayString();
    this.checkLogin().then(()=>{
      this.getData().then((data:ResponseData)=>{
        if(data.status==0){
          this.opList=data.data;
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
        this.navCtrl.push('login');
      }
    });
  }

  private getTodayString(){
    let year=this.today.getFullYear();
    let month=this.today.getMonth()+1;
    let day=this.today.getDate();
    this.todayString=year+'-'+(month<10?('0'+month):month)+'-'+(day<10?('0'+day):day);
  }

  checkLogin(){
    return new Promise((resolve,reject)=>{
      this.authService.getUserInfo().then(
        data=>{
          if(data&&data.status==0){
              resolve();
          }
          else{
            reject({message:data.message,action:'login'})
          }
        },
        error=>{
          reject({message:error});

        }
      )
    })
  }

  private opList:any[]=[];
  getData(){
    return new Promise((resolve,reject)=>{
      this.opList.splice(0,this.opList.length);
      let now=new Date(this.todayString);
      this.today=now;
      let date=this.today;
      this.listService.getOpListDay(parseInt((date.getTime()/1000).toString())).then(
        data=>{
          console.log(data);
          resolve(data);
        },
        error=>{
          reject(error);
        }
      )
    })
  }

  doRefresh(refresher:Refresher){
    this.getData().then((data:ResponseData)=>{
      if(data.status==0){
        this.opList=data.data;
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

  reduceOneDay(){
    let todayStamp=this.today.getTime();
    let newStamp=todayStamp-24*60*60*1000;
    let newDate=new Date(newStamp);
    this.today=newDate;
    this.getTodayString();
    this.getData().then((data:ResponseData)=>{
      if(data.status==0){
        this.opList=data.data;
      }
      else{
        this.toolService.toast(data.message);
      }
    }).catch((e)=>{
      this.toolService.toast(e)
    });
  }
  addOneDay(){
    let todayStamp=this.today.getTime();
    let newStamp=todayStamp+24*60*60*1000;
    let newDate=new Date(newStamp);
    this.today=newDate;
    this.getTodayString();
    this.getData().then((data:ResponseData)=>{
      if(data.status==0){
        this.opList=data.data;
      }
      else{
        this.toolService.toast(data.message);
      }
    }).catch((e)=>{
      this.toolService.toast(e)
    });
  }

  ok(e){
    this.getData().then((data:ResponseData)=>{
      if(data.status==0){
        this.opList=data.data;
      }
      else{
        this.toolService.toast(data.message);
      }
    }).catch((e)=>{
      this.toolService.toast(e)
    });
  }



}

