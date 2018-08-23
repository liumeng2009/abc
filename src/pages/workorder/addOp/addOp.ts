import {Component,ViewChild} from '@angular/core'
import {Slides} from 'ionic-angular'
import {Title} from '@angular/platform-browser'
import * as moment from 'moment'
import {Observable} from 'rxjs'
import {AddService} from "../add/add.service";
import {ToolService} from "../../../util/tool.service";
import {Order} from "../../../bean/order";
import {BusinessContent} from "../../../bean/businessContent";
import {Equipment} from "../../../bean/equipment";
import {EquipType} from "../../../bean/equipType";
import {PublicDataService} from "../../../util/data/public-data.service";
import {ResponseData} from "../../../bean/responseData";
import {WorkOrder} from "../../../bean/workOrder";

@Component({
  selector:'add-op-op',
  templateUrl:'addOp.html'
})

export class AddOpPage{
  constructor(
    private title:Title,
    private addService:AddService,
    private toolService:ToolService,
    private publicDataService:PublicDataService
  ){

  }
  @ViewChild('slide') slide:Slides;
  slideChanged(e){
    this.slide.lockSwipeToNext(true);
    this.slide.lockSwipeToPrev(true);
    let index=this.slide.getActiveIndex();
    if(index==0){
      this.title.setTitle('新增工单-选择所属订单');
    }
    else if(index==1){
      this.title.setTitle('新增工单-设置工单内容');
    }
    else if(index==2){
      this.title.setTitle('新增工单-设置处理进程');
    }
  }

  canGoBusiness(){
    if(this.order){
      return false;
    }
    return true;
  }
  canGoAction(){
    if(this.business){
      return true
    }
    else{
      return false;
    }
  }

  setBusiness(){
    this.slide.lockSwipeToNext(false);
    this.slide.slideNext();
  }
  setCustom(){
    this.slide.lockSwipeToPrev(false);
    this.slide.slidePrev();
  }

  private operation:WorkOrder=new WorkOrder(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  private isSavingOperation:boolean=false;
  setAction(){
    this.slide.lockSwipeToNext(false);
    this.slide.slideNext();
    //添加工单
    this.operation.order=this.order.id;
    this.operation.incoming_date_timestamp=moment(this.todayString).valueOf();
    this.operation.incoming_date=moment(this.todayString).toDate();
    this.operation.businessContent=this.business;
    console.log(this.operation);
    this.isSavingOperation=true;
    this.addService.create(this.operation).then(
      data=>{
        let result=this.toolService.apiResult(data)
        if(result){
          console.log(result);
        }
      },
      error=>{
        this.toolService.apiException(error)
      }
    )
  }

  private todayString=moment().format();
  ngOnInit() {
    this.title.setTitle('新增工单-选择订单');
    this.getType().then((data:ResponseData)=>{
      this.types=[...data.data]
      if(this.type){

      }
      else{
        if(this.types.length>0)
          this.type=this.types[0]
      }
      this.getEquipment(this.type.code).then((data:ResponseData)=>{
        this.equipments=[...data.data]
        if(this.equipment){

        }
        else{
          if(this.equipments.length>0)
            this.equipment=this.equipments[0]
        }
        this.getBusiness(this.type.code,this.equipment.name).then((data:ResponseData)=>{
          console.log(data);
          this.businessContents=[...data.data]
          if(this.business){

          }
          else{
            if(this.businessContents.length>0)
              this.business=this.businessContents[0];
          }
        }).catch((e)=>{
          this.toolService.toast(e);
        })
      }).catch((e)=>{
        this.toolService.toast(e);
      })
    }).catch((e)=>{
      this.toolService.apiException(e);
    });
  }

  private create_time_run;
  ionViewWillEnter(){
    this.getData();
    this.create_time_run=Observable.interval(1000).subscribe(()=>{
      this.todayString=moment().format();
    })
  }

  private order:Order={};
  private orders:Order[]=[];
  private getData(){
    let stamp=moment(this.todayString).valueOf();
    this.addService.getOrderList(null,stamp).then(
      data=>{
        console.log(data);
        let result=this.toolService.apiResult(data);
        if(result){
          this.orders=[...result.data]
          console.log(this.orders);
          for(let o of this.orders){
            o.incoming_time_show=moment(o.incoming_time).format('MM-DD HH:mm:ss')
          }
          this.order=null;
          if(this.order){

          }
          else{
            if(this.orders.length>0)
              this.order=this.orders[0]
          }
        }
      },
      error=>{
        this.toolService.apiException(error)
      }
    )
  }


  okCreateTime(e){
    //this.getData();
    if(this.create_time_run)
      this.create_time_run.unsubscribe()
  }

  okOrderCreateTime(e){
    this.getData();
  }

  private type:EquipType;
  private types:EquipType[]=[];
  private isLoadingAddType:boolean=false;
  getType(){
    this.isLoadingAddType=true;
    return new Promise((resolve, reject)=>{
      this.publicDataService.getTypes().then(
        data=>{
          this.isLoadingAddType=false;
          if(data.status==0){
            resolve(data)
          }
          else{
            reject(data.message)
          }
        },
        error=>{
          this.isLoadingAddType=false;
          reject(error)
        }
      )
    })
  }

  private equipment:Equipment;
  private equipments:Equipment[]=[];
  private isLoadingAddEquipment:boolean=false;
  getEquipment(typecode){
    this.isLoadingAddEquipment=true;
    return new Promise((resolve, reject)=>{
      this.publicDataService.getEquipment(typecode).then(
        data=>{
          this.isLoadingAddEquipment=false;
          if(data.status==0){
            resolve(data)
          }
          else{
            reject(data.message)
          }
        },
        error=>{
          this.isLoadingAddEquipment=false;
          reject(error)
        }
      )
    })
  }

  private business:BusinessContent;
  private businessContents:any[]=[];
  private isLoadingAddOp:boolean=false;
  getBusiness(typecode,equipment){
    this.isLoadingAddOp=true;
    return new Promise((resolve, reject)=>{
      this.publicDataService.getBusinessContents(0,typecode,equipment).then(
        data=>{
          this.isLoadingAddOp=false;
          if(data.status==0){
            resolve(data)
          }
          else{
            reject(data.message)
          }
        },
        error=>{
          this.isLoadingAddOp=false;
          reject(error)
        }
      )
    })
  }

  typeOk(){
    console.log(this.types);
    this.equipments.splice(0,this.equipments.length);
    this.getEquipment(this.type.code).then((data:ResponseData)=>{
      this.equipments=[...data.data]
      if(this.equipments.length>0){
        this.equipment=this.equipments[0];
        this.getBusiness(this.type.code,this.equipment.name).then((data:ResponseData)=>{
          this.businessContents=[...data.data]
          if(this.businessContents.length>0){
            this.business=this.businessContents[0];
          }
        }).catch((e)=>{
          this.toolService.apiException(e);
        })
      }
    }).catch((e)=>{
      this.toolService.apiException(e);
    })
  }

  equipmentOk(e){
    this.businessContents.splice(0,this.businessContents.length)
    this.getBusiness(this.type.code,this.equipment.name).then((data:ResponseData)=>{
      this.businessContents=[...data.data]
      if(this.businessContents.length>0){
        this.business=this.businessContents[0];
      }
    }).catch((e)=>{
      this.toolService.toast(e);
    })
  }

}
