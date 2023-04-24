import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyudaServiciosComponent } from './ayuda-servicios.component';

describe('AyudaServiciosComponent', () => {
  let component: AyudaServiciosComponent;
  let fixture: ComponentFixture<AyudaServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AyudaServiciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AyudaServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
