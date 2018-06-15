import {Component,ViewChild,ElementRef,OnInit} from '@angular/core';
import {NavController,IonicPage,Navbar} from 'ionic-angular'

@IonicPage({
  name:'detail',
  segment:'detail',
  defaultHistory:['list']
})

@Component({
  templateUrl:'detail.html'
})

export class Detail{
  constructor(
    public navCtrl:NavController
  ){}

  @ViewChild('nav') navBar:Navbar
  ngOnInit(){
    this.navBar.setBackButtonText('后退')
  }

}
