import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArquitecturaFinanzasComponent } from './arquitectura-finanzas.component';

describe('ArquitecturaFinanzasComponent', () => {
  let component: ArquitecturaFinanzasComponent;
  let fixture: ComponentFixture<ArquitecturaFinanzasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArquitecturaFinanzasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArquitecturaFinanzasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
