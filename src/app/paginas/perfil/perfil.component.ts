import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';


import { Router } from '@angular/router';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';

import { LoginService } from 'src/app/servicios/login.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(private database:BaseDatosService, private login:LoginService,private router:Router) { 

 
  }



  records= {} as Usuario;
usuario:any;
collecionBaseDatos="Records Pokemon";

logeado:string="";


  ngOnInit(): void {
this.logeado=localStorage.getItem("PokemonUsuarioLogueado")!;



let users;
this.obtenerUsuarioLogeado();
this.database.obtenerTodos(this.collecionBaseDatos).subscribe((usuariosRef) => {
 
  users = usuariosRef.map(userRef => {
    let user: any = userRef.payload.doc.data();
  console.log(user.email); console.log(localStorage.getItem("PokemonUsuarioLogueado"))
if(user.email==localStorage.getItem("PokemonUsuarioLogueado")){
  //user['id'] = userRef.payload.doc.id;

this.records=user;
  return user;
}

   
  });
console.log(this.records);
})
/*
this.database.obtenerPorId(this.collecionBaseDatos,localStorage.getItem("PokemonUsuarioLogueado")!).subscribe((resultado) => {
 
  this.records = resultado.payload.data();
  console.log(this.records)
})
*/


/*    this.database.obtenerTodos("Records Pokemon").subscribe((usuariosRef) => {
      console.log("usuariosRef: ", usuariosRef);
      this.usuarios = usuariosRef.map(userRef => {
        let usuario: any = userRef.payload.doc.data();
        usuario['id'] = userRef.payload.doc.id;

       return usuario;
      });
      console.log(this.usuarios)
    })
  */
 
  }


  obtenerUsuarioLogeado(){
    this.login.getUserLogged().subscribe(resultado=>{
this.usuario=resultado;
console.log(this.usuario);

    });
  }

  logout() {
    this.login.logout();
    localStorage.setItem("PokeBolaPokeJuego","");
    localStorage.setItem("PokemonUsuarioLogueado","")
    this.router.navigate(['/login']);
  }

  irLogin(){

    this.router.navigate(['/login']);
  }

}
