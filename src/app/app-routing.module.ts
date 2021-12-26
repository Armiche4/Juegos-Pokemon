import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import{PokePreguntasComponent} from "./paginas/poke-preguntas/poke-preguntas.component"

import { PokeCartasComponent } from './paginas/poke-cartas/poke-cartas.component';

const routes: Routes = [
  { path: '', redirectTo: 'test', pathMatch: 'full' },
  { path: 'test',
    component: PokePreguntasComponent
  },
  { path: 'cartas',
    component: PokeCartasComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
