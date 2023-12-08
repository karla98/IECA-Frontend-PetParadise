import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisMascotasComponent } from './mis-mascotas.component';

describe('MisMascotasComponent', () => {
  let component: MisMascotasComponent;
  let fixture: ComponentFixture<MisMascotasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisMascotasComponent]
    });
    fixture = TestBed.createComponent(MisMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
