import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post(`${environment.SERVER_URL}/usuarios/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          // Guardar el token en el localStorage
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  logout() {
    return this.http.post(`${environment.SERVER_URL}/usuarios/logout`, {});
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
