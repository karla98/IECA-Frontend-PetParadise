import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { MascotasComponent } from './mascotas/mascotas.component';
import { TipsComponent } from './tips/tips.component';
import { EventosComponent } from './eventos/eventos.component';
import { TemplateComponent } from './template/template.component';


@NgModule({
  declarations: [
    HomeComponent,
    MascotasComponent,
    TipsComponent,
    EventosComponent,
    TemplateComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    ComponentsModule,
  ]
})
export class TemplateModule { }
