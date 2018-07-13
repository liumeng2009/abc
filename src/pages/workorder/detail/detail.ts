import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavParams, Events, ModalController, Refresher, PickerOptions, DateTime,AlertController} from 'ionic-angular'
import {AuthService} from "../../../util/auth.service";
import {Operation} from "../../../bean/operation";
import {DetailService} from "./detail.service";
import {ToolService} from "../../../util/tool.service";
import {DetailModalPage} from "./detail-modal";
import {ResponseData} from "../../../bean/responseData";
import * as moment from 'moment'


@Component({
  templateUrl:'detail.html',
  selector:'detail'
})

export class DetailPage{
  constructor(
    private navParams: NavParams,
    private authService:AuthService,
    private detailService:DetailService,
    private toolService:ToolService,
    private events:Events,
    private modalCtrl:ModalController,
    private alertCtrl:AlertController
  ){}

  private userid:string;
  private onlyMe:boolean=false;
  private operation:Operation;
  private operation_no:string;
  @ViewChild('startTime') startTimeSelect:ElementRef;
  ionViewWillEnter(){
    let id=this.navParams.data.id;
    let no=this.navParams.data.no;
    this.operation_no=no;
    console.log(id);
    this.authService.checkLogin().then((data:ResponseData)=>{
      this.userid=data.data.id;
      this.getData(id).then((data:ResponseData)=>{
        this.operation={...data.data};
        console.log(this.operation)
        this.formatData();
      }).catch((e)=>{
        this.toolService.toast(e)
      });
    }).catch((e)=>{
      this.toolService.toast(e.message);
      if(e.action&&e.action=='login'){
        setTimeout(()=>{
          this.events.publish('user:logout');
        },0)
      }
    })
  }

  @ViewChild('refresher') refresher:Refresher
  getData(id){
    return new Promise((resolve,reject)=>{
      this.detailService.getOperationAction(id).then(
        data=>{
          let result=this.toolService.apiResult(data);
          if(result&&result.status==0){
            //this.operation={...data.data};
            resolve(data)
          }
          else{
            reject(result.message)
          }
        },
        error=>{
          reject(error)
        }
      )
    })
  }

  private colors:string[]=[
  'ionic',
  'angular',
  'communication',
  'tooling',
  'services',
  'design',
  'workshop',
  'food',
  'documentation',
  'navigation'];
  formatData(){
    if(this.operation.actions){
      for(let action of this.operation.actions){
        if(action.user){
          if(action.user.id==this.userid){
            action.enable=true;
          }
        }
        moment.locale('zh_cn');
        if(action.call_time){
          action.call_time_date=moment(action.call_time).format();
          action.call_time_date_show=moment(action.call_time).format('MM月DD日 HH时mm分');
        }
        if(action.start_time){
          action.start_time_date=moment(action.start_time).format();
          action.start_time_date_old=action.start_time_date;
          action.start_time_date_show=moment(action.start_time).format('MM月DD日 HH时mm分');
        }
        else{
          action.start_time_date=null
          action.start_time_date_old=null
          action.start_time_date_show='未开始'
        }
        if(action.end_time){
          action.end_time_date=moment(action.end_time).format();
          action.end_time_date_old=action.end_time_date;
          action.end_time_date_show=moment(action.end_time).format('MM月DD日 HH时mm分');
        }
        else{
          action.end_time_date=null
          action.end_time_date_old=null
          action.end_time_date_show='未结束'
        }
        //
        let randomInt=parseInt((Math.random()*10).toString()).toString();
        let color=this.colors[randomInt];
        action.color=color;
      }
    }
  }

  private infoModal;
  private openModal(){
    let id=this.navParams.data.id;
    this.infoModal=this.modalCtrl.create(DetailModalPage,{id:id});
    this.infoModal.present();
  }
  ngOnDestroy() {
    if(this.infoModal)
      this.infoModal.dismiss();
  }

  doRefresh(e){
    let id=this.navParams.data.id;
    this.getData(id).then((data:ResponseData)=>{
      e.complete();
      this.operation={...data.data};
      console.log(this.operation)
      this.formatData();
    }).catch((e)=>{
      e.complete();
      this.toolService.toast(e)
    });
  }

