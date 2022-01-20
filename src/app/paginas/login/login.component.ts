import { Component, OnInit,ViewChild } from '@angular/core';

import { Router } from '@angular/router';
//import { AuthService } from 'src/app/services/auth.service';
//import { DataBaseService } from 'src/app/services/database.service';

import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { LoginService } from 'src/app/servicios/login.service';

import { Usuario } from 'src/app/interfaces/usuario';


import { FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('error') public readonly deleteSwal!: SwalComponent;

  usuario:Usuario = {
    email: '',
    password: '',
    memorion:0,
    cartas:0,
    testFallos:0,
    testAciertos:0,
    SopaLetras:0, 
  }

 collecionBaseDatos="Records Pokemon";

 mostrar=true;

 formulario = new FormGroup({
  email: new FormControl('', Validators.required),
  password: new FormControl('', Validators.required),
  
});
formularioRegistrarseform = new FormGroup({
  emailRegistrarse: new FormControl('', Validators.required),
  passwordRegistrarse: new FormControl('', Validators.required),  
});
  ngOnInit() {

  }

  constructor(private loginService: LoginService, private router: Router,private baseDatos:BaseDatosService) { }

  Ingresar() {
    this.usuario.email=this.formularioRegistrarseform.value.emailRegistrarse;
    this.usuario.password=this.formularioRegistrarseform.value.passwordRegistrarse;
this.loginService.register(this.usuario.email,this.usuario.password).then(resultado=>

  {  this.baseDatos.crear(this.collecionBaseDatos,this.usuario);
    localStorage.setItem("PokemonUsuarioLogueado",this.usuario.email);
    //this.limpiarCampos();
    this.formularioRegistrarseform.reset();
    this.router.navigate(['/Juegos-Pokemon/home']);
  });

  }

  logIn(){

   //const { email, password } = this.usuario;
    this.loginService.login(this.formulario.value.email, this.formulario.value.password).then(user => {
      console.log("Bienvenido ", user);
       //this.limpiarCampos();
      
      if(!user) {
        //alert("Datos incorrectos, si no tenes cuenta registrate!");
        this.deleteSwal.fire();
        return;
      };
      localStorage.setItem("PokemonUsuarioLogueado",this.formulario.value.email);
      this.formulario.reset();
      this.router.navigate(['/Juegos-Pokemon/home']);
    
    }).catch(err=>{
      console.log(err)
    })
   
  }

/*
  logout() {
    this.loginService.logout();
  }

  obtenerUsuarioLogeado(){
    this.loginService.getUserLogged().subscribe(resultado=>{
console.log(resultado);

    });
  }
  */
  IngresarGoogle(){
    this.loginService.loginGoogle(this.usuario.email,this.usuario.password).then(resultado=>
      {   } )
  }

  limpiarCampos(){

    this.usuario = {
      email: '',
      password: '',
      memorion:0,
      cartas:0,
      testFallos:0,
      testAciertos:0,
      SopaLetras:0, 
    }
  }

  formularioRegistrarse(){
if(this.mostrar==true){
  this.mostrar=false;

}
   else{
     this.mostrar=true;
   }
  }

}
