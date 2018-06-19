import {NgModule} from '@angular/core'
import {IonicPageModule} from 'ionic-angular'

import {WeChatPage} from './wechat.tab'

@NgModule({
  declarations:[
    WeChatPage
  ],
  imports:[
    IonicPageModule.forChild(WeChatPage)
  ],
  entryComponents:[
    WeChatPage
  ]
})

export class WeChatPageModule{}
