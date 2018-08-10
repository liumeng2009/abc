import {Component,ViewChild,ElementRef} from '@angular/core';
import {Title} from '@angular/platform-browser'
import { Slides } from 'ionic-angular';
import {Corporation} from "../../../bean/Corporation";
import {Group} from "../../../bean/Group";
import {PublicDataService} from "../../../util/data/public-data.service";
import {ToolService} from "../../../util/tool.service";
import {ResponseData} from "../../../bean/responseData";
@Component({
  templateUrl:'add.html',
  selector:'add-op',

})

export class AddPage {
  constructor(
    private title:Title,
    private publicDataService:PublicDataService,
    private toolService:ToolService
  ) {

  }

  @ViewChild('slide') slide:Slides;

  ionViewWillEnter(){
    this.title.setTitle('新增工单-设置客户信息');
    this.slide.lockSwipeToNext(true);
    this.slide.lockSwipeToPrev(true);
    this.getGroups().then(()=>{
      this.getCorporation().then((data:ResponseData)=>{
        this.corporations=[...data.data];
        if(this.corporationId){

        }
        else{
          if(this.corporations.length>0)
            this.corporationId=this.corporations[0].id;
        }
      }).catch((e)=>{
        this.toolService.toast(e);
      })
    }).catch(()=>{});

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
    if(this.corporationId){
      return false;
    }
    return true;
  }
  canGoAction(){

  }

  setBusiness(){
    this.slide.lockSwipeToNext(false);
    this.slide.slideNext();
  }
  setCustom(){
    this.slide.lockSwipeToPrev(false);
    this.slide.slidePrev();
  }
  setAction(){
    this.slide.lockSwipeToNext(false);
    this.slide.slideNext();
  }

  slideChanged(){
    this.slide.lockSwipeToNext(true);
    this.slide.lockSwipeToPrev(true);
    let index=this.slide.getActiveIndex();
    if(index==0){
      this.title.setTitle('新增工单-设置客户信息');
    }
    else if(index==1){
      this.title.setTitle('新增工单-设置业务内容');
    }
    else if(index==2){
      this.title.setTitle('新增工单-设置处理进程');
    }
  }

}
