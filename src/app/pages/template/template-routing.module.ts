import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MascotasComponent } from './mascotas/mascotas.component';
import { TipsComponent } from './tips/tips.component';
import { EventosComponent } from './eventos/eventos.component';
import { TemplateComponent } from './template/template.component';

const routes: Routes = [
  {
    path: '', component: TemplateComponent, children: [
      { path: '', component: HomeComponent },

      { path: 'mascotas', component: MascotasComponent, data: { title: 'Mascotas' } },
       { path: 'tips', component: TipsComponent, data: { title: 'Tips' } },
       { path: 'eventos', component: EventosComponent, data: { title: 'Eventos' } },
     
       { path: '**', redirectTo: '' },      


    
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
