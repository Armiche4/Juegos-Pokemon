import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import{PokePreguntasComponent} from "./paginas/poke-preguntas/poke-preguntas.component"

import { PokeCartasComponent } from './paginas/poke-cartas/poke-cartas.component';

import { SopaletrasComponent } from './paginas/sopaletras/sopaletras.component';

import { MemorionComponent } from './paginas/memorion/memorion.component';

import { HomeComponent } from './paginas/home/home.component';

import { LoginComponent } from './paginas/login/login.component';

import { PerfilComponent } from './paginas/perfil/perfil.component';

import { RecordsComponent } from './paginas/records/records.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'test',
    component: PokePreguntasComponent
  },
  { path: 'cartas',
    component: PokeCartasComponent
  },
  { path: 'sopaLetras',
  component: SopaletrasComponent
},
{ path: 'memorion',
component: MemorionComponent
},
{ path: 'home',
component: HomeComponent
},
{ path: 'login',
component: LoginComponent
},
{ path: 'perfil',
component: PerfilComponent
},
{ path: 'records',
component: RecordsComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
