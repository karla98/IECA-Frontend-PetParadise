import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { UploaderComponent } from 'src/app/components/uploader/uploader.component';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil-mascotas',
  templateUrl: './perfil-mascotas.component.html',
  styleUrls: ['./perfil-mascotas.component.scss']
})
export class PerfilMascotasComponent implements OnInit{
  formGroup!: FormGroup;

  isLoading: boolean = true;

  especies: any[] =[];
  razas: any[] =[];

  edad: number[] = [];

  formData: any;

  imagenes: File[] = [];

  @ViewChild(UploaderComponent) uploaderComponent!: UploaderComponent;


  constructor(private fb: FormBuilder, 
    private authService: AuthService, 
    private apiRequestService: ApiRequestService,
    private router: Router, private message: ToastrService ) {
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

    for(let i=0; i<=20; i++){
      this.edad.push(i);
    }
    
    try {
      this.isLoading = true;

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
    this.formData = new FormData();
    this.imagenes = files;
    for (const file of this.imagenes) {
      this.formData.append('imagenes', file, file.name);
    }
  }


  async onSubmit():Promise<void>{
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
        
        await lastValueFrom(
          this.apiRequestService.createWithFile<any>('mascotas', this.formData)
        );
        this.formGroup.reset();

        //this.imagenes=[];
        this.uploaderComponent.reset();

        this.message.success('Formulario enviado correctamente');
      } catch (error) {
        console.error('Error:', error);
      }
    }else{
      this.message.error('Formulario inválido')

    }

  }

}
