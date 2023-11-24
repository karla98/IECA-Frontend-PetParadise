import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TemplateComponent } from './template/template.component';
import { TabsModule } from 'ngx-bootstrap/tabs';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    TemplateComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TabsModule.forRoot(),
  ]
})
export class AuthModule { }
