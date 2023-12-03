import { Location } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild('navButtonResponsivo', { read: ElementRef }) navButtonResponsivo:
    | ElementRef
    | undefined;

  isWidthResponsive: boolean = false;
  isExpandedNavBarResponsivo: boolean = false;
 
  scrollPage = false;
  scrollPageMax = false;

  isHome = false;
  menuItemActivo = '';

  assets_path = environment.ASSET_URL;

  isAuthenticated = false;
  userLogged: any = null;

  constructor(
    private router: Router,
    public location: Location,
    private auth: AuthService,
    private apiRequestService: ApiRequestService,
  ) {
    this.checkScreenWidth();
  }

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
    
    this.isAuthenticated = this.auth.isAuthenticated();

    try {
        this.userLogged = await lastValueFrom(
          this.apiRequestService.getAllWithAuth<any[]>('perfil')
        );

        console.log('User logged: ', this.userLogged);

        this.userLogged.imagen = '';
  
      
      } catch (e) {
      } finally {
      }

  }

  ngAfterViewInit() {
    if (this.isWidthResponsive && this.navButtonResponsivo?.nativeElement) {
      const buttonElement = this.navButtonResponsivo.nativeElement;
      console.log('Entra a IF ngAfterViewInit');

      // Observa cambios en aria-expanded utilizando MutationObserver
      const observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
          if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'aria-expanded'
          ) {
            const isExpanded =
              buttonElement.getAttribute('aria-expanded') === 'true';
            console.log('aria-expanded cambió a:', isExpanded);
            console.log('isExpanded: ', isExpanded);
            if (isExpanded == true) {
              this.isExpandedNavBarResponsivo = true;
            } else {
              this.isExpandedNavBarResponsivo = false;
            }
          }
        }
      });

      observer.observe(buttonElement, { attributes: true });
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event: any) {
    if ($event && window.pageYOffset > 700 && this.isHome) {
      //console.log('entra a aqui = '+ this.isHome);
      this.scrollPage = true;
      this.scrollPageMax = true;
    } else if ($event && window.pageYOffset > 100 && this.isHome) {
      this.scrollPageMax = true;
    } else if (!this.isHome) {
      console.log('ENTRA AL IF QUE QUIERO');
      this.scrollPage = true;
      this.scrollPageMax = true;
    } else {
      this.scrollPage = false;
      this.scrollPageMax = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize($event: any) {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    this.isWidthResponsive = window.innerWidth <= 993;
  }
}
