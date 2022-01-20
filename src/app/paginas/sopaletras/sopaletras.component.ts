import { Component, OnInit, ViewChild } from '@angular/core';

import { PokeServicioService } from 'src/app/servicios/poke-servicio.service'; 


import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators} from '@angular/forms';


import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { Usuario } from 'src/app/interfaces/usuario';

import { BaseDatosService } from 'src/app/servicios/base-datos.service';

@Component({
  selector: 'app-sopaletras',
  templateUrl: './sopaletras.component.html',
  styleUrls: ['./sopaletras.component.sass']
})
export class SopaletrasComponent implements OnInit {
  @ViewChild('ResultadoFinal') public readonly deleteSwal!: SwalComponent;

  sopaLetras:String[]= [];

  alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

tamanoLado=0;

totalPalabras=4;

palabrasEscondidasCompletas:String[]= [];

palabrasEscondidas:String[]= [];

posicionPalabraEscondida:number[]= [];


utlimasPosiciones:number[]= [];

letrasPulsadas:number[]= [];

aciertos:number=0;

mostrar:Boolean=false;

interval:any;


tiempoSegundos: number = 0;
tiempoMinutos: number = 0;


formulario = new FormGroup({
  numeroPokemon: new FormControl('', Validators.required),
  tamano: new FormControl('', Validators.required),
  
});

logeado= {} as Usuario;
collecionBaseDatos="Records Pokemon";

  constructor(private servicio:PokeServicioService,private router:Router,private baseDatos:BaseDatosService) {


   }


  ngOnInit(): void {

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

evitarPosicion(palabra:String){

  let direccion=this.getRandom(1,3);
  
 let siguienteLetra=1;
  if(direccion==1){

    siguienteLetra=1;
  }
  if(direccion==2){


    siguienteLetra=20;
    //20
  }
  if(direccion==3){

//21
    siguienteLetra=20+1;
  }


  var j=this.getRandom(0,this.tamanoLado-2);
  var repetido=false;
  var posInicial=j;
 var salimos=false;
  

   while(salimos==false){
   
    
for( j;j<(posInicial+(palabra.length*siguienteLetra));j=j+siguienteLetra){

if(this.posicionPalabraEscondida.includes(j)==false &&  this.utlimasPosiciones.includes(j)==false ){

}
else{
repetido=true;

}

}    

if(repetido==false){
salimos=true;

}
else{
repetido=false;
j=this.getRandom(0,this.tamanoLado-2);
posInicial=j;
}
}

let resultado=[];
resultado.push(posInicial);
resultado.push(siguienteLetra);

return resultado;

}





getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


pulsado(posicion:number){

  if(this.letrasPulsadas.includes(posicion)==false){
  console.log(posicion)

  if( this.posicionPalabraEscondida.includes(posicion) ){


    document.getElementById(posicion+"")!.style.backgroundColor="aquamarine";
    this.aciertos++;

  }
  else{

    document.getElementById(posicion+"")!.style.backgroundColor="black"
  }
  this.letrasPulsadas.push(posicion);
}

if(this.aciertos==(this.posicionPalabraEscondida.length)){
  clearInterval(this.interval);

  if(this.totalPalabras==4 && this.tamanoLado==400 && (this.logeado.SopaLetras==0  || this.logeado.SopaLetras!>(this.tiempoMinutos*60)+this.tiempoSegundos)){
    this.logeado.SopaLetras=(this.tiempoMinutos*60)+this.tiempoSegundos;

    this.baseDatos.actualizar(this.collecionBaseDatos,this.logeado,this.logeado.id!)
  }


  this.deleteSwal.fire();
}


}



empezar(){
this.totalPalabras=this.formulario.value.numeroPokemon;
this.tamanoLado=this.formulario.value.tamano;
  this.evitarBordes();
  for(let i=0;i<this.totalPalabras;i++){
    this.servicio.getOne(this.getRandom(1,898)).subscribe(resultado => {
      this.palabrasEscondidasCompletas.push(resultado.sprites.front_default);
      this.palabrasEscondidas =resultado.name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split("");
      let posInicial=this.evitarPosicion(resultado.name);
  console.log(resultado.name);
  console.log(posInicial);
      for(let i=0;i< this.palabrasEscondidas.length;i++){
        this.sopaLetras[posInicial[0]]= this.palabrasEscondidas[i];
        this.posicionPalabraEscondida.push(posInicial[0]);
        posInicial[0]=posInicial[0]+posInicial[1];
      }
  
    
           })

           console.log(this.sopaLetras)
  }
  
     
  for(let i=0;i<(this.tamanoLado);i++){
  
  this.sopaLetras.push(this.alphabet[this.getRandom(0,this.alphabet.length-1)]);  
  
  }
  //20 caracteres cada fila
  
  
  
  console.log(this.sopaLetras)
this.mostrar=true;
this.startTimer();
}


evitarBordes(){

  for(let i=20-1;i<this.tamanoLado;i=i+20){
    this.utlimasPosiciones.push(i);
  }
  for(let i=this.tamanoLado-20;i<this.tamanoLado;i++){

    this.utlimasPosiciones.push(i);
  }
}


reinicio(){

  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(["/sopaLetras"]); 
}); 
}



async startTimer() {
  this.interval = setInterval(() => {
 


    this.tiempoSegundos++;

    if(this.tiempoSegundos==60){

      this.tiempoSegundos=0;
      this.tiempoMinutos++;
    }


  },1000)
}


}
