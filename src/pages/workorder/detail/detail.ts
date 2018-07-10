import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavParams, Events, ModalController, Refresher} from 'ionic-angular'
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
    private modalCtrl:ModalController
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
          action.call_time_date_show=moment(action.call_time).format('YYYY年MM月DD日 a hh时mm分');
        }
        if(action.start_time){
          action.start_time_date=moment(action.start_time).format();
          action.start_time_date_show=moment(action.start_time).format('YYYY年MM月DD日 hh时mm分');
        }
        if(action.end_time){
          action.end_time_date=moment(action.end_time).format();
          action.end_time_date_show=moment(action.end_time).format('YYYY年MM月DD日 hh时mm分');
        }
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

  okStartTime(e){
    console.log(e);
  }
}
