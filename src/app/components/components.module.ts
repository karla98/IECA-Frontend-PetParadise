import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MascotasSectionComponent } from './mascotas-section/mascotas-section.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    MascotasSectionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    MascotasSectionComponent,
  ]
})
export class ComponentsModule { }
