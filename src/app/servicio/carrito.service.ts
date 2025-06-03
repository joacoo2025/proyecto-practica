import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../model/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoSubject = new BehaviorSubject<{producto:Producto; cantidad:number}[]>([])
  carrito$=this.carritoSubject.asObservable();
  
  agregarCarrito(producto:Producto){
   const productos=this.carritoSubject.getValue();
   const encontrado = productos.find(p => p.producto.id === producto.id) 
 
   if(encontrado){
     encontrado.cantidad++
   }else{
     this.carritoSubject.next([...productos, {producto,cantidad:1}])
   }
 
 }
 
 eliminarCarrito(productoId:number){
   const productos = this.carritoSubject.getValue().filter(p => p.producto.id !== productoId)
   this.carritoSubject.next(productos)
 }
 vaciarCarrito(){
   this.carritoSubject.next([])
 }
 //metodo para actualizar la cantidad de un producto en el carrito
 actualizarCantidad(productoId:number, nuevaCantidad:number){
  const productos = this.carritoSubject.getValue().map(item=> {
    if(item.producto.id===productoId){
      return {... item,cantidad: nuevaCantidad}
    }
    return item
  })
  this.carritoSubject.next(productos)
 }
 //metodo para obtener los productos del carrito como un arreglo
 obtenerProductos():{producto:Producto;cantidad:number}[]{
  return this.carritoSubject.getValue();
 }
 //metdo para calcular el total a pagar(precio*cantidad de cada producto)
 obtenerTotal():number{
  const productos = this.carritoSubject.getValue();
  return productos.reduce((total,item)=> total+item.producto.precio*item.cantidad,0)
 }
  constructor() { }
}
