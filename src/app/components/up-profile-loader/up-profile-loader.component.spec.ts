import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpProfileLoaderComponent } from './up-profile-loader.component';

describe('UpProfileLoaderComponent', () => {
  let component: UpProfileLoaderComponent;
  let fixture: ComponentFixture<UpProfileLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpProfileLoaderComponent]
    });
    fixture = TestBed.createComponent(UpProfileLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
