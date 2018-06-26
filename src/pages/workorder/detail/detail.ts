import {Component,ViewChild} from '@angular/core';
import {NavController,Navbar,NavParams,IonicPage} from 'ionic-angular'


@Component({
  templateUrl:'detail.html',
  selector:'detail'
})

export class DetailPage{
  constructor(
    public navCtrl:NavController,
    public navParams: NavParams
  ){}

  @ViewChild('nav') navBar:Navbar
  ngOnInit(){
    console.log(123);
    //this.navBar.setBackButtonText('后退')
  }
  private id:string;
  ionViewWillEnter(){
    this.id=this.navParams.data.id;
  }

}
