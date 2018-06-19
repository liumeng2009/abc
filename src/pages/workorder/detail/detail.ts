import {Component,ViewChild} from '@angular/core';
import {NavController,Navbar} from 'ionic-angular'

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
