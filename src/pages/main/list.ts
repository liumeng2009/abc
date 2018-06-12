import {Component} from '@angular/core';
import {NavController,IonicPage} from 'ionic-angular'
import {ListService} from "./list.service";
import {ToastController} from "ionic-angular/index";
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
      console.log('绑定数据');
      this.getData();
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
            reject(()=>{
              this.toolService.toast(data.message);
              setTimeout(()=>{
                this.navCtrl.push('login');
              })
            })

          }
        },
        error=>{
          reject(this.toolService.toast(error));

        }
      )
    })
  }

  private opList:any[];
  getData(){
    let date=new Date();
    this.listService.getOpListDay(parseInt(date.getTime()/1000)).then(
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



}

