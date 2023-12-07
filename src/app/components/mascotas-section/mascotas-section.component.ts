import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mascotas-section',
  templateUrl: './mascotas-section.component.html',
  styleUrls: ['./mascotas-section.component.scss'],
})
export class MascotasSectionComponent implements OnInit {
  assets_path = environment.ASSET_URL;

  mascotasRecientes: any[] = [];
  constructor(
    private apiRequestService: ApiRequestService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.mascotasRecientes = await lastValueFrom(
        this.apiRequestService.getAll<any[]>('home')
      );
    } catch (e) {
      console.error(e);
    } finally {
    }
  }

  async goToUserDetail(id: number | undefined): Promise<void> {
    if (id) {
      this.router.navigateByUrl('/home/usuario/' + id);
    }
  }
}
