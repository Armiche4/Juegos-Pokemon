import { Component, OnInit } from '@angular/core';

import { PokeServicioService } from "../../servicios/poke-servicio.service";

import { FormGroup, FormControl, Validators} from '@angular/forms';

import { Router } from '@angular/router';


import { Usuario } from 'src/app/interfaces/usuario';

import { BaseDatosService } from 'src/app/servicios/base-datos.service';

@Component({
  selector: 'app-poke-preguntas',
  templateUrl: './poke-preguntas.component.html',
  styleUrls: ['./poke-preguntas.component.scss']
})
export class PokePreguntasComponent implements OnInit {

  constructor(private servicio: PokeServicioService, private router:Router,private baseDatos:BaseDatosService) { }

  pokemon: any;
  lista: any[] = [];
  listaTipos: any[] = [];
  listaAltura: any[] = [];
  
  repuestaTipoHtml: String = "";  
  respuestaNameHtml: String = "";
  repuestaAlturaHtml: String = "";
  mostrar: boolean = false;
  mostrarNombre: Boolean = false;
  mostrarTipo: Boolean = false;
  mostrarAltura: Boolean = false;


  formulario = new FormGroup({
    name: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    peso: new FormControl('', Validators.required),
  });
 
 repuestasCorrectas=0;
 respuestasIncorrectas=0;
 collecionBaseDatos="Records Pokemon";
 logeado= {} as Usuario;

  ngOnInit(): void {

    this.servicio.getOne(this.getRandom(1, 898)).subscribe(resultado => {
      resultado.height = Math.round(resultado.height * 0.1 * 100) / 100;
      resultado.weight = Math.round(resultado.weight * 0.1 * 100) / 100;
      resultado.name=resultado.name.charAt(0).toUpperCase() + resultado.name.slice(1);
      resultado.types[0].type.name=resultado.types[0].type.name.charAt(0).toUpperCase() +resultado.types[0].type.name.slice(1);

      this.lista.push(resultado);
      this.pokemon = resultado;
      this.listaTipos.push(resultado);
      this.listaAltura.push(resultado);
    })

    for (let i = 0; i < 4; i++) {




      this.servicio.getOne(this.getRandom(1, 898)).subscribe(resultado => {

        resultado.height = Math.round(resultado.height * 0.1 * 100) / 100;
        resultado.weight = Math.round(resultado.weight * 0.1 * 100) / 100;
        resultado.name=resultado.name.charAt(0).toUpperCase() + resultado.name.slice(1);
        resultado.types[0].type.name=resultado.types[0].type.name.charAt(0).toUpperCase() +resultado.types[0].type.name.slice(1);
       
        this.lista.push(resultado);
        this.listaTipos.push(resultado);
        this.listaAltura.push(resultado);

        if (this.getRandom(1, 3) === 2) {
          this.listaTipos.reverse();

        }
        this.listaAltura.reverse();
        if (this.getRandom(1, 2) === 2) {
          this.listaAltura.reverse();

        }

      })


    }

    var users;
 
    this.baseDatos.obtenerTodos(this.collecionBaseDatos).subscribe((usuariosRef) => {
 
     users = usuariosRef.map(userRef => {
        let usuario: any = userRef.payload.doc.data();
      
    if(usuario.email==localStorage.getItem("PokemonUsuarioLogueado")){
      usuario['id'] = userRef.payload.doc.id;
    this.logeado=usuario;
      return usuario;
    }
    
       
      });
    console.log(this.logeado);
    })



  }





  getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }



  enviar() {
    console.log(this.formulario.value);
    if (this.pokemon.name === this.formulario.value.name) {
      this.respuestaNameHtml = this.pokemon.name + " es la respuesta correcta";
      this.mostrarNombre = true;
      this.repuestasCorrectas++;
      
    }
    else {
      this.respuestaNameHtml =  this.pokemon.name + " es la respuesta correcta. Tu respuesta: " + this.formulario.value.name;
      this.respuestasIncorrectas++;
    }
    if (this.pokemon.types[1] != undefined) {
      if (this.pokemon.types[0].type.name + this.pokemon.types[1].type.name === this.formulario.value.tipo) {
        this.repuestaTipoHtml =  this.pokemon.types[0].type.name +" "+ this.pokemon.types[1]?.type.name + " es la respuesta correcta";
        this.mostrarTipo = true;
        this.repuestasCorrectas++;
      }
      else {
        this.repuestaTipoHtml =  this.pokemon.types[0].type.name  +" "+ this.pokemon.types[1].type.name + " es la respuesta correcta. Tu respuesta:"  + this.formulario.value.tipo;
        this.respuestasIncorrectas++;
      }
    }
    else {
      if (this.pokemon.types[0].type.name === this.formulario.value.tipo) {
        this.repuestaTipoHtml =  this.pokemon.types[0].type.name + " es la respuesta correcta";
        this.mostrarTipo = true;
        this.repuestasCorrectas++;
      }
      else {
        this.repuestaTipoHtml =  this.pokemon.types[0].type.name + " es la respuesta correcta. Tu respuesta: " + this.formulario.value.tipo;
        this.respuestasIncorrectas++;
      }
    }
    if (this.pokemon.weight+"-"+this.pokemon.height ==this.formulario.value.peso) {
      this.repuestaAlturaHtml =  this.pokemon.weight + " kg - "+ this.pokemon.height + " m es la respuesta correcta";
      this.mostrarAltura = true;
      this.repuestasCorrectas++;
    }
    else {
      this.repuestaAlturaHtml =  this.pokemon.weight + " kg es la respuesta correcta. Tu respuesta: " + this.formulario.value.peso + " Kg";
      this.respuestasIncorrectas++;
    }

    this.mostrar = true;
 

    
      this.logeado.testAciertos=this.logeado.testAciertos!+this.repuestasCorrectas;
      this.logeado.testFallos=this.logeado.testFallos!+this.respuestasIncorrectas;
    
      this.baseDatos.actualizar(this.collecionBaseDatos,this.logeado,this.logeado.id!)
    

  }

  reinicio(){
    //location.reload();



    this.router.navigateByUrl('/cartas', { skipLocationChange: true }).then(() => {
      this.router.navigate(["/test"]); 
  }); 

  }


}
