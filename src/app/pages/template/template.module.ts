import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { MascotasComponent } from './mascotas/mascotas.component';
import { TipsComponent } from './tips/tips.component';
import { EventosComponent } from './eventos/eventos.component';
import { TemplateComponent } from './template/template.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { UsuarioComponent } from './usuario/usuario.component';

@NgModule({
  declarations: [
    HomeComponent,
    MascotasComponent,
    TipsComponent,
    EventosComponent,
    TemplateComponent,
    PerfilComponent,
    UsuarioComponent,
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    ComponentsModule,
    CarouselModule.forRoot(),
  ]
})
export class TemplateModule { }
