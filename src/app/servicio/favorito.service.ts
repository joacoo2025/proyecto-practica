import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../model/producto.model';
@Injectable({
  providedIn: 'root'
})
export class FavoritoService {

    private favoritoSubject = new BehaviorSubject<{producto:Producto; cantidad:number}[]>([])
    favorito$=this.favoritoSubject.asObservable();
    
    agregarFavorito(producto:Producto){
     const productos=this.favoritoSubject.getValue();
     const encontrado = productos.find(p => p.producto.id === producto.id) 
   
     if(encontrado){
       encontrado.cantidad++
     }else{
       this.favoritoSubject.next([...productos, {producto,cantidad:1}])
     }
   
   }
   
   eliminarFavoritos(productoId:number){
     const productos = this.favoritoSubject.getValue().filter(p => p.producto.id !== productoId)
     this.favoritoSubject.next(productos)
   }
   vaciarCarrito(){
     this.favoritoSubject.next([])
   }
   



   
     
    constructor() { }
  }
  
