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
import { LoginComponent } from './paginas/login/login.component';
import { NavbarComponent } from './componente/navbar/navbar.component';

 import { AngularFireModule } from '@angular/fire/compat'; 
import { environment } from 'src/environments/environment';



import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { PerfilComponent } from './paginas/perfil/perfil.component';
import { RecordsComponent } from './paginas/records/records.component';


@NgModule({
  declarations: [
    AppComponent,
    PokePreguntasComponent,
    PokeCartasComponent,
    SopaletrasComponent,
    MemorionComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    PerfilComponent,
    RecordsComponent,
   
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
    SweetAlert2Module.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    
 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
