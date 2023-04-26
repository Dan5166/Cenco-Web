import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManejoDeRolesComponent } from './manejo-de-roles.component';

describe('ManejoDeRolesComponent', () => {
  let component: ManejoDeRolesComponent;
  let fixture: ComponentFixture<ManejoDeRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManejoDeRolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManejoDeRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
