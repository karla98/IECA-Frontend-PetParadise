import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';


const API = environment.SERVER_URL;

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  constructor(
    private http: HttpClient,
    private message: ToastrService
  ) {}

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    console.log('token: ', headers);
    return headers;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Errores del lado del cliente o problemas de red.
      console.error('An error occurred:', error.error.message);
      this.message.error('Ha ocurrido un error en la petición.');
    } else {
      if (
        error.status === 403 &&
        error.error.message === 'This action is unauthorized.'
      ) {
        this.message.error('No tienes permisos para realizar esta acción.');
      } else if (error.status === 404) {
        this.message.error('Recurso no encontrado.');
      }else {
        this.message.error(
          error.error.message || 'Ha ocurrido un error en el servidor.'
        );
      }
    }

    return throwError(
      () => 'Algo malo ocurrió; por favor intenta nuevamente más tarde.'
    );
  }
  private handleValidationErrors(errors: string[]): void {  
    for (const errorMessage of errors) {
      this.message.error(errorMessage);
    }
  }
  

  getAll<T>(
    endpoint: string,
    queryParams?: { [key: string]: any }
  ): Observable<T[]> {
    let params = new HttpParams();

    if (queryParams) {
      Object.keys(queryParams).forEach((key) => {
        params = params.set(key, queryParams[key]);
      });
    }

    return this.http
      .get<T[]>(`${API}/${endpoint}`, {params})
      .pipe(catchError(this.handleError.bind(this)));
  }

  getOne<T>(endpoint: string, id: string | number): Observable<T> {
    return this.http
      .get<T>(`${API}/${endpoint}/${id}`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  getAllPaginate<T>(
    endpoint: string,
    queryParams?: { [key: string]: any }
  ): Observable<T> {
    let params = new HttpParams();

    if (queryParams) {
      Object.keys(queryParams).forEach((key) => {
        params = params.set(key, queryParams[key]);
      });
    }

    return this.http
      .get<T>(`${API}/${endpoint}`, {params })
      .pipe(catchError(this.handleError.bind(this)));
  }

  create<T>(
    endpoint: string,
    body: T,
    options?: { [key: string]: any }
  ): Observable<T> {
    return this.http
      .post<T>(`${API}/${endpoint}`, body, {
        headers: this.getHeaders(),
        ...options,
      })
      .pipe(catchError(this.handleError.bind(this)));
  }
  
  update<T>(
    endpoint: string,
    id: string | number,
    body: T,
    options?: { [key: string]: any }
  ): Observable<T> {

    return this.http
      .patch<T>(`${API}/${endpoint}/${id}`, body, {
        headers: this.getHeaders(),
        ...options,
      })
      .pipe(catchError(this.handleError.bind(this)));
  }

  delete<T>(endpoint: string, id: string | number): Observable<any> {
    return this.http
      .delete(`${API}/${endpoint}/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError.bind(this)));
  }

  /* ------------- Métodos con archivo --------------------- */

  updateWithFile<T>(
    endpoint: string,
    id: string | number,
    body: T | FormData,
    options?: { [key: string]: any }
  ): Observable<T> {

    const requestBody =
      body instanceof FormData ? body : this.convertToFormData(body);

    return this.http
      .patch<T>(`${API}/${endpoint}/${id}`, requestBody, {
        headers: this.getHeadersForUpdate(body),
        ...options,
      })
      .pipe(catchError(this.handleError.bind(this)));
  }

  createWithFile<T>(
    endpoint: string,
    body: T | FormData,
    options?: { [key: string]: any }
  ): Observable<T> {
    const requestBody =
      body instanceof FormData ? body : this.convertToFormData(body);

    return this.http
      .post<T>(`${API}/${endpoint}`, requestBody, {
        headers: this.getHeadersForUpdate(body),
        ...options,
      })
      .pipe(catchError(this.handleError.bind(this)));
  }

  private getHeadersForUpdate(body: any): HttpHeaders {
    if (this.containsFile(body)) {
      return this.getHeaders();
    } else {
      return this.getHeaders();
    }
  }

  private containsFile(obj: any): boolean {
    if (obj instanceof File) {
      return true;
    } else if (typeof obj === 'object') {
      for (const key in obj) {
        if (obj.hasOwnProperty(key) && this.containsFile(obj[key])) {
          return true;
        }
      }
    }
    return false;
  }

  private convertToFormData(obj: any): FormData {
    const formData = new FormData();
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        formData.append(key, obj[key]);
      }
    }
    return formData;
  }
}
