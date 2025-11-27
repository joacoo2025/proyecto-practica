import { Injectable, Inject, PLATFORM_ID, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // URL de tu backend (correcta según tu router)
  private apiUrl = 'http://localhost/api_proyecto/public';

  // Para saber si estamos en navegador (localStorage)
  private isBrowser: boolean;

  // Evento que notifica login
  loginEvent = new EventEmitter<void>();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // =====================================================
  // LOGIN
  // =====================================================
  login(credentials: { email: string; password: string }): Observable<any> {

    return this.http.post(`${this.apiUrl}/users/login`, credentials).pipe(
      tap((response: any) => {

        if (response?.token && this.isBrowser) {

          let usuario = response.usuario;

          // --------------------------------------------
          // NORMALIZAR ROL (importante para AdminGuard)
          // --------------------------------------------
          if (usuario.role && !usuario.rol) {
            usuario.rol = usuario.role;
          }

          localStorage.setItem('token', response.token);
          localStorage.setItem('usuario', JSON.stringify(usuario));

          this.loginEvent.emit();
        }
      })
    );
  }

  // =====================================================
  // REGISTER
  // =====================================================
  register(usuario: { nombre: string; email: string; password: string; rol?: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, usuario);
  }

  // =====================================================
  // LOGOUT
  // =====================================================
  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
    }
  }

  // =====================================================
  // TOKEN
  // =====================================================
  getToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem('token');
  }

  // =====================================================
  // USUARIO
  // =====================================================
  getUsuario(): any {
    if (!this.isBrowser) return null;

    const raw = localStorage.getItem('usuario');

    if (!raw || raw === 'undefined' || raw === 'null') {
      return null;
    }

    try {
      return JSON.parse(raw);
    } catch {
      console.warn('JSON inválido en usuario, limpiando storage');
      localStorage.removeItem('usuario');
      return null;
    }
  }

  // =====================================================
  // LOGIN STATUS
  // =====================================================
  isLoggedIn(): boolean {
    if (!this.isBrowser) return false;
    return !!localStorage.getItem('token');
  }

  // =====================================================
  // ES ADMIN
  // =====================================================
  esAdmin(): boolean {
    const usuario = this.getUsuario();

    // Se permiten ambas variantes por compatibilidad
    return usuario?.rol === 'admin' || usuario?.role === 'admin';
  }
}

