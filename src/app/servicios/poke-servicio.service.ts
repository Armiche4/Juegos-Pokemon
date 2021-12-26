import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http'; 

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PokeServicioService {

url="https://pokeapi.co/api/v2/pokemon/";

urlForm="https://pokeapi.co/api/v2/pokemon-form/";


  constructor(private http: HttpClient ) { }


  public getOne(pokeId: number, options?: any) { 
    return this.http.get(this.url+pokeId).pipe(map(res => res as any));
    //return this.http.get('/someUrl').pipe(map(res => res as any));
    } 

    public getOneCarta(pokeId: number, options?: any) { 
      return this.http.get(this.urlForm+pokeId).pipe(map(res => res as any)); 
      } 
  


}
