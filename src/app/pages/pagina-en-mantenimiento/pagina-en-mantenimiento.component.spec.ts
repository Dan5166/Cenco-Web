import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaEnMantenimientoComponent } from './pagina-en-mantenimiento.component';

describe('PaginaEnMantenimientoComponent', () => {
  let component: PaginaEnMantenimientoComponent;
  let fixture: ComponentFixture<PaginaEnMantenimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaEnMantenimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaEnMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
