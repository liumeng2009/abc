import {Component,ViewChild} from '@angular/core';
import {NavController,Navbar} from 'ionic-angular'
import {IonicPage} from "ionic-angular/index";


@Component({
  templateUrl:'detail.html',
  selector:'detail'
})

export class DetailPage{
  constructor(
    public navCtrl:NavController
  ){}

  @ViewChild('nav') navBar:Navbar
  ngOnInit(){
    console.log(123);
    this.navBar.setBackButtonText('后退')
  }

}