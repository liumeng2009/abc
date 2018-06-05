import {NgModule} from '@angular/core'
import {IonicPageModule} from 'ionic-angular'

import {LoginComponent} from './login'

@NgModule({
  declarations:[
    LoginComponent
  ],
  imports:[
    IonicPageModule.forChild(LoginComponent)
  ],
  entryComponents:[
    LoginComponent
  ]
})

export class LoginModule{}
