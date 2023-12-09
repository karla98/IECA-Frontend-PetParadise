import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilUsuarioRoutingModule } from './perfil-usuario-routing.module';
import { PerfilTemplateComponent } from './perfil-template/perfil-template.component';
import { PerfilMascotasComponent } from './perfil-mascotas/perfil-mascotas.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MisMascotasComponent } from './mis-mascotas/mis-mascotas.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    PerfilTemplateComponent,
    PerfilMascotasComponent,
    CuentaComponent,
    MisMascotasComponent
  ],
  imports: [
    CommonModule,
    PerfilUsuarioRoutingModule,
    ComponentsModule,
    TabsModule.forRoot(),
    ReactiveFormsModule,
    ModalModule.forRoot(),

  ]
})
export class PerfilUsuarioModule { }
