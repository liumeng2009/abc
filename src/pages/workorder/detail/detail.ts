import {Component,ViewChild} from '@angular/core';
import {NavController,Navbar,NavParams,IonicPage,Events,ModalController,ViewController} from 'ionic-angular'
import {AuthService} from "../../../util/auth.service";
import {Operation} from "../../../bean/operation";
import {DetailService} from "./detail.service";
import {ToolService} from "../../../util/tool.service";
import {DetailModalPage} from "./detail-modal";


@Component({
  templateUrl:'detail.html',
  selector:'detail'
})

export class DetailPage{
  constructor(
    private navCtrl:NavController,
    private navParams: NavParams,
    private authService:AuthService,
    private detailService:DetailService,
    private toolService:ToolService,
    private events:Events,
    private modalCtrl:ModalController,
    private viewCtrl:ViewController
  ){}


  private operation:Operation;
  private operation_no:string;
  ionViewWillEnter(){
    let id=this.navParams.data.id;
    let no=this.navParams.data.no;
    this.operation_no=no;
    console.log(id);
    this.authService.checkLogin().then(()=>{
      this.getData(id);
    }).catch((e)=>{
      this.toolService.toast(e.message);
      if(e.action&&e.action=='login'){
        setTimeout(()=>{
          this.events.publish('user:logout');
        },0)
      }
    })
  }

  getData(id){
    this.detailService.getOperation(id).then(
      data=>{
        let result=this.toolService.apiResult(data);
        if(result&&result.status==0){
          this.operation={...data.data};
        }
        else{
          this.toolService.toast(result.message);
        }
      },
      error=>{
        this.toolService.toast(error);
      }
    )
  }

  private openModal(){
    let id=this.navParams.data.id;
    let infoModal=this.modalCtrl.create(DetailModalPage,{id:id});
    infoModal.present();
  }

/*  ionViewWillLeave(){
 console.log('send');
 this.events.publish('pop:shutdown');
 }*/
  ngOnDestroy() {
    this.events.publish('pop:shutdown');
  }
}
