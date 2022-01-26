import { Component, OnInit } from '@angular/core';

import { BaseDatosService } from 'src/app/servicios/base-datos.service';

import { ActivatedRoute } from '@angular/router';

import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FaStackItemSizeDirective } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-otro-perfil',
  templateUrl: './otro-perfil.component.html',
  styleUrls: ['./otro-perfil.component.scss']
})
export class OtroPerfilComponent implements OnInit {

  constructor(private database:BaseDatosService,private route: ActivatedRoute) { }

  collecionBaseDatos="Records Pokemon";

  idUsuario:string="";

  usuario:any;

  iconoEstrella=faStar;

  ngOnInit(): void {

    this.route.paramMap.subscribe(
      params => {
        this.idUsuario = params.get("id")!;
        this.buscarBaseDatos();


    })

  }


  buscarBaseDatos(){
 

  this.database.obtenerTodos(this.collecionBaseDatos).subscribe((usuariosRef) => {
 
    let  users:any = usuariosRef.map(userRef => {
       
  if(userRef.payload.doc.id==this.idUsuario){
     
    this.usuario=userRef.payload.doc.data();
    console.log(this.usuario)
     }
  
     
    });

  })

}

}