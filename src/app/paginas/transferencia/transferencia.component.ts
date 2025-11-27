import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../servicio/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transferencia',
  imports: [CommonModule],
  templateUrl: './transferencia.component.html',
  styleUrl: './transferencia.component.css',
})
export class TransferenciaComponent implements OnInit {

  alias = 'joacoespinosa06';
  cbu = '0000003100036142379203';
  titular = 'Joaquin Espinosa';
  qr = 'imagenes/QR.jpg';
  whatsapp = '+54 299-596-1133';
  gmail = 'joaquinespinosalan@gmail.com';
  subtotal: number = 0;

  constructor(private carritoService: CarritoService, private router: Router) {}

  ngOnInit(): void {
    this.carritoService.carrito$.subscribe(productos => {
      this.subtotal = productos.reduce(
        (total, item) => total + item.producto.precio * item.cantidad,
        0
      );
    });
  }

  finalizar() {
  this.router.navigate(['/pdf']);
}
}

