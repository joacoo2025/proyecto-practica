import { Component, OnInit } from '@angular/core';
import { FavoritoService } from '../servicio/favorito.service';
import { Producto } from '../model/producto.model';
import { CarritoService } from '../servicio/carrito.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-favoritos',
  imports: [CurrencyPipe, CommonModule,FormsModule],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent implements OnInit {
  
  
  productosFav:{producto:Producto;cantidad:number}[]=[]

  constructor(public favoritoService:FavoritoService, private carritoService:CarritoService){}

  ngOnInit(): void {
    this.favoritoService.favorito$.subscribe((productos)=>{
      this.productosFav=productos
    })
  }
  agregarCantidad(index:number){
    this.productosFav[index].cantidad++
  }
  quitarCantidad(index:number){
    if(this.productosFav[index].cantidad>1){
      this.productosFav[index].cantidad--
    }
  }
  eliminarProducto(productoId:number){
    this.favoritoService.eliminarFavoritos(productoId)
  }
  vaciarCarrito(){
    this.favoritoService.vaciarCarrito()
  }
  realizarCompra(){
    alert('Compra Realizada')
    this.vaciarCarrito()
  }  
  agregarCarro(producto:Producto){
    this.carritoService.agregarCarrito(producto)
    alert('Producto Agregado al carrito')
  }
  
}
