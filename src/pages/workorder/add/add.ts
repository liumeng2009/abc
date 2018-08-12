import {Component,ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser'
import { Slides } from 'ionic-angular';
import {Corporation} from "../../../bean/Corporation";
import {Group} from "../../../bean/Group";
import {PublicDataService} from "../../../util/data/public-data.service";
import {ToolService} from "../../../util/tool.service";
import {ResponseData} from "../../../bean/responseData";
import {Equipment} from "../../../bean/equipment";
import {EquipType} from "../../../bean/equipType";
import * as moment from 'moment'
import{Observable} from 'rxjs'
import {Needs} from "../../../bean/needs";
import {BusinessContent} from "../../../bean/businessContent";
import {CookieService} from "angular2-cookie/core";
import {AuthService} from "../../../util/auth.service";
import {Order} from "../../../bean/order";
import {WorkOrder} from "../../../bean/workOrder";
import {User} from "../../../bean/user";

@Component({
  templateUrl:'add.html',
  selector:'add-op',

})

export class AddPage {
  constructor(
    private title:Title,
    private publicDataService:PublicDataService,
    private toolService:ToolService,
    private cookieService:CookieService,
    private authService:AuthService
  ) {

  }

  @ViewChild('slide') slide:Slides;
  private todayString=moment().format();
  private create_time_run;
  private order:Order=new Order(null,null,null,"","",null,[]);
  ionViewWillEnter(){
    this.create_time_run=Observable.interval(1000).subscribe(()=>{
      this.todayString=moment().format();
    })

    console.log(this.todayString);
    this.title.setTitle('新增工单-设置客户信息');
    this.slide.lockSwipeToNext(true);
    this.slide.lockSwipeToPrev(true);
    this.getGroups().then(()=>{
      this.getCorporation().then((data:ResponseData)=>{
        this.corporations=[...data.data];
        if(this.corporation){

        }
        else{
          if(this.corporations.length>0)
            this.corporation=this.corporations[0];
        }
      }).catch((e)=>{
        this.toolService.apiException(e);
      })
    }).catch(()=>{});

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

    let needString=this.cookieService.get('OpAppNeed');
    if(needString){
      try{
        let needStorage=JSON.parse(needString)
        this.needs=[...needStorage];
      }
      catch(e){}

    }

  }

  okCreateTime(){
    if(this.create_time_run)
      this.create_time_run.unsubscribe()
  }

  private groups:Group[]=[];
  private groupId;
  getGroups(){
    return new Promise((resolve,reject)=>{
      this.publicDataService.getGroups().then(
        data=>{
          let result=this.toolService.apiResult(data);
          if(result.status==0){
            this.groups=[...data.data];
            if(this.groupId){

            }
            else{
              if(this.groups.length>1)
                this.groupId=this.groups[1].id;
              else if(this.groups.length>0){
                this.groupId=this.groups[0].id;
              }
            }
            resolve();
          }
        },

        error=>{
          this.toolService.toast(error);
          reject();
        }
      )
    })


  }

  groupOk(e){
    this.getCorporation().then(
      (data:ResponseData)=>{
        this.corporations=[...data.data];
        //group变更的时候，将corps的第一个值，赋值给corporationId
        if(this.corporations.length>0){
          this.corporation=this.corporations[0];
        }
      }
    ).catch((e)=>{
      this.toolService.toast(e)
    });
  }

  private corporations:Corporation[]=[]
  private corporation:Corporation;
  getCorporation(){
    return new Promise((resolve,reject)=>{
      this.publicDataService.getCoporations(this.groupId).then(
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

  canGoBusiness(){
    if(this.corporation){
      return false;
    }
    return true;
  }
  canGoAction(){
    if(this.needs.length>0){
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
  private workerOrders:WorkOrder[]=[];
  private user:User
  private isLoadingWorkerId:boolean=false
  setAction(){
    this.isLoadingWorkerId=true;
    this.authService.getUserInfo().then(
      data=>{
        this.isLoadingWorkerId=false;
        let result=this.toolService.apiResult(data);
        if(result){
          this.user={...result.data}
          this.slide.lockSwipeToNext(false);
          this.slide.slideNext();
          //将needs数组转化成新数组，新数组action页面使用
          let incoming_time=new Date(this.todayString)
          console.log(incoming_time);
          console.log(this.todayString);
          for(let need of this.needs){
            for(let i=0;i<need.no;i++){
              let workerOrder=new WorkOrder(null,null,incoming_time.getTime(),incoming_time,false,null,null,null,null,this.user.id,need.type,need.equipment,need.op,true,false,false,true,null,incoming_time.getTime(),incoming_time,false,false)
              this.workerOrders.push(workerOrder);
            }
          }
          if(this.workerOrders.length>0)
            this.workerOrders[0].select=true;
        }
      },
      error=>{
        this.isLoadingWorkerId=false;
        this.toolService.apiException(error)
      }
    )

  }

  private showAddBusinessButton:boolean=false;
  slideChanged(){
    this.slide.lockSwipeToNext(true);
    this.slide.lockSwipeToPrev(true);
    let index=this.slide.getActiveIndex();
    if(index==0){
      this.showAddBusinessButton=false;
      this.title.setTitle('新增工单-设置客户信息');
    }
    else if(index==1){
      this.showAddBusinessButton=true;
      this.title.setTitle('新增工单-设置业务内容');
    }
    else if(index==2){
      this.showAddBusinessButton=false;
      this.title.setTitle('新增工单-设置处理进程');
    }
  }


  private type:EquipType;
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

  private equipment:Equipment;
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

  private business:BusinessContent;
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

  private count:number=1;

  private showAddList:boolean=false;
  addBusiness(){
    this.showAddList=true;
    //只归零数量，不归零其他三个select
    this.count=1;
  }
  cancelAddBusiness(){
    this.showAddList=false;
  }
  cancelEditBusiness(need){
    need.edit=false;
  }

  private needs:Needs[]=[];
  saveNeed(){
    let need=new Needs(this.equipment,this.type,this.business,this.count,false);
    let isExistResult=this.isExistBusinessContent(this.business.id)
    if(isExistResult){
      isExistResult.no=isExistResult.no+this.count;
    }
    else{
      this.needs.push(need)
    }
    console.log(this.needs);
    this.cookieService.put('OpAppNeed',JSON.stringify(this.needs))
    this.showAddList=false;
  }
  isExistBusinessContent(businessId){
    for(let need of this.needs){
      if(need.op.id==businessId){
        return need;
      }
    }
    return false;
  }

  editNeedList(need){
    for(let np of this.needs){
      np.edit=false;
    }
    need.edit=true;
    console.log(need);
    this.editType=null;
    this.editEquipment=null;
    this.editBusinessContent=null;
    this.editTypes.splice(0,this.editTypes.length)
    this.editEquipments.splice(0,this.editEquipments.length)
    this.editBusinessContents.splice(0,this.editBusinessContents.length)

    this.editCount=need.no;



    this.getType().then((data:ResponseData)=>{
      this.editTypes=[...data.data]
      for(let et of this.editTypes){
        if(et.id==need.type.id){
          this.editType=et;
        }
      }
      this.getEquipment(this.editType.code).then((data:ResponseData)=>{
        this.editEquipments=[...data.data]
        for(let ee of this.editEquipments){
          if(ee.name==need.equipment.name){
            this.editEquipment=ee;
          }
        }
        this.getBusiness(this.editType.code,this.editEquipment.name).then((data:ResponseData)=>{
          this.editBusinessContents=[...data.data]
          for(let ebc of this.editBusinessContents){
            if(ebc.id==need.op.id){
              this.editBusinessContent=ebc;
            }
          }
          console.log(this.editTypes)
          console.log(this.editEquipments)
          console.log(this.editBusinessContents)
          console.log(this.editType)
          console.log(this.editEquipment)
          console.log(this.editBusinessContent)

          console.log(this.editTypes[0]===this.editType);

        }).catch((e)=>{
          this.toolService.toast(e);
        })
      }).catch((e)=>{
        this.toolService.toast(e);
      })
    }).catch((e)=>{
      this.toolService.toast(e);
    });
  }

  editTypeOk(){
    this.editEquipments.splice(0,this.editEquipments.length);
    this.getEquipment(this.editType.code).then((data:ResponseData)=>{
      this.editEquipments=[...data.data]
      if(this.equipments.length>0){
        this.editEquipment=this.editEquipments[0];
        this.getBusiness(this.editType.code,this.editEquipment.name).then((data:ResponseData)=>{
          this.editBusinessContents=[...data.data]
          if(this.editBusinessContents.length>0){
            this.editBusinessContent=this.editBusinessContents[0];
          }
        }).catch((e)=>{
          this.toolService.apiException(e);
        })
      }
    }).catch((e)=>{
      this.toolService.apiException(e);
    })
  }

  editEquipmentOk(e){
    this.editBusinessContents.splice(0,this.editBusinessContents.length)
    this.getBusiness(this.editType.code,this.editEquipment.name).then((data:ResponseData)=>{
      this.editBusinessContents=[...data.data]
      if(this.editBusinessContents.length>0){
        this.editBusinessContent=this.editBusinessContents[0];
      }
    }).catch((e)=>{
      this.toolService.apiException(e);
    })
  }


  private editType:EquipType;
  private editTypes:EquipType[]=[];
  private editEquipment:Equipment;
  private editEquipments:Equipment[]=[];
  private editBusinessContent:BusinessContent;
  private editBusinessContents:BusinessContent[]=[];
  private editCount:number;
  editNeed(need:Needs){
    need.type=this.editType;
    need.equipment=this.editEquipment;
    need.op=this.editBusinessContent;
    need.no=this.editCount;
    need.edit=false;
    this.cookieService.put('OpAppNeed',JSON.stringify(this.needs))
  }


}
