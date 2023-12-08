import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilTemplateComponent } from './perfil-template.component';

describe('PerfilTemplateComponent', () => {
  let component: PerfilTemplateComponent;
  let fixture: ComponentFixture<PerfilTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilTemplateComponent]
    });
    fixture = TestBed.createComponent(PerfilTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
