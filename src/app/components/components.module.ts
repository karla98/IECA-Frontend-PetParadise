import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MascotasSectionComponent } from './mascotas-section/mascotas-section.component';
import { UploaderComponent } from './uploader/uploader.component';
import { UpProfileLoaderComponent } from './up-profile-loader/up-profile-loader.component';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    MascotasSectionComponent,
    UploaderComponent,
    UpProfileLoaderComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    MascotasSectionComponent,
    UploaderComponent,
    UpProfileLoaderComponent,
    LoadingComponent,
  ]
})
export class ComponentsModule { }
