import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorionComponent } from './memorion.component';

describe('MemorionComponent', () => {
  let component: MemorionComponent;
  let fixture: ComponentFixture<MemorionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemorionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemorionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
