import {Component,OnInit} from '@angular/core';
import {NavController,IonicPage} from 'ionic-angular'
import {PageTwo} from '../pagetwo/pagetwo'

@IonicPage({
  name:'list',
  segment:'list'
})
@Component({
  templateUrl:'pageone.html'
})

export class PageOne{
  constructor(
    public navCtrl:NavController
  ){

  }


  ngOnInit(){

  }

  push(){
    this.navCtrl.push('detail')
  }
  login(){
    this.navCtrl.push('login')
  }
}

