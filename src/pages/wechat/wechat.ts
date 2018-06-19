import {Component} from '@angular/core'
import {IonicPage} from "ionic-angular";
@IonicPage({
  name:'wechat',
  segment:'wechat'
})
@Component({
  templateUrl:'./wechat.html'
})
export class WeChat {
  constructor() {

  }
  private welcome='即时通讯模块'
}
