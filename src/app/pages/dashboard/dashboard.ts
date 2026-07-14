import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Transaccion, Categoria, ResumenMensual, GastoPorCategoria } from '../../models/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  transacciones: Transaccion[] = [];
  categorias: Categoria[] = [];
  resumen: ResumenMensual | null = null;
  gastosPorCategoria: GastoPorCategoria[] = [];

  nuevaDesc = '';
  nuevaMonto = 0;
  nuevaTipo: 'ingreso' | 'gasto' = 'gasto';
  nuevaCategoriaId: number | null = null;
  mostrarForm = false;
  loading = false;

  mesActual = new Date().getMonth() + 1;
  añoActual = new Date().getFullYear();

  constructor(private api: ApiService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.api.getTransacciones().subscribe(t => { this.transacciones = t; this.cdr.detectChanges(); });
    this.api.getCategorias().subscribe(c => { this.categorias = c; this.cdr.detectChanges(); });
    this.api.getResumen(this.añoActual, this.mesActual).subscribe(r => { this.resumen = r; this.cdr.detectChanges(); });
    this.api.getGastosPorCategoria().subscribe(g => { this.gastosPorCategoria = g; this.cdr.detectChanges(); });
  }

  crearTransaccion() {
    if (!this.nuevaDesc || !this.nuevaMonto) return;
    this.loading = true;
    this.api.crearTransaccion({
      descripcion: this.nuevaDesc,
      monto: this.nuevaMonto,
      tipo: this.nuevaTipo,
      categoria_id: this.nuevaCategoriaId
    }).subscribe({
      next: () => {
        this.nuevaDesc = '';
        this.nuevaMonto = 0;
        this.nuevaTipo = 'gasto';
        this.nuevaCategoriaId = null;
        this.mostrarForm = false;
        this.loading = false;
        this.cdr.detectChanges();
        this.cargarDatos();
      },
      error: (e) => {
        console.error('error', e);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  eliminarTransaccion(id: number) {
    this.api.eliminarTransaccion(id).subscribe(() => this.cargarDatos());
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  formatMonto(monto: number): string {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(monto);
  }

  formatFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-CL', { day: 'numeric', month: 'short' });
  }
}