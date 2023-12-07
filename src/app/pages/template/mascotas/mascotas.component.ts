import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { environment } from 'src/environments/environment';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.scss']
})
export class MascotasComponent implements OnInit {

  assets_path = environment.ASSET_URL;
  isLoading: boolean = true;


  mascotasList: any;

  limitPaginado: number = 10;
  currentPage: number = 1;

  page?: number = 1;

  constructor(
    private apiRequestService: ApiRequestService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.loadData();
  }

  private async loadData(): Promise<void> {
    try {
      this.isLoading = true;
      this.mascotasList = await lastValueFrom(
        this.apiRequestService.getAll<any>(`mascotas?page=${this.page}&limit=${this.limitPaginado}`)
      );
      console.log('MascotasList: ', this.mascotasList);
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoading = false;
    }
  }
  

  async goToPage(event: PageChangedEvent): Promise<void>{

    console.log('$event: ',event);
    console.log('Número de la página seleccionada:', event.page);
    //this.page = event.page;

    if (event.page !== this.page) {
      this.page = event.page;
      await this.loadData();
    }
  }

  async goToUserDetail(id: number | undefined): Promise<void> {
    if (id) {
      this.router.navigateByUrl('/home/usuario/' + id);
    }
  }

}