  okStartTime(e,operationId,actionId,create_stamp,call_stamp,end_stamp,isCompleteOperation,old){
    let startDate=new Date(e);
    this.detailService.saveAction({
      operationId:operationId,
      id:actionId,
      workerId:this.userid,
      create_stamp:create_stamp,
      call_stamp:call_stamp,
      showArriveDate:true,
      start_stamp:startDate.getTime(),
      showFinishDate:end_stamp==null?false:true,
      end_stamp:end_stamp,
      isCompleteOperation:isCompleteOperation?true:false
    }).then(
      data=>{
        if(data.status==0){
          this.toolService.toast(data.message);
          this.resultToOperationObj(data.data,actionId);
        }
        else{
          this.toolService.toast(data.message)
          this.oldToOperationObj(actionId)

        }
      },
      error=>{
        this.toolService.toast(error)
        this.oldToOperationObj(actionId)
      }
    )
  }
  okEndTime(e,operationId,actionId,create_stamp,call_stamp,start_stamp){
    let endDate=new Date(e);
    this.detailService.saveAction({
      operationId:operationId,
      id:actionId,
      workerId:this.userid,
      create_stamp:create_stamp,
      call_stamp:call_stamp,
      showArriveDate:true,
      start_stamp:start_stamp,
      showFinishDate:true,
      end_stamp:endDate.getTime(),
      isCompleteOperation:false
    }).then(
      data=>{
        if(data.status==0){
          this.toolService.toast(data.message);
          this.resultToOperationObj(data.data,actionId);
          //如果自己的action没有完成标识，且其他的action也没有完成标识，弹出询问框
          if(this.existCompleteOperation()){

          }
          else{
            //再次弹出询问框，是否完成此工单
            const confirm = this.alertCtrl.create({
              title: '此工单完成了吗?',
              buttons: [
                {
                  text: '完成',
                  handler: () => {
                    this.detailService.saveAction({
                      operationId:operationId,
                      id:actionId,
                      workerId:this.userid,
                      create_stamp:create_stamp,
                      call_stamp:call_stamp,
                      showArriveDate:true,
                      start_stamp:start_stamp,
                      showFinishDate:true,
                      end_stamp:endDate.getTime(),
                      isCompleteOperation:true
                    }).then(
                      data=>{
                        if(data.status==0) {
                          this.toolService.toast(data.message);
                          this.resultToOperationObj(data.data, actionId);
                        }
                        else{
                          this.toolService.toast(data.message)
                          this.oldToOperationObj(actionId)
                        }
                      },
                      error=>{
                        this.toolService.toast(error)
                        this.oldToOperationObj(actionId)
                      }
                    )
                  }
                },
                {
                  text: '未完成',
                  handler: () => {

                  }
                }
              ]
            });
            confirm.present();
          }

        }
        else{
          this.toolService.toast(data.message)
          this.oldToOperationObj(actionId)
        }
      },
      error=>{
        this.toolService.toast(error)
        this.oldToOperationObj(actionId)
      }
    )
  }

  existCompleteOperation(){
    if(this.operation.actions){
      for(let action of this.operation.actions){
        if(action.OperationComplete){
          return true;
        }
      }
    }
    return false;
  }

  completeChange(e,operationId,actionId,create_stamp,call_stamp,start_stamp,end_stamp){
    this.detailService.saveAction({
      operationId:operationId,
      id:actionId,
      workerId:this.userid,
      create_stamp:create_stamp,
      call_stamp:call_stamp,
      showArriveDate:true,
      start_stamp:start_stamp,
      showFinishDate:true,
      end_stamp:end_stamp,
      isCompleteOperation:e
    }).then(
      data=>{
        if(data.status==0){
          this.toolService.toast(data.message);
          this.resultToOperationObj(data.data,actionId);
        }
        else{
          this.toolService.toast(data.message)
          this.oldToOperationObj(actionId)
          this.oldCompleteToOperationObj(actionId,!e)

        }
      },
      error=>{
        this.toolService.toast(error)
        this.oldToOperationObj(actionId)
        this.oldCompleteToOperationObj(actionId,!e)
      }
    )
  }

  //将更新好的结果，覆盖掉该action
  resultToOperationObj(data,actionId){
    if(this.operation.actions){
      for(let action of this.operation.actions){
        if(action.id==actionId){
          //修改这个
          action.start_time=data.start_time;
          action.end_time=data.end_time;
          if(action.start_time){
            action.start_time_date=moment(action.start_time).format();
            action.start_time_date_show=moment(action.start_time).format('MM月DD日 HH时mm分');
          }

          if(action.end_time){
            action.end_time_date=moment(action.end_time).format();
            action.end_time_date_show=moment(action.end_time).format('MM月DD日 HH时mm分');
          }
          break;
        }
      }
    }
  }

  oldToOperationObj(actionId){
    if(this.operation.actions){
      for(let action of this.operation.actions){
        if(action.id==actionId){
          //修改这个
          action.start_time_date=action.start_time_date_old;
          action.end_time_date=action.end_time_date_old;
          break;
        }
      }
    }
  }
  oldCompleteToOperationObj(actionId,complete){
    if(this.operation.actions){
      for(let action of this.operation.actions){
        if(action.id==actionId){
          action.operationComplete=complete;
          break;
        }
      }
    }
  }

  @ViewChild('start') startSelect:DateTime
  start_click(e,start_time,actionId,operationId,create_stamp,call_stamp){
    let t=this;
    let actionOp;
    if(this.operation.actions){
      for(let action of this.operation.actions){
        if(action.id==actionId){
          actionOp=action;
        }
      }
    }

    let button={
      text:'删除开始时间',
      role:'delete',
      handler:function(){
        if(actionOp.end_time){
          t.toolService.toast('请先删除工作的结束时间，再进行尝试！')
        }
        else{

        }
      }
    }

    this.startSelect._picker.addButton(button);
  }

  @ViewChild('end') endSelect:DateTime
  end_click(e,end_time,actionId){
    let t=this;
    let actionOp;
    if(this.operation.actions){
      for(let action of this.operation.actions){
        if(action.id==actionId){
          actionOp=action;
        }
      }
    }

    let button={
      text:'删除结束时间',
      style:'color:red',
      handler:function(){
        alert('delete end');
      }
    }

    this.endSelect._picker.addButton(button);
  }

}
