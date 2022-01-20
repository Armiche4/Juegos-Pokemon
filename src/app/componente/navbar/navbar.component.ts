import { Component, OnInit } from '@angular/core';

import { LoginService } from 'src/app/servicios/login.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private servicioLogin: LoginService, private router:Router) { 

   /* if(localStorage.getItem("PokemonUsuarioLogueado")!=""){
      this.userLogged=this.servicioLogin.getUserLogged().subscribe(resultado=> {this.nombre=resultado?.email?.split("@");console.log(this.nombre);} );
      
      //
    console.log("holisquis")
    }
    */
  }

  ngOnInit(): void {
    this.logeado=localStorage.getItem("PokemonUsuarioLogueado")!;
   

    this.userLogged.subscribe(resultado=>{this.nombre=resultado?.email?.split("@"); }    );


    
  }

logeado:string="";
userLogged=this.servicioLogin.getUserLogged();

nombre:any;


irLogin(){

  this.router.navigate(['/Juegos-Pokemon/login']);
}


irPerfil(){

  this.router.navigate(['/Juegos-Pokemon/perfil']);
}

}
