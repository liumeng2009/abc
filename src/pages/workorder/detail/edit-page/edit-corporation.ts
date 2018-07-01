import {Component} from '@angular/core';
import {NavController,Navbar,NavParams,Events,ViewController} from 'ionic-angular'
import {ToolService} from "../../../../util/tool.service";
import {PublicDataService} from "../../../../util/data/public-data.service";
import {Group} from "../../../../bean/Group";
import {Corporation} from "../../../../bean/Corporation";


@Component({
  templateUrl:'edit-corporation.html',
  selector:'edit-corporation'
})

export class EditCorporationPage{
  constructor(
    private navParams: NavParams,
    private toolService:ToolService,
    private events:Events,
    private viewCtrl:ViewController,
    private publicDataService:PublicDataService
  ){
    this.listenToEvents();
  }

  ngOnInit(){
    if(this.navParams.data){
      let operationId=this.navParams.data.operationId;
      let corporationIdParams=this.navParams.data.corporationId;
      let groupIdParams=this.navParams.data.groupId;
      this.groupId=groupIdParams;
      this.corporationId=corporationIdParams;
      this.getGroups();
      this.getCorporation().then((data)=>{
        this.corporations=[...data];
      }).catch((e)=>{
        this.toolService.toast(e);
      });

    }
  }

  private groups:Group[]=[];
  private groupId;
  getGroups(){
    this.publicDataService.getGroups().then(
      data=>{
        if(data.status==0){
          this.groups=[...data.data];
          console.log(this.groups);
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
  groupOk(e){
    this.getCorporation().then(
      (data)=>{
        this.corporations=[...data];
        //group变更的时候，将corps的第一个值，赋值给corporationId
        if(this.corporations.length>0){
          this.corporationId=this.corporations[0].id;
        }
      }
    ).catch((e)=>{
      this.toolService.toast(e)
    });
  }

  private corporations:Corporation[]=[]
  private corporationId;
  getCorporation(){
    return new Promise((resolve,reject)=>{
      this.publicDataService.getCoporations(this.groupId).then(
        data=>{
          if(data.status==0){
            resolve(data.data)
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

  ionViewWillLeave(){
    this.events.unsubscribe('pop:shutdown')
  }
  private subs;
  listenToEvents(){
    this.subs=this.events.subscribe('pop:shutdown',()=>{
      console.log('received');
      this.viewCtrl.dismiss();
    })
  }

  save(){
    console.log(this.groupId);
  }
}
