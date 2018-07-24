import {Component} from '@angular/core';
import {NavController, Refresher, Events, ModalController} from 'ionic-angular'

import {ListService} from "./list.service";
import {ToolService} from "../../../util/tool.service";
import {AuthService} from "../../../util/auth.service";
import {ResponseData} from "../../../bean/responseData";

import {DetailPage} from '../detail/detail'

import * as moment from 'moment'
import {Operation} from "../../../bean/operation";
import {Order} from "../../../bean/order";
import {SignsPage} from "../sign/signs";
import {RememberService} from "../../../util/remember.service";


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
    private events:Events,
    private modalCtrl:ModalController,
    private rememberService:RememberService
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

  private userid;
  ngOnInit(){
    this.getDateString();
    this.authService.checkLogin().then((data:ResponseData)=>{
      console.log(data);
      this.userid=data.data.id;
      this.getOpCount();
      this.getData(this.userid).then((data:ResponseData)=>{
        let result=this.toolService.apiResult(data);
        if(result&&result.status==0){
          this.formatServerData(result.data);
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

  private eventListener(){
    this.events.subscribe('list sign:updated',()=>{
      this.allFalse();
    })
  }

  private getDateString(){
    let rememberDate=this.rememberService.getListDate();
    if(rememberDate!=null){
      this.today=rememberDate;
    }
    let year=this.today.getFullYear();
    let month=this.today.getMonth()+1;
    let day=this.today.getDate();
    this.todayString=year+'-'+(month<10?('0'+month):month)+'-'+(day<10?('0'+day):day);
  }

  private groups:Order[]=[];
  private opList:any[]=[];
  getData(userid:string){
    return new Promise((resolve,reject)=>{
      this.opList.splice(0,this.opList.length);
      let now=new Date(this.todayString);
      this.today=now;
      let date=this.today;
      switch(this.workStatus){
        case 'working':
          this.listService.getWorkingOpList(parseInt((date.getTime()/1000).toString()),userid).then(
            data=>{
              let result=this.toolService.apiResult(data);
              if(result&&result.status==0){
                for(let d of result.data){
                  moment.locale('zh_cn');
                  d.create_time_show=moment(d.create_time).fromNow();
                }
                resolve(data);
              }


            },
            error=>{
              reject(error);
            }
          );
          break;
        case 'done':
          this.listService.getDoneOpList(parseInt((date.getTime()/1000).toString()),userid).then(
            data=>{
              let result=this.toolService.apiResult(data);
              if(result&&result.status==0){
                resolve(data);
              }

            },
            error=>{
              reject(error);
            }
          );
          break;
        default:
          this.listService.getWorkingOpList(parseInt((date.getTime()/1000).toString()),userid).then(
            data=>{
              let result=this.toolService.apiResult(data);
              if(result&&result.status==0){
                for(let d of result.data){
                  moment.locale('zh_cn');
                  d.create_time_show=moment(d.create_time).fromNow();
                }
                resolve(data);
              }

            },
            error=>{
              reject(error);
            }
          );
          break;
      }
    })
  }

  formatServerData(data){
    let dateNow=new Date();
    let dateNowStamp=dateNow.getTime();
    for(let d of data){
      let operations:Operation[]=[];
      for(let op of d.operations){
        let operation:Operation={...op};
        let maxAction=this.maxAction(operation.actions);
        if(maxAction.start_time){
          if(maxAction.end_time){
            if(maxAction.end_time<=dateNowStamp){
              operation.progress_name='已收工';
              operation.progress_time=maxAction.end_time;
              operation.progress_status_code=2;
            }
            else{
              operation.progress_name='预计';
              operation.progress_time=maxAction.end_time;
              operation.progress_status_code=3;
            }

          }
          else{
            operation.progress_name='处理中';
            operation.progress_time=maxAction.start_time;
            operation.progress_status_code=1;
          }
        }
        else{
          operation.progress_name='已指派';
          operation.progress_time=maxAction.call_time;
          operation.progress_status_code=0;
        }
        operations.push(operation);
      }
      let groupObj=new Order(d.id,d.no,d.incoming_time,d.custom_phone,d.corporation.name,operations);
      //添加到signStatusArray中
      let signStatus={id:d.id,show:false};
      this.signStatusArray.push(signStatus);
      this.groups.push(groupObj);
    }
  }

  maxAction(actions){
    let maxStartTimeStamp=0;
    let actionReturn;
    for(let action of actions){
      if(action.start_time){
        if(action.start_time>maxStartTimeStamp){
          maxStartTimeStamp=action.start_time;
          actionReturn=action;
        }
      }
    }
    if(maxStartTimeStamp==0){
      return actions[0]
    }
    else{
      return actionReturn;
    }
  }

  getOpCount(){
    let now=new Date(this.todayString);
    this.today=now;
    let date=this.today;
    this.listService.getOpCount(parseInt((date.getTime()/1000).toString()),this.userid).then(
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
    this.getOpCount();
    this.getData(this.userid).then((data:ResponseData)=>{
      if(data.status==0){
        //this.listToGroup(data.data);
        this.formatServerData(data.data);
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
    let selectDate=new Date(e);
    this.rememberService.setListDate(selectDate);

    this.groups.splice(0,this.groups.length);
    this.getOpCount();
    this.getData(this.userid).then((data:ResponseData)=>{
      if(data.status==0){
        //this.listToGroup(data.data);
        this.formatServerData(data.data);
      }
      else{
        this.toolService.toast(data.message);
      }
    }).catch((error)=>{
      this.toolService.toast(error)
    });
  }

  statusChanged(e){
    this.groups.splice(0,this.groups.length);
    this.getOpCount();
    this.getData(this.userid).then((data:ResponseData)=>{
      if(data.status==0){
        //this.listToGroup(data.data);
        this.formatServerData(data.data);
      }
      else{
        this.toolService.toast(data.message);
      }
    }).catch((e)=>{
      this.toolService.toast(e)
    });
  }

  goToDetail(id,no){
    this.navCtrl.push(DetailPage,{
      id:id,
      no:no
    })
  }

  private infoModal;
  private signStatusArray=[];
  sign(orderId){

    this.operationIdArray.splice(0,this.operationIdArray.length);

    for(let status of this.signStatusArray){
      if(status.id==orderId){
        if(status.show){
          status.show=false;
        }
        else{
          //把所有的数组元素show属性都置否
          this.allFalse();
          status.show=true;
        }
        break;
      }
    }
  }

  allFalse(){
    for(let status of this.signStatusArray){
      status.show=false;
    }
  }

  showCheckbox(orderId){
    for(let status of this.signStatusArray){
      if(status.id==orderId&&status.show){
        return true;
      }
    }
    return false;
  }

  cancelCheck(orderId){
    for(let status of this.signStatusArray){
      if(status.id==orderId){
        status.show=false;
      }
    }
  }

  signCheckChanged(e,operationId){
    if(e.value){
      if(!this.isExistInOpArray(operationId))
        this.operationIdArray.push(operationId)
    }
    else{
      let noInArray=this.inArrayNo(operationId);
      if(noInArray>0){
        this.operationIdArray.splice(noInArray,1);
      }
    }
  }

  inArrayNo(id){
    let i=-1;
    for(let o of this.operationIdArray){
      if(o==id){
        return i+1;
      }
      i++;
    }
    return i;
  }

  isExistInOpArray(id){
    for(let o of this.operationIdArray){
      if(o==id){
        return true;
      }
    }
    return false;
  }

  private operationIdArray:string[]=[];
  saveSign(){
    console.log(this.operationIdArray);
    if(this.operationIdArray.length>0){
      this.infoModal=this.modalCtrl.create(SignsPage,{
        opList:this.operationIdArray
      });
      this.infoModal.present();
    }
    else{
      this.toolService.toast('请至少选择一个工单！')
    }


  }
}

