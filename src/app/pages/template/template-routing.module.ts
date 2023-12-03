import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MascotasComponent } from './mascotas/mascotas.component';
import { TipsComponent } from './tips/tips.component';
import { TemplateComponent } from './template/template.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  {
    path: '', component: TemplateComponent, children: [
      { path: '', component: HomeComponent },

      { path: 'mascotas', component: MascotasComponent, data: { title: 'Mascotas' } },
       { path: 'tips', component: TipsComponent, data: { title: 'Tips' } },
       { path: 'perfil', component: PerfilComponent, data: { title: 'Perfil' } },
     
       { path: '**', redirectTo: '' },      


    
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
