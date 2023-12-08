import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilMascotasComponent } from './perfil-mascotas.component';

describe('PerfilMascotasComponent', () => {
  let component: PerfilMascotasComponent;
  let fixture: ComponentFixture<PerfilMascotasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilMascotasComponent]
    });
    fixture = TestBed.createComponent(PerfilMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
