import { Component, OnInit } from '@angular/core';
import { Producto } from '../../model/producto.model';
import { CarritoService } from '../../servicio/carrito.service';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router'
@Component({
  selector: 'app-carrito',
  imports: [CurrencyPipe, CommonModule,FormsModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit{
  
  
    productosEncarrito:{producto:Producto;cantidad:number}[]=[]
  
    constructor(public carritoService:CarritoService, private router: Router){}
  
    ngOnInit(): void {
      this.carritoService.carrito$.subscribe((productos)=>{
        this.productosEncarrito=productos
      })
    }
    agregarCantidad(index:number){
      this.productosEncarrito[index].cantidad++
    }
    quitarCantidad(index:number){
      if(this.productosEncarrito[index].cantidad>1){
        this.productosEncarrito[index].cantidad--
      }
    }
    eliminarProducto(productoId:number){
      this.carritoService.eliminarCarrito(productoId)
    }
    vaciarCarrito(){
      this.carritoService.vaciarCarrito()
    }
    
    irAformularioCompra(){
      this.router.navigate(['/compra'])
    }
    calcularTotal():number{
      return this.productosEncarrito.reduce((total,item)=>{
        return total + item.producto.precio*item.cantidad
      },0)
    }

    
}
