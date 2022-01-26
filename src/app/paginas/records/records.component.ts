import { Component, OnInit } from '@angular/core';

import { Usuario } from 'src/app/interfaces/usuario';

import { BaseDatosService } from 'src/app/servicios/base-datos.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {


  constructor(private baseDatos:BaseDatosService,private router:Router) {


  }

collecionBaseDatos="Records Pokemon";

//usuarios= [] as Usuario[];
logeado:any;

usuariosfallos= [] as Usuario[];


usuariosAciertos= [] as Usuario[];

usuariosMemorion= [] as Usuario[];

usuariosSopa= [] as Usuario[];

  ngOnInit(): void {
    var usuarios= [] as Usuario[];
    this.logeado=localStorage.getItem("PokemonUsuarioLogueado")!;
    this.baseDatos.obtenerTodos(this.collecionBaseDatos).subscribe((usuariosRef) => {
      console.log("usuariosRef: ", usuariosRef);
      usuarios = usuariosRef.map(userRef => {
        let usuario: any = userRef.payload.doc.data();
        usuario.email=usuario.email.split("@");
       return usuario;
      });
      //console.log(usuarios);
      //this.usuariosAciertos=usuarios.sort((a,b) => a.testAciertos! > b.testAciertos! ? -1 : a.testAciertos! < b.testAciertos! ? 1 : 0 );
      //this.usuariosfallos=usuarios.sort((a,b) => a.testFallos! > b.testFallos! ? -1 : a.testFallos! < b.testFallos! ? 1 : 0 );
      //this.usuariosMemorion=usuarios.sort((a,b) =>{return a.memorion! - b.memorion! });

      this.usuariosMemorion=usuarios.filter(resultado=>resultado.memorion!>0)
      this.usuariosMemorion.sort((obj1, obj2) => {

       
        if ( obj1.memorion! > obj2.memorion!  ) {
          
            return 1;
        }
    
        if (obj1.memorion! < obj2.memorion!  ) {
        
            return -1;
        }
    
        return 0;
    });
      
     
    })

    this.baseDatos.obtenerTodos(this.collecionBaseDatos).subscribe((usuariosRef) => {
      console.log("usuariosRef: ", usuariosRef);
      usuarios = usuariosRef.map(userRef => {
        let usuario: any = userRef.payload.doc.data();
       usuario.email=usuario.email.split("@");
       return usuario;
      });
   
      this.usuariosAciertos=usuarios.sort((obj1, obj2) => {
        if (obj1.testAciertos! < obj2.testAciertos!) {
          
            return 1;
        }
    
        if (obj1.testAciertos! > obj2.testAciertos!) {
        
            return -1;
        }
    
        return 0;
    });
      
   
    })

    this.baseDatos.obtenerTodos(this.collecionBaseDatos).subscribe((usuariosRef) => {
      console.log("usuariosRef: ", usuariosRef);
      usuarios = usuariosRef.map(userRef => {
        let usuario: any = userRef.payload.doc.data();
       usuario.email=usuario.email.split("@");
       return usuario;
      });
   
      this.usuariosfallos=usuarios.sort((obj1, obj2) => {
        if (obj1.testFallos! < obj2.testFallos!) {
          
            return 1;
        }
    
        if (obj1.testFallos! > obj2.testFallos!) {
        
            return -1;
        }
    
        return 0;
    });
      
   
    })
    this.baseDatos.obtenerTodos(this.collecionBaseDatos).subscribe((usuariosRef) => {
      console.log("usuariosRef: ", usuariosRef);
      usuarios = usuariosRef.map(userRef => {
        let usuario: any = userRef.payload.doc.data();
       usuario.email=usuario.email.split("@");
       return usuario;
      });
      this.usuariosSopa=usuarios.filter(resultado=>resultado.SopaLetras!>0)
      this.usuariosSopa.sort((obj1, obj2) => {
        if (obj1.SopaLetras! > obj2.SopaLetras!) {
          
            return 1;
        }
    
        if (obj1.SopaLetras! < obj2.SopaLetras!) {
        
            return -1;
        }
    
        return 0;
    });
      
   
    })

    

 
  }

  irLogin(){

    this.router.navigate(['/login']);
  }



}
