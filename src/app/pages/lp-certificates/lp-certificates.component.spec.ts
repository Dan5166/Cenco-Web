import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpCertificatesComponent } from './lp-certificates.component';

describe('LpCertificatesComponent', () => {
  let component: LpCertificatesComponent;
  let fixture: ComponentFixture<LpCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LpCertificatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LpCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
