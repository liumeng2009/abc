import {Component,ViewChild,ElementRef,OnInit} from '@angular/core';
import {NavController,IonicPage} from 'ionic-angular'

@IonicPage({
  name:'detail',
  segment:'detail',
  defaultHistory:['list']
})

@Component({
  templateUrl:'pagetwo.html'
})

export class PageTwo{
  constructor(
    public navCtrl:NavController
  ){}

  @ViewChild('nav') navBar:ElementRef
  ngOnInit(){
    //this.navBar.setBackButtonText('后退')
  }

}
