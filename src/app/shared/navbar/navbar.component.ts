import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CarritoService } from '../../servicio/carrito.service';
import { Producto } from '../../model/producto.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  cantidadProductos:number=0;
  constructor(private carritoService:CarritoService){

  }
  ngOnInit():void{
    this.carritoService.carrito$.subscribe((productos: {producto:Producto,cantidad:number}[])=>{
      this.cantidadProductos=productos.reduce((total,item)=>total+item.cantidad,0)
    })
  }
  onCarritoClick(){
    console.log("Carrito Clicked")
  }

  
}
