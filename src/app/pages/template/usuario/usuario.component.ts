import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {
  assets_path = environment.ASSET_URL;

  isLoading: boolean = true;

  usuario: any = {};
  userId:string = '';
  constructor(private apiRequestService: ApiRequestService, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    await this.route.params.subscribe(params => {
      this.userId = params['id'];
      console.log('ID del usuario:', this.userId);
    });

    try {
      this.isLoading = true;
      this.usuario = await lastValueFrom(
        this.apiRequestService.getOne<any>(
          'usuarios',
          this.userId
        )
      );
      console.log('usuario por id: ', this.usuario)
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoading = false;
    }
  }
}
