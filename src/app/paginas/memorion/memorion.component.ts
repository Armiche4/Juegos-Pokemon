import { Component, OnInit, ViewChild } from '@angular/core';

import { PokeServicioService } from 'src/app/servicios/poke-servicio.service'; 


import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

import { Router } from '@angular/router';

import { Usuario } from 'src/app/interfaces/usuario';

import { BaseDatosService } from 'src/app/servicios/base-datos.service';

@Component({
  selector: 'app-memorion',
  templateUrl: './memorion.component.html',
  styleUrls: ['./memorion.component.scss']
})
export class MemorionComponent implements OnInit {

  @ViewChild('ResultadoFinal') public readonly deleteSwal!: SwalComponent;

  constructor(private servicio:PokeServicioService,private router: Router,private baseDatos:BaseDatosService) { }

  listaCartas:String[]= [];
listaNumRandon:Number[]=[];

listaCartasBack:String[]= [];


urlBack="data:image/jpeg;base64,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";
interval:any;

cartasLevantadas=0;

timeLeft: number = 0.5;

PosicionesCartasLevantadas:number[]=[];

contador:number=0;

CartasAcertadas:String[]=[];

totalParejas=6;

mostrar:boolean=false;

collecionBaseDatos="Records Pokemon";

logeado= {} as Usuario;

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



  getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


  pulsado(numero:number){

if(this.cartasLevantadas<2){
  


if( this.listaCartasBack[numero]==this.listaCartas[numero]){
 // this.listaCartasBack[numero]=this.urlBack;
 // this.cartasLevantadas--;

}
else{
  this.cartasLevantadas++;
  this.PosicionesCartasLevantadas.push(numero);
  this.listaCartasBack[numero]=this.listaCartas[numero];
}

if(this.cartasLevantadas>1){
   this.startTimer();  
   
}
    



      //document.getElementById(numero)!.src="../template/save.png";

}
  

  }

  comprobarCartas(){

if( this.listaCartas[this.PosicionesCartasLevantadas[0]]==this.listaCartas[this.PosicionesCartasLevantadas[1]]){

  this.CartasAcertadas.push(this.listaCartas[this.PosicionesCartasLevantadas[0]]);


//document.getElementById(this.listaCartas[this.PosicionesCartasLevantadas[0]]+"")!.style.display='none';
//document.getElementById(this.listaCartas[this.PosicionesCartasLevantadas[1]]+"")!.style.backgroundColor='black';

console.log(this.listaCartas[this.PosicionesCartasLevantadas[1]]+"")
}

if(this.CartasAcertadas.length==this.totalParejas){

if(this.totalParejas==6 && (this.logeado.memorion==0  || this.logeado.memorion!>this.contador)){
  this.logeado.memorion=this.contador;


  this.baseDatos.actualizar(this.collecionBaseDatos,this.logeado,this.logeado.id!)
}


  this.deleteSwal.fire();
}

this.PosicionesCartasLevantadas=[];
this.contador++;
  }


  barajar(array:String[]) {

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  
    return array;
  }


 async startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
       
        this.timeLeft--;
        console.log(this.timeLeft);
      } else {
        
            this.timeLeft=0.5;
            clearInterval(this.interval);
            this.comprobarCartas();
      
            for(let i=0;i<this.listaCartasBack.length;i++){
              if(this.CartasAcertadas.includes(this.listaCartasBack[i])){

              }
              else{
                this.listaCartasBack[i]=this.urlBack;
              }

            }
        
            this.cartasLevantadas=0;
      
          
      }
    },1000)
  }
  reinicio(){

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(["/memorion"]); 
  }); 
  }


  empezar(){
    var aleatorio:number
    for(let i=0;i<this.totalParejas;i++){

      this.listaCartasBack.push(this.urlBack);
      this.listaCartasBack.push(this.urlBack);


    aleatorio=this.getRandom(1, 898);
while(this.listaNumRandon.includes(aleatorio)){

  aleatorio=this.getRandom(1, 898);

}

this.listaNumRandon.push(aleatorio);



    this.servicio.getOne(aleatorio).subscribe(resultado => {
      console.log(resultado.sprites.front_default);
      this.listaCartas.push(resultado.sprites.front_default);
      this.listaCartas.push(resultado.sprites.front_default);
      this.barajar(this.listaCartas);
          
          })
        } 
this.mostrar=true;
  }

}
