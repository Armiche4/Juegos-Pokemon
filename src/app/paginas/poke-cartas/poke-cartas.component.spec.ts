import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeCartasComponent } from './poke-cartas.component';

describe('PokeCartasComponent', () => {
  let component: PokeCartasComponent;
  let fixture: ComponentFixture<PokeCartasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeCartasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeCartasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
