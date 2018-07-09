import {Component,ViewChild} from '@angular/core';
import {NavParams, Events, ModalController, Refresher} from 'ionic-angular'
import {AuthService} from "../../../util/auth.service";
import {Operation} from "../../../bean/operation";
import {DetailService} from "./detail.service";
import {ToolService} from "../../../util/tool.service";
import {DetailModalPage} from "./detail-modal";
import {ResponseData} from "../../../bean/responseData";


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


  private operation:Operation;
  private operation_no:string;
  ionViewWillEnter(){
    let id=this.navParams.data.id;
    let no=this.navParams.data.no;
    this.operation_no=no;
    console.log(id);
    this.authService.checkLogin().then(()=>{
      this.getData(id).then((data:ResponseData)=>{
        this.operation={...data.data};
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
      this.detailService.getOperation(id).then(
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

  private infoModal;
  private openModal(){
    let id=this.navParams.data.id;
    this.infoModal=this.modalCtrl.create(DetailModalPage,{id:id});
    this.infoModal.present();
  }
  ngOnDestroy() {
    this.infoModal.dismiss();
  }

  doRefresh(e){
    let id=this.navParams.data.id;
    this.getData(id).then((data:ResponseData)=>{
      e.complete();
      this.operation={...data.data};
    }).catch((e)=>{
      e.complete();
      this.toolService.toast(e)
    });
  }
}
