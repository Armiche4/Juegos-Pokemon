import { Component, OnInit,ViewChild } from '@angular/core';


import { BaseDatosService } from 'src/app/servicios/base-datos.service';

import { Usuario } from 'src/app/interfaces/usuario';

import { Router } from '@angular/router';


import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-cuatro-raya',
  templateUrl: './cuatro-raya.component.html',
  styleUrls: ['./cuatro-raya.component.sass']
})
export class CuatroRayaComponent implements OnInit {

  @ViewChild('ResultadoFinal') public readonly deleteSwal!: SwalComponent;

  collecionBaseDatos="Records Pokemon";

  logeado= {} as Usuario;
cantidadCajas:number[] =[];

casillasConFichasPuestas:number[] =[];

casillasConFichasPuestasMaquina:number[] =[];
casillasConFichasPuestasUsuario:number[] =[];

ensenar:boolean=false;

imagenTuPokeBall:string="";

nadieGana=true;

bloquearBoton=false;


  constructor(private baseDatos:BaseDatosService , private router:Router) { }

  ngOnInit(): void {

for(let i=0;i<72;i++){

this.cantidadCajas.push(i);
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

if(localStorage.getItem("PokeBolaPokeJuego")==undefined || localStorage.getItem("PokeBolaPokeJuego")=="" ){
  this.imagenTuPokeBall="https://aux3.iconspalace.com/uploads/645019229296460368.png";

}
else{
  this.imagenTuPokeBall= localStorage.getItem("PokeBolaPokeJuego")!;
}


  }



ponerficha(id:number){
this.bloquearBoton=true;
this.queFilaToca(id,true); 
      
this.turnoMaquina();
}




turnoMaquina(){
let fichaPuesta=false;


if(this.nadieGana==true){
// if rival cerca de ganar

for(let i=0; i<this.casillasConFichasPuestasUsuario.length;i++){
//lineas horzontal
//mirar bordes
  if(this.casillasConFichasPuestasUsuario.includes(this.casillasConFichasPuestasUsuario[i]+1) &&this.casillasConFichasPuestas.includes(this.casillasConFichasPuestasUsuario[i]+2)==false  && this.cantidadCajas.includes(this.casillasConFichasPuestasUsuario[i]+2) ){
    fichaPuesta=true;
    this.queFilaToca(this.casillasConFichasPuestasUsuario[i]+2,false);
    i=this.casillasConFichasPuestasUsuario.length;

  }
  if(this.casillasConFichasPuestasUsuario.includes(this.casillasConFichasPuestasUsuario[i]-1) &&this.casillasConFichasPuestas.includes(this.casillasConFichasPuestasUsuario[i]-2)==false && fichaPuesta==false  && this.cantidadCajas.includes(this.casillasConFichasPuestasUsuario[i]-2) ){
    fichaPuesta=true;
    this.queFilaToca(this.casillasConFichasPuestasUsuario[i]-2,false);
    i=this.casillasConFichasPuestasUsuario.length;
}
//lineas vertical
if(this.casillasConFichasPuestasUsuario.includes(this.casillasConFichasPuestasUsuario[i]-9) &&this.casillasConFichasPuestas.includes(this.casillasConFichasPuestasUsuario[i]-18)==false && fichaPuesta==false && this.cantidadCajas.includes(this.casillasConFichasPuestasUsuario[i]-18) ){
  fichaPuesta=true;
  this.queFilaToca(this.casillasConFichasPuestasUsuario[i],false);
  i=this.casillasConFichasPuestasUsuario.length;


}




}



//lineas endiagonal


//intentar ganar



if(fichaPuesta==false){
  this.queFilaToca(this.aleatorio(0,8),false);

}

}



}


 aleatorio(min:number, max:number) { 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

queFilaToca(id:number,turno:boolean){
            switch(id%9) { 
              case 0: { 
                this.dondePonerFicha(0,turno);
                 break; 
              } 
              case 1: { 
                this.dondePonerFicha(1,turno);
                 break; 
              } 
              case 2: { 
                this.dondePonerFicha(2,turno);
                 break; 
              } 
              case 3: { 
                this.dondePonerFicha(3,turno);
                 break; 
              } 
              case 4: { 
                this.dondePonerFicha(4,turno);
                 break; 
              }     case 5: { 
                this.dondePonerFicha(5,turno);
                 break; 
              } 
              case 6: { 
                this.dondePonerFicha(6,turno);
                 break; 
              } 
              case 7: { 
                this.dondePonerFicha(7,turno);
                 break; 
              } 
              case 8: { 
                this.dondePonerFicha(8,turno);
                 break; 
              } 
           } 

}


dondePonerFicha(resto:number,turno:boolean){
  for(let i=this.cantidadCajas.length-1; i>-1;i--){
 
    if(this.casillasConFichasPuestas.includes(i)==false && i%9==resto ){
      console.log(i);
      let imagen =document.getElementById(i+"")  as HTMLImageElement;
      this.casillasConFichasPuestas.push(i);
     if(turno==true){
      //imagen.src="https://img.icons8.com/emoji/344/red-circle-emoji.png";
imagen.src=this.imagenTuPokeBall;
      this.casillasConFichasPuestasUsuario.push(i);
      this.comprobarVictoria(turno);

     }
  else{
    //imagen.src="https://images.emojiterra.com/google/android-11/512px/1f7e1.png";
    imagen.src="https://www.shareicon.net/data/256x256/2016/10/18/844174_game_512x512.png";
    this.casillasConFichasPuestasMaquina.push(i)
    this.comprobarVictoria(turno);
  }

   


    i=0;

    }
    
      }


}


comprobarVictoria(turno:boolean){
  let fichasAcomprobar;

    if(turno==true){
  fichasAcomprobar=this.casillasConFichasPuestasUsuario;
 
  
    }
    else{
      fichasAcomprobar=this.casillasConFichasPuestasMaquina;
  
    }
    
  for(let i=0; i<fichasAcomprobar.length;i++){
    //lineas horzontal
   
      if((fichasAcomprobar.includes(fichasAcomprobar[i]+1) /*que no este en los bordes*/&&( ((fichasAcomprobar[i]+1)%9!=0 ) )&&  ((fichasAcomprobar[i]+1)%9!=8 )   ) ){
      
        if((fichasAcomprobar.includes(fichasAcomprobar[i]+2) &&( ((fichasAcomprobar[i]+2)%9!=0 ) )&&  ((fichasAcomprobar[i]+2)%9!=8 )   ) ){
          if((fichasAcomprobar.includes(fichasAcomprobar[i]+3)    ) ){
  
          
            this.actualizarVictorias(turno);
          }
      
    
        }
    
      }
  
    //lineas vertical
    if((fichasAcomprobar.includes(fichasAcomprobar[i]+9)   ) ){
      
      if((fichasAcomprobar.includes(fichasAcomprobar[i]+18)    ) ){
        if((fichasAcomprobar.includes(fichasAcomprobar[i]+27)    ) ){
        
          this.actualizarVictorias(turno);
  
        }
    
  
      }
  
    }
  
  //en diagonal
  
  
  //derecha
  if((fichasAcomprobar.includes(fichasAcomprobar[i]-8) &&( ((fichasAcomprobar[i]-8)%9!=0 ) )&&  ((fichasAcomprobar[i]-8)%9!=8 )   ) ){
      
    if((fichasAcomprobar.includes(fichasAcomprobar[i]-16) &&( ((fichasAcomprobar[i]-16)%9!=0 ) )&&  ((fichasAcomprobar[i]-16)%9!=8 )   ) ){
      if((fichasAcomprobar.includes(fichasAcomprobar[i]-24)  ) ){
  
    
        this.actualizarVictorias(turno);
  
      }
  
  
    }
  
  }
  //izquierda
  if((fichasAcomprobar.includes(fichasAcomprobar[i]-10) &&( ((fichasAcomprobar[i]-10)%9!=0 ) )&&  ((fichasAcomprobar[i]-10)%9!=8 )   ) ){
      
    if((fichasAcomprobar.includes(fichasAcomprobar[i]-20) &&( ((fichasAcomprobar[i]-20)%9!=0 ) )&&  ((fichasAcomprobar[i]-20)%9!=8 )   ) ){
      if((fichasAcomprobar.includes(fichasAcomprobar[i]-20)  ) ){
  
      
        this.actualizarVictorias(turno);
  
      }
  
  
    }
  
  }
  
  
  }
  }

  actualizarVictorias(turno:boolean){
    if(turno==true){
      this.nadieGana=false;
      if(this.logeado.CuatroRaya==undefined){
        this.logeado.CuatroRaya=1;
    
    
        this.baseDatos.actualizar(this.collecionBaseDatos,this.logeado,this.logeado.id!);
      }
      else{
        this.logeado.CuatroRaya=this.logeado.CuatroRaya!+1;
      
      
        this.baseDatos.actualizar(this.collecionBaseDatos,this.logeado,this.logeado.id!)
      }
      this.deleteSwal.fire();
    }
    else{
      this.deleteSwal.title="DERROTA";
      this.deleteSwal.icon="error";
      this.deleteSwal.text="Intentalo de nuevo"
      this.deleteSwal.fire();
    }

  }

  mostrarBolas(){

    if(this.ensenar==false){
this.ensenar=true;
    }
    else{
this.ensenar=false;
    }

  }

  elegirBola(id:Number){

if(this.bloquearBoton==false){


if(id==1){
//this.imagenTuPokeBall="https://emojis.slackmojis.com/emojis/images/1450464069/186/pokeball.png?1450464069";
this.imagenTuPokeBall="https://aux3.iconspalace.com/uploads/645019229296460368.png";
}
if(id==2 && this.logeado.CuatroRaya!>0){
  //this.imagenTuPokeBall="https://image.flaticon.com/icons/png/128/188/188916.png";
  this.imagenTuPokeBall="https://aux.iconspalace.com/uploads/21241959701031495453.png";
  }
  if(id==3 && this.logeado.CuatroRaya!>4){
    //this.imagenTuPokeBall="https://cdn.iconscout.com/icon/premium/png-256-thumb/ultraball-674621.png";
   
    this.imagenTuPokeBall="https://aux.iconspalace.com/uploads/1239819779318352436.png";
    }
    if(id==4 && this.logeado.CuatroRaya!>9){
      this.imagenTuPokeBall="https://aux.iconspalace.com/uploads/1135170936575256273.png";

      
      }
      if(id==5 && this.logeado.CuatroRaya!>19){
        //this.imagenTuPokeBall="https://www.shareicon.net/data/48x48/2016/12/13/863567_ball_512x512.png";
        this.imagenTuPokeBall="https://aux.iconspalace.com/uploads/1256021885372237969.png";
        }
        localStorage.setItem("PokeBolaPokeJuego",this.imagenTuPokeBall);

    this.ensenar=false;    
  }
  }


  reinicio(){

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(["/CuatroEnRaya"]); 
  }); 
  }

}