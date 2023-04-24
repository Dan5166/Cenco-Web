import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngenieriaOperacionesComponent } from './ingenieria-operaciones.component';

describe('IngenieriaOperacionesComponent', () => {
  let component: IngenieriaOperacionesComponent;
  let fixture: ComponentFixture<IngenieriaOperacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngenieriaOperacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngenieriaOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
