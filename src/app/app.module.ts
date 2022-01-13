import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import{PokePreguntasComponent} from "./paginas/poke-preguntas/poke-preguntas.component";


import { HttpClientModule } from '@angular/common/http'; 

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PokeCartasComponent } from './paginas/poke-cartas/poke-cartas.component';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SopaletrasComponent } from './paginas/sopaletras/sopaletras.component';
import { MemorionComponent } from './paginas/memorion/memorion.component';
import { HomeComponent } from './paginas/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    PokePreguntasComponent,
    PokeCartasComponent,
    SopaletrasComponent,
    MemorionComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
