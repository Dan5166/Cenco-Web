import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComoNavegarComponent } from './como-navegar.component';

describe('ComoNavegarComponent', () => {
  let component: ComoNavegarComponent;
  let fixture: ComponentFixture<ComoNavegarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComoNavegarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComoNavegarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
