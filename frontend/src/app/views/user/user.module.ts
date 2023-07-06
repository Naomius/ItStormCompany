import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        UserRoutingModule,
        FontAwesomeModule,
    ]
})
export class UserModule { }
