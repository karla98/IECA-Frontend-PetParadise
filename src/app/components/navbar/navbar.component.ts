import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild('navButtonResponsivo', { read: ElementRef }) navButtonResponsivo: ElementRef | undefined;


  isWidthResponsive: boolean = false;
  isExpandedNavBarResponsivo: boolean = false;

  scrollPage = false;
  scrollPageMax = false;

  isHome=false;
  menuItemActivo = '';

  assets_path = environment.ASSET_URL;


  constructor(private router: Router, public location: Location, private element: ElementRef, private renderer: Renderer2) {
      this.checkScreenWidth();

    }

  ngOnInit() {
      this.router.events.subscribe((val) => {
          if (this.router.url === '/home') {
            this.isHome = true;
          }else{
              this.isHome = false;
          }
        });
      
  }

  ngAfterViewInit() {
      if (this.isWidthResponsive && this.navButtonResponsivo?.nativeElement) {
          const buttonElement = this.navButtonResponsivo.nativeElement;
          console.log('Entra a IF ngAfterViewInit');

          // Observa cambios en aria-expanded utilizando MutationObserver
          const observer = new MutationObserver((mutationsList, observer) => {
              for (const mutation of mutationsList) {
                  if (mutation.type === 'attributes' && mutation.attributeName === 'aria-expanded') {
                      const isExpanded = buttonElement.getAttribute('aria-expanded') === 'true';
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

  @HostListener("window:scroll", ['$event'])
  onScroll($event: any){

      if($event && window.pageYOffset > 700 && this.isHome){
          //console.log('entra a aqui = '+ this.isHome);

          this.scrollPage = true;
          this.scrollPageMax = true;

      }else if($event && window.pageYOffset > 100 && this.isHome){
          this.scrollPageMax = true;

      }
      else if($event && window.pageYOffset > 168 && !this.isHome){
          this.scrollPage = true;
          this.scrollPageMax = true;

      }
      else{
          this.scrollPage = false;
          this.scrollPageMax = false;

      }
      // Inicio:  colocar el menu activo en base al scroll vertical
      if($event) {
          if(window.pageYOffset < 350) {
              this.menuItemActivo = 'about-section';
          } else  if ( window.pageYOffset < 1210 ) {
              this.menuItemActivo = 'skills-section';
          } else if ( window.pageYOffset < 1700 ) {
              this.menuItemActivo = 'projects-section';
          } else {
              this.menuItemActivo = 'contact-section';
          }
      }
      // Fin:  colocar el menu activo en base al scroll vertical
  }

  goToSection(section: any) {
      this.router.navigate(['/home']);
      setTimeout(() => {
          try {
              const element = document.getElementById(section);
      
              if (element) {
                  element.scrollIntoView({behavior: 'smooth'});

                  this.menuItemActivo = section;
              }
          } finally {
              section = null;
          }
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize($event: any) {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    this.isWidthResponsive = window.innerWidth <= 993;
  }
}
