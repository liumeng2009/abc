import {Component} from '@angular/core';
import {NavParams,Events,ViewController} from 'ionic-angular'
import {ToolService} from "../../../../util/tool.service";
import {PublicDataService} from "../../../../util/data/public-data.service";
import {DetailService} from "../detail.service";
import {ResponseData} from "../../../../bean/responseData";
import {EquipType} from "../../../../bean/equipType";
import {Equipment} from "../../../../bean/equipment";


@Component({
  templateUrl:'edit-content.html',
  selector:'edit-content'
})

export class EditContentPage{
  constructor(
    private navParams: NavParams,
    private toolService:ToolService,
    private events:Events,
    private viewCtrl:ViewController,
    private detailService:DetailService,
    private publicDataService:PublicDataService
  ){
    this.listenToEvents();
  }


  ngOnInit(){
    this.type=this.navParams.data.typecode;
    this.equipment=this.navParams.data.equipment;
    this.business=this.navParams.data.businessId;
    console.log(this.type);
    console.log(this.equipment);
    this.getType().then((data:ResponseData)=>{
      this.types=[...data.data]
    }).catch((e)=>{
      this.toolService.toast(e);
    });
    this.getEquipment(this.type).then((data:ResponseData)=>{
      this.equipments=[...data.data]
    }).catch((e)=>{
      this.toolService.toast(e);
    })
    this.getBusiness(this.type,this.equipment).then((data:ResponseData)=>{
      this.businessContents=[...data.data]
    }).catch((e)=>{
      this.toolService.toast(e);
    })
  }

  ionViewWillLeave(){
    this.events.unsubscribe('pop:shutdown')
  }
  listenToEvents(){
    this.events.subscribe('pop:shutdown',()=>{
      console.log('received');
      this.viewCtrl.dismiss();
    })
  }

  private type;
  private types:EquipType[]=[];
  getType(){
    return new Promise((resolve, reject)=>{
      this.publicDataService.getTypes().then(
        data=>{
          if(data.status==0){
            resolve(data)
          }
          else{
            reject(data.message)
          }
        },
        error=>{
          reject(error)
        }
      )
    })
  }

  private equipment;
  private equipments:Equipment[]=[];
  getEquipment(typecode){
    return new Promise((resolve, reject)=>{
      this.publicDataService.getEquipment(typecode).then(
        data=>{
          if(data.status==0){
            resolve(data)
          }
          else{
            reject(data.message)
          }
        },
        error=>{
          reject(error)
        }
      )
    })
  }

  private business;
  private businessContents:any[]=[];
  getBusiness(typecode,equipment){
    return new Promise((resolve, reject)=>{
      this.publicDataService.getBusinessContents(0,typecode,equipment).then(
        data=>{
          if(data.status==0){
            resolve(data)
          }
          else{
            reject(data.message)
          }
        },
        error=>{
          reject(error)
        }
      )
    })
  }



  save(){
    let operationId=this.navParams.data.operationId;
    let action=this.navParams.data.action;
    this.detailService.editOperation({operationId:operationId,business:this.business,action:action}).then(
      data=>{
        if(data.status==0){
          this.toolService.toast(data.message);
          //发出通知，告诉modal页面，更新operation
          this.events.publish('operation:updated');
          this.viewCtrl.dismiss();
        }
        else{
          this.toolService.toast(data.message);
        }
      },
      error=>{
        this.toolService.toast(error);
      }
    )
  }
}
