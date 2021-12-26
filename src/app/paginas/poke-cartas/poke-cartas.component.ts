import { Component, OnInit } from '@angular/core';

import { Renderer2,ElementRef, ViewChild } from '@angular/core';

import { PokeServicioService } from "../../servicios/poke-servicio.service";


import { faFireAlt } from '@fortawesome/free-solid-svg-icons';
import { faTint } from '@fortawesome/free-solid-svg-icons';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { faFistRaised } from '@fortawesome/free-solid-svg-icons';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-poke-cartas',
  templateUrl: './poke-cartas.component.html',
  styleUrls: ['./poke-cartas.component.scss']
})

export class PokeCartasComponent implements OnInit {
  
  constructor(private servicio: PokeServicioService,private renderer: Renderer2,private router: Router) {}
  iconoMaquina=faRobot;
iconoUsuario=faUser;
  icono=faFistRaised;
    
 
 
  @ViewChild("campo", { static: false })  divcampo!: ElementRef;
  @ViewChild("vs", { static: false })  divvs!: ElementRef;
  @ViewChild('ResultadoFinal') public readonly deleteSwal!: SwalComponent;



  cartasEnemigas:any[] = [];
  cartasMias:any[] = [];

  campoCartaMia= {} as any;
   campoCartaEnemiga= {} as any;
  campoCartaImagen:boolean=false;

  cartasRojas:any[] = [];
  cartasAzules:any[] = [];
  cartasVerdes:any[] = [];

  resultado:String="";
  contadorMio:number=0;
  contadorEnemigo:number=0;

  turno:number=1;
  resultadoFinal:String="VICTORIA";

  numerosSacados:number[]=[];

  mostrarHistorico:Boolean=false;


  historicoVictorias:any=localStorage.getItem("victoriaPokemonCartas");

  historicoDerrotas:any=localStorage.getItem("derrotaPokemonCartas");

  ngOnInit(): void {
let numero;
    for(let i=0;i<6;i++){
  numero=this.getRandom(1, 898);

  while( this.numerosSacados.includes(numero)){
    numero=this.getRandom(1, 898);

  }
   
  this.numerosSacados.push(numero);
    this.servicio.getOneCarta(numero).subscribe(resultado => {
      resultado.name=resultado.name.charAt(0).toUpperCase() + resultado.name.slice(1);
      resultado.types[0].type.name=resultado.types[0].type.name.charAt(0).toUpperCase() +resultado.types[0].type.name.slice(1);
this.cartasMias.push(resultado);
console.log(this.cartasMias);


    });
    numero=this.getRandom(1, 898);

    while( this.numerosSacados.includes(numero)){
      numero=this.getRandom(1, 898);
  
    }
     
    this.numerosSacados.push(numero);

    this.servicio.getOneCarta(numero).subscribe(resultado => {
      resultado.name=resultado.name.charAt(0).toUpperCase() + resultado.name.slice(1);
      resultado.types[0].type.name=resultado.types[0].type.name.charAt(0).toUpperCase() +resultado.types[0].type.name.slice(1);
      this.cartasEnemigas.push(resultado);
      
      
          });

          
  }


  }


  getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


  atacar(miCarta:any){

      this.campoCartaEnemiga=this.cartasEnemigas[this.getRandom(0,this.cartasEnemigas.length-1)];
    

    this.campoCartaMia=miCarta;
   
 
    this.campoCartaImagen=true;

    this.cartasMias=this.cartasMias.filter(poke=> poke.id!=this.campoCartaMia.id);
    this.cartasEnemigas=this.cartasEnemigas.filter(poke=> poke.id!=this.campoCartaEnemiga.id);

    this.ganador();

  }


  ganador(){

    if(
      this.cartasRojas.includes(this.campoCartaMia ) ||  this.cartasRojas.includes(this.campoCartaEnemiga ) ||
      this.cartasAzules.includes(this.campoCartaMia ) ||  this.cartasAzules.includes(this.campoCartaEnemiga ) ||
      this.cartasVerdes.includes(this.campoCartaMia ) ||  this.cartasVerdes.includes(this.campoCartaEnemiga )  
){
this.ganadorTipoCampo();
}
else{
  if(this.campoCartaMia.id>this.campoCartaEnemiga.id){

    this.resultado="VICTORIA";
    this.contadorMio++;
    
        }
        else{
    
          this.resultado="DERROTA";
          this.contadorEnemigo++;
        }
}

 
    this.setStyleCampo();
    this.buscarTipo();
 
    if(this.turno==6){
        if(this.contadorMio>this.contadorEnemigo){
         
        if(localStorage.getItem("victoriaPokemonCartas")==null){
          localStorage.setItem('victoriaPokemonCartas', "1");
  
        }
        else{
          
          let suma=localStorage.getItem("victoriaPokemonCartas");
          if(suma!=null){
   localStorage.setItem('victoriaPokemonCartas',(Number(suma)+1)+"");
          }
         
        }
        this.deleteSwal.title="VICTORIA";
        this.deleteSwal.icon="success";

      }
          if(this.contadorMio<this.contadorEnemigo){
     
            if(localStorage.getItem("derrotaPokemonCartas")==null){
              localStorage.setItem('derrotaPokemonCartas', "1");
      
            }
            else{
              let suma=localStorage.getItem("derrotaPokemonCartas");
              if(suma!=null){
       localStorage.setItem('derrotaPokemonCartas',(Number(suma)+1)+"");
              }
             
            }
            this.deleteSwal.title="DERROTA";
            this.deleteSwal.icon="error";
      }
      if(this.contadorMio==this.contadorEnemigo){
        this.deleteSwal.title="EMPATE";
        this.deleteSwal.icon="warning";
        
      }
      this.deleteSwal.text=this.contadorMio+"-"+this.contadorEnemigo;
 
  
      
      this.deleteSwal.fire();
    }
    this.turno++;
  }
  

