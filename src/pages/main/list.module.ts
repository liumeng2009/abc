import {NgModule} from '@angular/core'
import {IonicPageModule} from 'ionic-angular'

import {PipesModule} from '../../util/pipe/pipe.module'

import {List} from './list'
import {ListService} from "./list.service";

@NgModule({
  declarations:[
    List
  ],
  imports:[
    PipesModule,
    IonicPageModule.forChild(List)
  ],
  providers:[
    ListService
  ],
  entryComponents:[
    List
  ]
})

export class ListModule{}
