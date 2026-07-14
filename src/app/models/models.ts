export interface Usuario {
  id: number;
  email: string;
  nombre: string;
  created_at: string;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface Categoria {
  id: number;
  nombre: string;
  color: string;
}

export interface Transaccion {
  id: number;
  descripcion: string;
  monto: number;
  tipo: 'ingreso' | 'gasto';
  fecha: string;
  categoria?: Categoria;
}

export interface ResumenMensual {
  año: number;
  mes: number;
  ingresos: number;
  gastos: number;
  balance: number;
}

export interface GastoPorCategoria {
  categoria: string;
  total: number;
}