import {NgModule} from '@angular/core'
import {IonicPageModule} from 'ionic-angular'

import {PageTwo} from './pagetwo'

@NgModule({
  declarations:[
    PageTwo
  ],
  imports:[
    IonicPageModule.forChild(PageTwo)
  ],
  entryComponents:[
    PageTwo
  ]
})

export class PageTwoModule{}
