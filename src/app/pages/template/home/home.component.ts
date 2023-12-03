import { Component, NgZone, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { ApiRequestService } from 'src/app/services/api-request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  /* Pruebas de peticiones al backend */
  //formulario: FormGroup;

  isLoading: boolean = true;

  constructor(
    private apiRequestService: ApiRequestService,
    private message: ToastrService,
    private zone: NgZone
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
    try {
      const response = await lastValueFrom(
        this.apiRequestService.getAll<any[]>('mascotas')
      );
      console.log('Mascotas response: ', response);

      const responseOne = await lastValueFrom(
        this.apiRequestService.getOne<any[]>(
          'mascotas',
          '655acd1c4048edacbbabf74c'
        )
      );
      console.log('Mascotas By ID: ', responseOne);

      /* ---------- Prueba Post -------------- */
      /*
      const mascota = {
        nombre: this.formulario.value.nombre,
        descripcion: this.formulario.value.descripcion,
        sexo: this.formulario.value.sexo,
        edad: this.formulario.value.edad,
        raza: this.formulario.value.raza,
        propietario: this.formulario.value.propietario,
        imagenes: this.formulario.value.imagenes
        
      };
      await lastValueFrom(this.apiRequestService.create<any>('mascotas', mascota) );
      */

      /* ------- Prueba Patch -----------------*/
      /*
      const mascota = {
        nombre: 'Editado',        
      };
      await lastValueFrom(this.apiRequestService.update<any>('mascotas','655d4a47b4b9984a9acecbf2', mascota) );
      */

      /* ------- Prueba Delete -----------------*/
      //await lastValueFrom(this.apiRequestService.delete<any>('mascotas','655d4a47b4b9984a9acecbf2') );
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoading = false;
    }
  }

  /*
    -----  Prueba subir imagenes de mascotas ---------

  async onFileSelected(files: File[]): Promise<void> {

    const formData = new FormData();
    formData.append('nombre', this.formulario.value.nombre);
    formData.append('descripcion', this.formulario.value.descripcion);
    formData.append('sexo', this.formulario.value.sexo);
    formData.append('edad', this.formulario.value.edad);
    formData.append('raza', this.formulario.value.raza);
    formData.append('propietario', this.formulario.value.propietario);

    for (const file of files) {
      formData.append('imagenes', file, file.name);
    }

    if (files && files.length > 0) {
      try {
        await lastValueFrom(
          this.apiRequestService.createWithFile<any>('mascotas', formData)
        );
      } catch (error) {
        console.error('Error al cargar imágenes:', error);

        // Muestra el mensaje de error dentro de la zona de Angular
        this.zone.run(() => {
          this.message.error('Error al cargar imágenes');
        });
      }
    }
  }*/

  //Prueba subir imagen de perfil

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
