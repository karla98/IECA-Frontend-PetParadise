import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-mascota-detail',
  templateUrl: './mascota-detail.component.html',
  styleUrls: ['./mascota-detail.component.scss']
})
export class MascotaDetailComponent implements OnInit{
  assets_path = environment.ASSET_URL;

  isLoading: boolean = true;

  mascota: any = {};
  mascotaId:string = '';

  constructor(private apiRequestService: ApiRequestService, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    await this.route.params.subscribe(params => {
      this.mascotaId = params['id'];
    });

    try {
      this.isLoading = true;
      this.mascota = await lastValueFrom(
        this.apiRequestService.getOne<any>(
          'mascotas',
          this.mascotaId
        )
      );
      console.log('mascota por id: ', this.mascota)
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoading = false;
    }
  }

}
