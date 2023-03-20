import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstructuraCctComponent } from './estructura-cct.component';

describe('EstructuraCctComponent', () => {
  let component: EstructuraCctComponent;
  let fixture: ComponentFixture<EstructuraCctComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstructuraCctComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstructuraCctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