  setStyleCampo() {
    this.renderer.setStyle(this.divvs.nativeElement, 'color', 'black');
    
    if(this.resultado==="VICTORIA"){
      this.renderer.setStyle(this.divcampo.nativeElement, 'background-color', 'lightgreen');
   
   
    }
    else{
    
      this.renderer.setStyle(this.divcampo.nativeElement, 'background-color', 'red');
    
    }
   
      }


      buscarTipo(){


        

        this.cartasRojas =(this.cartasMias.filter(rojo=> (rojo.types[0].type.name)=="Fire" || (rojo.types[1]?.type.name)=="fire")).concat(this.cartasEnemigas.filter(rojo=> (rojo.types[0].type.name)=="Fire" || (rojo.types[1]?.type.name)=="fire"));
        this.cartasVerdes =(this.cartasMias.filter(rojo=> (rojo.types[0].type.name)=="Grass" || (rojo.types[1]?.type.name)=="grass")).concat(this.cartasEnemigas.filter(rojo=> (rojo.types[0].type.name)=="Grass" || (rojo.types[1]?.type.name)=="grass"))
        this.cartasAzules =(this.cartasMias.filter(rojo=> (rojo.types[0].type.name)=="Water" || (rojo.types[1]?.type.name)=="water")).concat(this.cartasEnemigas.filter(rojo=> (rojo.types[0].type.name)=="Water" || (rojo.types[1]?.type.name)=="water"))
        
this.anadirTipo( this.cartasRojas,"cartaRoja");
this.anadirTipo( this.cartasVerdes,"cartaVerde");
this.anadirTipo( this.cartasAzules,"cartaAzul");  


      }


      anadirTipo(lista:any,id:string){

        for(let i=0;i<lista.length;i++){

            this.renderer.addClass(document.getElementById(lista[i].id), id);
           /* 
            if(document.getElementById(lista[i].id+"icono")){
              this.icono=faLeaf
            }
         */

        }
       
      
      }

      ganadorTipoCampo(){

        //las dos son de tipo
        if((this.cartasAzules.includes(this.campoCartaMia ) ||this.cartasRojas.includes(this.campoCartaMia ) || this.cartasVerdes.includes(this.campoCartaMia )) &&((this.cartasAzules.includes(this.campoCartaEnemiga ) || this.cartasRojas.includes(this.campoCartaEnemiga ) || this.cartasVerdes.includes(this.campoCartaEnemiga )))){ 
//dos tipos iguales
        if(
          (this.cartasRojas.includes(this.campoCartaMia ) &&  this.cartasRojas.includes(this.campoCartaEnemiga )) ||
          (this.cartasAzules.includes(this.campoCartaMia ) &&  this.cartasAzules.includes(this.campoCartaEnemiga ) )||
          (this.cartasVerdes.includes(this.campoCartaMia ) &&  this.cartasVerdes.includes(this.campoCartaEnemiga ) ) 
    ){
      if(this.campoCartaMia.id>this.campoCartaEnemiga.id){

        this.resultado="VICTORIA";
        this.contadorMio++;
        
            }
            else{
        
              this.resultado="DERROTA";
              this.contadorEnemigo++;
            }
    }


   //dos tipos diferentes
   else{

   
        if( this.cartasAzules.includes(this.campoCartaMia ) ){
          if( this.cartasRojas.includes(this.campoCartaEnemiga )){
        
            this.resultado="VICTORIA";
            this.contadorMio++;
          }
        else{
          this.resultado="DERROTA";
          this.contadorEnemigo++;
        }
        }
        if( this.cartasRojas.includes(this.campoCartaMia ) ){
          if(this.cartasVerdes.includes(this.campoCartaEnemiga )){
        
            this.resultado="VICTORIA";
            this.contadorMio++;
          }
        else{
          this.resultado="DERROTA";
          this.contadorEnemigo++;
        }
        }
        if(this.cartasVerdes.includes(this.campoCartaMia ) ){
          if(this.cartasAzules.includes(this.campoCartaEnemiga )){
        
            this.resultado="VICTORIA";
            this.contadorMio++;
          }
        else{
          this.resultado="DERROTA";
          this.contadorEnemigo++;
        }
        }
      }
          }
          //una tiene tipo y la otra no
else{
  if(this.cartasAzules.includes(this.campoCartaMia ) ||this.cartasRojas.includes(this.campoCartaMia ) || this.cartasVerdes.includes(this.campoCartaMia )){
    this.resultado="VICTORIA";
    this.contadorMio++;

  }
  else{
    this.resultado="DERROTA";
    this.contadorEnemigo++;
  }


}



        }

        reinicio(){
          //location.reload();



          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(["/cartas"]); // navigate to same route
        }); 

        }

        historico(){
          if(this.mostrarHistorico==false){
this.mostrarHistorico=true;

          }

          else{
            this.mostrarHistorico=false;

          }

        }

      
}

