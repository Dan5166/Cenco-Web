import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgradecimientoReconocimientoComponent } from './agradecimiento-reconocimiento.component';

describe('AgradecimientoReconocimientoComponent', () => {
  let component: AgradecimientoReconocimientoComponent;
  let fixture: ComponentFixture<AgradecimientoReconocimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgradecimientoReconocimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgradecimientoReconocimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
