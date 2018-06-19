import {NgModule} from '@angular/core'
import {IonicPageModule} from 'ionic-angular'

import {DetailPage} from './detail.tab'

@NgModule({
  declarations:[
    DetailPage
  ],
  imports:[
    IonicPageModule.forChild(DetailPage)
  ],
  entryComponents:[
    DetailPage
  ]
})

export class DetailPageModule{}
