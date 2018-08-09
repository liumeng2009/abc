import {Component,ViewChild,ElementRef} from '@angular/core';
import { Slides } from 'ionic-angular';
@Component({
  templateUrl:'add.html',
  selector:'add',

})

export class AddPage {
  constructor() {

  }

  @ViewChild('slide') slide:Slides;

  ionViewWillEnter(){
    this.slide.lockSwipeToNext(true);
    this.slide.lockSwipeToPrev(true);
  }

}
