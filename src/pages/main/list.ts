import {Component} from '@angular/core';
import {NavController,IonicPage} from 'ionic-angular'
import {ListService} from "./list.service";
import {ToolService} from "../../util/tool.service";
import {AuthService} from "../../util/auth.service";

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

  ngOnInit(){
    this.checkLogin().then(()=>{
      this.getData();
    }).catch((e)=>{
      this.toolService.toast(e.message);
      if(e.action&&e.action=='login'){
        this.navCtrl.push('login');
      }
    });
  }

  checkLogin(){
    return new Promise((resolve,reject)=>{
      this.authService.getUserInfo().then(
        data=>{
          console.log(data);
          if(data&&data.status==0){
            console.log('完成验证');
            setTimeout(()=>{
              resolve();
            },5000)

          }
          else{
            reject({message:data.message,action:'login'})
          }
          //else{
          //  reject('123')
              //
              //this.navCtrl.push('login')

          //}
        },
        error=>{
          reject({message:error});

        }
      )
    })
  }

  private opList:any[];
  getData(){
    let date=new Date();
    this.listService.getOpListDay(parseInt((date.getTime()/1000).toString())).then(
      data=>{
        console.log(data.status);
        if(data.status==0){
          this.opList=data.data;
          console.log(this.opList);
        }
      },
      error=>{
        this.toolService.toast(error)
      }
    )
  }

  canDateClick(){
    let date=new Date();
    let dateComp=new Date(date.getFullYear(),date.getMonth(),date.getDate(),0,0,0);
    let todayStamp=this.today.getTime();
    if(todayStamp<dateComp){
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
    this.getData();
  }
  addOneDay(){
    let todayStamp=this.today.getTime();
    let newStamp=todayStamp+24*60*60*1000;
    let newDate=new Date(newStamp);
    this.today=newDate;
    this.getData();
  }



}

