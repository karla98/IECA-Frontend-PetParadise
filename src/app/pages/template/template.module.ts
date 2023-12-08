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

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { MascotaDetailComponent } from './mascota-detail/mascota-detail.component';

@NgModule({
  declarations: [
    HomeComponent,
    MascotasComponent,
    TipsComponent,
    EventosComponent,
    TemplateComponent,
    PerfilComponent,
    UsuarioComponent,
    MascotaDetailComponent,
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    ComponentsModule,
    CarouselModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule,
  ]
})
export class TemplateModule { }
