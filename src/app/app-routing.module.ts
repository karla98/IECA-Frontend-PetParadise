import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then( (m) => m.AuthModule),  
  data: {title: 'Auth'} },
  { path: 'home', loadChildren: () => import('./pages/template/template.module').then( (m) => m.TemplateModule),  
    data: {title: 'PetParadise'} },
  { path: '**', redirectTo : '/home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
