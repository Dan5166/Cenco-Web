import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NominaAAlguienComponent } from './nomina-a-alguien.component';

describe('NominaAAlguienComponent', () => {
  let component: NominaAAlguienComponent;
  let fixture: ComponentFixture<NominaAAlguienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NominaAAlguienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NominaAAlguienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
