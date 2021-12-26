import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokePreguntasComponent } from './poke-preguntas.component';

describe('PokePreguntasComponent', () => {
  let component: PokePreguntasComponent;
  let fixture: ComponentFixture<PokePreguntasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokePreguntasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokePreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
