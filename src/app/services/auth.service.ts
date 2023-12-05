import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  save(credentials: { email: string; password: string, name: string }) {
    return this.http.post(`${environment.SERVER_URL}/usuarios/save`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          console.log(response);
        }
      })
    );
  }

  logout() {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${environment.SERVER_URL}/usuarios/logout`, {}, { headers });

  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
