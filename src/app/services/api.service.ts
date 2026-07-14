import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token, Usuario, Categoria, Transaccion, ResumenMensual, GastoPorCategoria } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  private headers(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // Auth
  register(email: string, password: string, nombre: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.base}/auth/register`, { email, password, nombre });
  }

  login(email: string, password: string): Observable<Token> {
    return this.http.post<Token>(`${this.base}/auth/login`, { email, password });
  }

  // Categorias
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.base}/categorias/`, { headers: this.headers() });
  }

  crearCategoria(nombre: string, color: string): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.base}/categorias/`, { nombre, color }, { headers: this.headers() });
  }

  eliminarCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.base}/categorias/${id}`, { headers: this.headers() });
  }

  // Transacciones
  getTransacciones(filtros?: any): Observable<Transaccion[]> {
    return this.http.get<Transaccion[]>(`${this.base}/transacciones/`, { headers: this.headers(), params: filtros });
  }

  crearTransaccion(datos: any): Observable<Transaccion> {
    return this.http.post<Transaccion>(`${this.base}/transacciones/`, datos, { headers: this.headers() });
  }

  eliminarTransaccion(id: number): Observable<any> {
    return this.http.delete(`${this.base}/transacciones/${id}`, { headers: this.headers() });
  }

  // Reportes
  getResumen(año: number, mes: number): Observable<ResumenMensual> {
    return this.http.get<ResumenMensual>(`${this.base}/reportes/resumen`, {
      headers: this.headers(),
      params: { año, mes }
    });
  }

  getGastosPorCategoria(): Observable<GastoPorCategoria[]> {
    return this.http.get<GastoPorCategoria[]>(`${this.base}/reportes/por-categoria`, { headers: this.headers() });
  }
}