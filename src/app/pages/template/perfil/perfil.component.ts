import { NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { ApiRequestService } from 'src/app/services/api-request.service';
import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(
    private router: Router,
    private apiRequestService: ApiRequestService,
    private message: ToastrService,
    private zone: NgZone
  ) {

  }

  userLogged: any = null;
  isHome = false;

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

      console.log('User logged: ', this.userLogged);

    } catch (e) {
    } finally {
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

