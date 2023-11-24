import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TemplateComponent } from './template/template.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent, data: { title: 'Login' } },
      {
        path: 'register',
        component: RegisterComponent,
        data: { title: 'Registro' },
      },
      { path: '**', redirectTo: '' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
