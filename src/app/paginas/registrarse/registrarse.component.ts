import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../servicio/auth.service';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css',
})
export class RegistrarseComponent {
 // Objeto que contiene los datos del nuevo usuario.
  // Se enlaza al formulario mediante ngModel en la plantilla.
  nuevoUsuario = {
    nombre: '',
    email: '',
    apellido:'',
    password: '',
    direccion: '',
    telefono: '',
    provincia: '',
    codigoPostal: '',
    ciudad: '',
    usuario: '',
  };

  // Texto para mostrar mensajes de error en pantalla.
  error: string = '';

  // Se inyecta el servicio de autenticación para poder registrar usuarios
  // y el Router para redirigir al terminar el registro.
  constructor(private authService: AuthService, private router: Router) {}

  // Método disparado al enviar el formulario.
  registrar(): void {

    // Validación inicial: ningún campo puede estar vacío.
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.email || !this.nuevoUsuario.password) {
      this.error = 'Todos los campos son obligatorios.';
      return;
    }

    // Llamada al backend a través del servicio de autenticación.
    this.authService.register(this.nuevoUsuario).subscribe({

      // Si el registro es exitoso:
      next: () => {
        // Alerta rápida; puede reemplazarse por un toast más elegante.
        
            Swal.fire({
            title: 'Registro Exitoso, Ahora puedes iniciar sesión.',
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

        // Redirige al usuario a la pantalla de login.
        this.router.navigate(['/login']);
      },

      // Si ocurre un error en el backend o en la red:
      error: (err) => {
        console.error('Error en el registro', err);

        // Mensaje para mostrar en la interfaz.
        this.error = 'Error al registrar el usuario.';
      }
    });
  }
}
