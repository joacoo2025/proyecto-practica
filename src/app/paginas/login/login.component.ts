import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../servicio/auth.service';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  // Credenciales enlazadas al form
  usuario = {
    email: '',
    password: ''
  };

  // Mensaje de error a mostrar
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  iniciarSesion(): void {

    // Validación básica
    if (!this.usuario.email || !this.usuario.password) {
      this.error = 'Por favor ingrese sus credenciales.';
      return;
    }

    // Llamada al backend
    this.authService.login(this.usuario).subscribe({

      next: (res) => {
        this.error = '';
        Swal.fire({
                title: '¡Inicio de Sesion Exitoso!',
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

        // Redirigir
        this.router.navigate(['/inicio']);
      },

      error: (err) => {
        console.error('Error al iniciar sesión', err);
        this.error = 'Credenciales incorrectas o error en el servidor.';
      }
    });
  }
}
