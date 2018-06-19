import {NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import {IonicPageModule} from 'ionic-angular'

import {PipesModule} from '../../../util/pipe/pipe.module'

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
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})

export class ListModule{}
