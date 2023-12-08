import { Component, NgZone, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit{

   //formulario: FormGroup;

   ASSETS = environment.ASSET_URL
   isLoading: boolean = true;

   isAuthenticated = false;
  userLogged: any = null;
 
  imagenExistentePerfil: any[] = [];
   constructor(
     private apiRequestService: ApiRequestService,
     private message: ToastrService,
     private zone: NgZone,
     private auth: AuthService,
   ) {
     /*
     this.formulario = new FormGroup({
       nombre: new FormControl('Prueba', []),
       descripcion: new FormControl('descripción de prueba', []),
       sexo: new FormControl('Macho', []),
       edad: new FormControl(5, []),
       raza: new FormControl('655acf8b4048edacbbabf74d', []),
       propietario: new FormControl('655ad13f4048edacbbabf752', []),
       imagenes: new FormArray([]),
     });
 */
   }

   async ngOnInit(): Promise<void> {
    this.isAuthenticated = this.auth.isAuthenticated();
    if(this.isAuthenticated){

      try {
        this.userLogged = await lastValueFrom(
          this.apiRequestService.getAllWithAuth<any[]>('perfil')
        );

        if(this.userLogged.imagen){
          this.imagenExistentePerfil.push(this.userLogged.imagen);
        }
  
      
      } catch (e) {
      } finally {
      }

    }
   }

  async onFileSelected(files: File[]): Promise<void> {
    const formData = new FormData();
    for (const file of files) {
      formData.append('imagen', file, file.name);
    }

    if (files && files.length > 0) {
      try {
        await lastValueFrom(
          this.apiRequestService.createWithFile<any>('perfil', formData)
        );
      } catch (error) {
        console.error('Error al cargar imágenes:', error);

        // Muestra el mensaje de error dentro de la zona de Angular
        this.zone.run(() => {
          this.message.error('Error al cargar imágenes');
        });
      }
    }
  }

}
