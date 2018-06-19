import {Component} from '@angular/core'
import {IonicPage} from "ionic-angular";

@IonicPage({
  name:'setting',
  segment:'setting'
})
@Component({
  templateUrl:'./setting.html'
})
export class Setting {
  constructor() {

  }
  private welcome='个人设置模块'
}
