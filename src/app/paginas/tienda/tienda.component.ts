import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../model/producto.model';
import { CarritoService } from '../../servicio/carrito.service';
import Swal from 'sweetalert2';
import { FavoritoService } from '../../servicio/favorito.service';
@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  constructor( public carritoService: CarritoService, public favoritoService: FavoritoService){

  }
  productos: Producto[] = [];

  isBrowser(): boolean {
  return typeof window !== 'undefined';
}

ngOnInit(): void {
  if (this.isBrowser()) {
    const saved = localStorage.getItem('productos');
    if (saved) this.productos = JSON.parse(saved);
  }
}
  agregar(producto:Producto){
    this.carritoService.agregarCarrito(producto)
    Swal.fire({
        title: '¡Producto agregado!',
        html: `El artículo <b>${producto.nombre}</b> fue añadido al Carrito.`,
        icon: 'success',
        customClass: {
          popup: 'petshop-popup'
        },
        confirmButtonText: '¡Genial!',
        showConfirmButton: true,
        backdrop: `
          rgba(19, 15, 15, 0.29)
          url("https://i.imgur.com/J1pWJtO.png") 
          left top
          no-repeat
        `
      });
}
agregarFav(producto:Producto){
   
   this.favoritoService.agregarFavorito(producto);
    Swal.fire({
    title: '¡Producto agregado!',
    html: `El artículo <b>${producto.nombre}</b> fue añadido a favoritos.`,
    icon: 'success',
    customClass: {
      popup: 'petshop-popup'
    },
    confirmButtonText: '¡Genial!',
    showConfirmButton: true,
    backdrop: `
      rgba(19, 15, 15, 0.29)
      url("https://i.imgur.com/J1pWJtO.png") 
      left top
      no-repeat
    `
  });
  }
}