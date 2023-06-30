import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursitoComponent } from './cursito.component';

describe('CursitoComponent', () => {
  let component: CursitoComponent;
  let fixture: ComponentFixture<CursitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursitoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
