import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NubesPublicasComponent } from './nubes-publicas.component';

describe('NubesPublicasComponent', () => {
  let component: NubesPublicasComponent;
  let fixture: ComponentFixture<NubesPublicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NubesPublicasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NubesPublicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
