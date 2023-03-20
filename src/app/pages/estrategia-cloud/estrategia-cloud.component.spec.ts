import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstrategiaCloudComponent } from './estrategia-cloud.component';

describe('EstrategiaCloudComponent', () => {
  let component: EstrategiaCloudComponent;
  let fixture: ComponentFixture<EstrategiaCloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstrategiaCloudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstrategiaCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
