import { Component, NgZone, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss'],
})
export class CuentaComponent implements OnInit {
  //formulario: FormGroup;

  ASSETS = environment.ASSET_URL;
  isLoading: boolean = true;

  isAuthenticated = false;
  userLogged: any = null;

  formGroup!: FormGroup;

  imagenExistentePerfil: any[] = [];
  constructor(
    private apiRequestService: ApiRequestService,
    private message: ToastrService,
    private zone: NgZone,
    private auth: AuthService,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8)]],
    });
  }

  async ngOnInit(): Promise<void> {
    this.isAuthenticated = this.auth.isAuthenticated();
    if (this.isAuthenticated) {
      try {
        this.userLogged = await lastValueFrom(
          this.apiRequestService.getAllWithAuth<any[]>('perfil')
        );

        if (this.userLogged.imagen) {
          this.imagenExistentePerfil.push(this.userLogged.imagen);
        }

        if (this.userLogged) {
          this.formGroup.patchValue({
            nombre: this.userLogged.nombre,
            email: this.userLogged.email,
            // password: this.userLogged.password,
          });
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

  async onSubmit(id: string): Promise<void> {
    console.log('this.formGroup: ', this.formGroup);
    // return;
    if (this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
      console.log('formulario válido: ', this.formGroup.valid);

      const formData = new FormData();
      formData.append('nombre', this.formGroup.value.nombre);
      formData.append('email', this.formGroup.value.email);
      formData.append('password', this.userLogged.password);

      try {
        const response = await lastValueFrom(
          this.apiRequestService.update<any>('perfil', id, formData)
        );

        if (response) {
          this.message.success('Usuario modificado correctamente');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      this.message.error('Formulario inválido');
    }
  }

  async onDeleteImagenFromBack(
    idUsuario: string,
    imagen_url: string
  ): Promise<void> {
    console.log('Se quiere eliminar una imgen que esta en el back');

    // return;
    const formDataImagen = new FormData();

    formDataImagen.append('url', imagen_url);

    try {
      const response = await lastValueFrom(
        this.apiRequestService.update<any>(
          'perfil/deleteImagenUsuario',
          idUsuario,
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
}
