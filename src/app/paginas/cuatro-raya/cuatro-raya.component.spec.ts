import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuatroRayaComponent } from './cuatro-raya.component';

describe('CuatroRayaComponent', () => {
  let component: CuatroRayaComponent;
  let fixture: ComponentFixture<CuatroRayaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuatroRayaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuatroRayaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
