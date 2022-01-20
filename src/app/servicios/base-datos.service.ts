import { Injectable } from '@angular/core';




import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class BaseDatosService {

  constructor(private database: AngularFirestore) { }



  public crear(collection: string, data: any) {
    return this.database.collection(collection).add(data);
  }

  public obtenerPorId(coleccion: string, id: string) {
    return this.database.collection(coleccion).doc(id).snapshotChanges();
    // El documento que tenga ese id tal cual este ahora, le saca una foto y me lo devuelve
  }

  public obtenerTodos(coleccion: string) {
    return this.database.collection(coleccion).snapshotChanges();
  }

  public actualizar(coleccion: string, data: any, id: string) {
    return this.database.collection(coleccion).doc(id).set(data);
  }

  public eliminar(collection: string, id: string) {
    return this.database.collection(collection).doc(id).delete();
  }

  public createWithCustomId(collection: string, customId: string, data: any) {
    this.database.collection(collection).doc(customId).set(data);
  }




}
