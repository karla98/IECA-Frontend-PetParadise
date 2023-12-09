import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-mis-mascotas',
  templateUrl: './mis-mascotas.component.html',
  styleUrls: ['./mis-mascotas.component.scss'],
})
export class MisMascotasComponent implements OnInit {
  ASSETS = environment.ASSET_URL;

  formGroup!: FormGroup;

  isLoading: boolean = true;

  especies: any[] = [];
  razas: any[] = [];

  misMascotas: any[] = [];

  edad: number[] = [];

  imagenes: File[] = [];
  formData = new FormData();

  mascotaSeleccionada: any;

  modalRef?: BsModalRef;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private apiRequestService: ApiRequestService,
    private router: Router,
    private message: ToastrService,
    private modalService: BsModalService
  ) {
    this.formGroup = this.fb.group({
      nombre: ['', [Validators.required]],
      especie: ['', [Validators.required]],
      raza: ['', [Validators.required]],
      edad: [0, [Validators.required]],
      sexo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
  }

  async ngOnInit(): Promise<void> {
    for (let i = 0; i <= 20; i++) {
      this.edad.push(i);
    }

    try {
      this.isLoading = true;

      this.misMascotas = await lastValueFrom(
        this.apiRequestService.getAllWithAuth<any[]>('perfil/mis-mascotas')
      );

      console.log('misMascotas response: ', this.misMascotas);

      this.especies = await lastValueFrom(
        this.apiRequestService.getAll<any[]>('especies')
      );
      console.log('Especies response: ', this.especies);

      this.razas = await lastValueFrom(
        this.apiRequestService.getAll<any[]>('razas')
      );
      console.log('razas response: ', this.razas);
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoading = false;
    }
  }

  async onFileSelected(files: File[]): Promise<void> {
    // this.imagenes = [];
    this.imagenes = files;
    /*
    for (const file of this.imagenes) {
      this.formData.append('imagenes', file, file.name);
    }
    */

    this.formData.append('imagenes', files[files.length - 1], files[files.length - 1].name);
    

    console.log("this.formData: ", this.formData);
  }


  async onDeleteImagenFromBack(idMascota: string, imagen_url: string): Promise<void> {

    console.log("Se quiere eliminar una imgen que esta en el back");

    // return;
      const formDataImagen = new FormData();
      
      formDataImagen.append('url', imagen_url);
      
      try {
        const response = await lastValueFrom(
          this.apiRequestService.update<any>(
            'mascotas/deleteImagenMascota',
            idMascota,
            formDataImagen
          )
        );

        if (response) {
          this.message.success('Imagen eliminada');
        }
      } catch (error) {
        console.error('Error:', error);
      }
  }
  
  async onSubmit(id: string): Promise<void> {
    if (this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
      console.log('formulario válido: ', this.formGroup.valid);

      this.formData.append('nombre', this.formGroup.value.nombre);
      this.formData.append('descripcion', this.formGroup.value.descripcion);
      this.formData.append('sexo', this.formGroup.value.sexo);
      this.formData.append('edad', this.formGroup.value.edad);
      this.formData.append('raza', this.formGroup.value.raza);
      this.formData.append('especie', this.formGroup.value.especie);

      try {
        const response = await lastValueFrom(
          this.apiRequestService.updateWithFile<any>(
            'mascotas',
            id,
            this.formData
          )
        );

        if (response) {
          this.message.success('Formulario enviado correctamente');
          this.formData = new FormData();
          this.imagenes = [];
          this.modalRef?.hide();

          const mascotaUpdatedIndex = this.misMascotas.findIndex((mascota) => mascota._id === id);
          console.log("Response: ", response);
          this.misMascotas[mascotaUpdatedIndex] = response;
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      this.message.error('Formulario inválido');
    }
  }

  async deleteMascota(id: string): Promise<void> {
    try {
      this.isLoading = true;

      const eliminado = await lastValueFrom(
        this.apiRequestService.delete<any>('mascotas', id)
      );

      if (eliminado) {
        this.misMascotas = this.misMascotas.filter(
          (objeto) => objeto._id !== id
        );
        this.message.success('Elemento eliminado exitosamente');
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoading = false;
    }
  }

  openModal(template: TemplateRef<any>, mascota: any) {
    this.formGroup.patchValue({
      nombre: mascota.nombre,
      especie: mascota.especie?._id,
      raza: mascota.raza?._id,
      edad: mascota.edad,
      sexo: mascota.sexo,
      descripcion: mascota.descripcion,
    });

    this.mascotaSeleccionada = mascota;

    this.modalRef = this.modalService.show(template);
  }
}
