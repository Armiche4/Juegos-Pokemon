import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtroPerfilComponent } from './otro-perfil.component';

describe('OtroPerfilComponent', () => {
  let component: OtroPerfilComponent;
  let fixture: ComponentFixture<OtroPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtroPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtroPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
