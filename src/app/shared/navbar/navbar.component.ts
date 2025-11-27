import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CarritoService } from '../../servicio/carrito.service';
import { Producto } from '../../model/producto.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { AuthService } from '../../servicio/auth.service';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule,RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    // Mantengo la suscripción por si tu servicio la necesita.
    this.auth.loginEvent.subscribe(() => {
      // Ya no se asignan variables porque el HTML usa auth.xxx directamente
    });
  }

  logout() {
    this.auth.logout();
    // No se actualizan variables porque ya no existen.
  }

  
}
