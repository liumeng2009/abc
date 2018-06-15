import {NgModule} from '@angular/core'
import {IonicPageModule} from 'ionic-angular'

import {WeChat} from './wechat'

@NgModule({
  declarations:[
    WeChat
  ],
  imports:[
    IonicPageModule.forChild(WeChat)
  ],
  entryComponents:[
    WeChat
  ]
})

export class WeChatModule{}
