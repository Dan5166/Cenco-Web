import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelResponsableComponent } from './panel-responsable.component';

describe('PanelResponsableComponent', () => {
  let component: PanelResponsableComponent;
  let fixture: ComponentFixture<PanelResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelResponsableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
