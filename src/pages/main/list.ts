import {Component} from '@angular/core';
import {NavController,IonicPage} from 'ionic-angular'

@IonicPage({
  name:'list',
  segment:'list'
})
@Component({
  templateUrl:'list.html'
})

export class List{
  constructor(
    public navCtrl:NavController
  ){

  }


  ngOnInit(){

  }
}

