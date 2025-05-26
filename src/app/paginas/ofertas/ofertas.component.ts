import { Component } from '@angular/core';
import { CarritoService } from '../../servicio/carrito.service';
import { FavoritoService } from '../../servicio/favorito.service';
import { Producto } from '../../model/producto.model';
import { FormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-ofertas',
  imports: [FormsModule,CommonModule, CurrencyPipe],
  templateUrl: './ofertas.component.html',
  styleUrl: './ofertas.component.css'
})
export class OfertasComponent {
  Productos : Producto[]=[
    {
      id:1,
      nombre:'Botin Tiempo',
      descripcion:'Elegancia atemporal con estos botines de cuero genuino, diseñados para brindar comodidad.',
      precio:120000,
      imagen:'imagenes/botintiempoo.avif',
      disponible:true,
      cantidad:3,
    },
    {
      id:2,
      nombre:'Botin Predator',
      descripcion:'Comodidad y tendencia urbana se unen en estos botines deportivos.',
      precio:120000,
      imagen:'imagenes/boinpredatore.jfif',
      disponible:true,
      cantidad:1,
    },
    {
      id:3,
      nombre:'Botin Nike',
      descripcion:'Perfectos para quienes buscan funcionalidad y estilo casual para el día a día.',
      precio:120000,
      imagen:'imagenes/nike.jfif',
      disponible:true,
      cantidad:4,
    },
    {
      id:4,
      nombre:'Botin Yamal',
      descripcion:'El diseño tradicional con cordones aporta ajuste personalizado y soporte firme.',
      precio:129000,
      imagen:'imagenes/botinyamal.jfif',
      disponible:true,
      cantidad:2,
    },
    {
      id:5,
      nombre:'Botin Black',
      descripcion:'Clásicos y versátiles, ideales para cualquier ocasión. Su diseño sobrio y resistente combina estilo y comodidad en cada paso.',
      precio:119500,
      imagen:'imagenes/botinesnaiki.jfif',
      disponible:true,
      cantidad:2,
    },
  ]

  constructor(private carritoService:CarritoService, private favoritoService:FavoritoService){
    }

agregar(producto:Producto){
    this.carritoService.agregarCarrito(producto)
    alert('Producto Agregado al carrito')
  }
}
