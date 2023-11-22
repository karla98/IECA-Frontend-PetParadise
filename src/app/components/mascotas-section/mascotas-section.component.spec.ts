import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasSectionComponent } from './mascotas-section.component';

describe('MascotasSectionComponent', () => {
  let component: MascotasSectionComponent;
  let fixture: ComponentFixture<MascotasSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MascotasSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MascotasSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
