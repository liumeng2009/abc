import {NgModule} from '@angular/core'
import {IonicPageModule} from 'ionic-angular'

import {LoginComponent} from './login'
import {LoginService} from "./login.service";

@NgModule({
  declarations:[
    LoginComponent
  ],
  imports:[
    IonicPageModule.forChild(LoginComponent)
  ],
  providers:[
    LoginService
  ],
  entryComponents:[
    LoginComponent
  ]
})

export class LoginModule{}
