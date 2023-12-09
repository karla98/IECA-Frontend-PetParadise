import { NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { ApiRequestService } from 'src/app/services/api-request.service';
import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  formgroup :FormGroup;
  constructor(private router: Router, private apiRequestService: ApiRequestService, private message: ToastrService, private zone: NgZone,  private formb:FormBuilder) {
    this.formgroup = formb.group({
      descripcion:['', [Validators.required]]
    })
  }

  iduser: any = null;
  userLogged: any = null;
  posts:any[] = [];
  isHome = false;
  modal:boolean = false;
  file:File[] = [];

  async ngOnInit(): Promise<void> {
    this.router.events.subscribe((val) => {
      if (this.router.url === '/home') {
        this.isHome = true;
        console.log('ES HOME ONINIT: ', this.router.url);
      } else {
        this.isHome = false;
        console.log('NO ES HOME ONINIT: ', this.router.url);
      }
    });

    


    try {
      this.userLogged = await lastValueFrom(
        this.apiRequestService.getAllWithAuth<any[]>('perfil')
      );
      this.iduser = this.userLogged._id;
      this.LoadData();
        console.log(this.userLogged);
      console.log('User logged: ', this.userLogged);

    } catch (e) {
    } finally {
    }

  }

  OpenModal():void{
    this.modal = true;
  }

  onFileSelected(files: File[]): void {
    this.file = files;
  }
  CloseModal():void
  {
      this.modal = false;
      this.file = [];
      this.formgroup.patchValue({
        descripcion:null
      })
  }

  async SendData():Promise<void>{
    const formData = new FormData();
    for (const file of this.file) {
      formData.append('imagen', file, file.name);
      formData.append("descripcion", this.formgroup.value.descripcion);
    }

    if (this.file && this.file.length > 0) {
      try {
        const res = await lastValueFrom(
          this.apiRequestService.createWithFile<any>('post', formData)
        );
        this.message.success("Post Creado con exito");
        this.modal = false;
        this.formgroup.patchValue({
          descripcion:null
        })
      } catch (error) {
        console.error('Error al cargar imágenes:', error);

        // Muestra el mensaje de error dentro de la zona de Angular
        this.zone.run(() => {
          this.message.error('Error al cargar imágenes');
        });
      }
    }
  }

  async LoadData():Promise<void>{
    try{
      this.apiRequestService.getOne<any>('post', this.iduser ).subscribe(
        (data) => {
          console.log('Datos obtenidos:', data);
          this.posts = data; // Asigna los datos a la propiedad post del componente

        },
        (error) => {
          console.error('Error al obtener datos:', error);
          // Maneja errores según tus necesidades
        }
      );
    }
    catch(err)
    {
      this.message.error("error");
    }
  }
}

