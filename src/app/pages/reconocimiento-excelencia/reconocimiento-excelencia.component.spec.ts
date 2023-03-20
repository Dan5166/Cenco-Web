import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconocimientoExcelenciaComponent } from './reconocimiento-excelencia.component';

describe('ReconocimientoExcelenciaComponent', () => {
  let component: ReconocimientoExcelenciaComponent;
  let fixture: ComponentFixture<ReconocimientoExcelenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconocimientoExcelenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReconocimientoExcelenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
