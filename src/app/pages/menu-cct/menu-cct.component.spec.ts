import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCctComponent } from './menu-cct.component';

describe('MenuCctComponent', () => {
  let component: MenuCctComponent;
  let fixture: ComponentFixture<MenuCctComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCctComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
