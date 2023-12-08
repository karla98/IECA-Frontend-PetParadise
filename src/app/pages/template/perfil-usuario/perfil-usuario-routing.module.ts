import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilTemplateComponent } from './perfil-template/perfil-template.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { PerfilMascotasComponent } from './perfil-mascotas/perfil-mascotas.component';
import { MisMascotasComponent } from './mis-mascotas/mis-mascotas.component';

const routes: Routes = [
  {
    path: '',
    component: PerfilTemplateComponent,
    children: [
      { path: 'mi-cuenta', component: CuentaComponent },
      { path: 'add-mascota', component: PerfilMascotasComponent, data: { title: 'Agregar Mascotas' } },
      { path: 'mis-mascota', component: MisMascotasComponent, data: { title: 'Mis Mascotas' } },
      { path: '**', redirectTo: 'mi-cuenta' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilUsuarioRoutingModule { }
