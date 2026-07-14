# Expense Dashboard

Dashboard para gestión de gastos personales construido con Angular 22. Se conecta a la [Expense Tracker API](https://github.com/Poyo-cmd/Expense-tracker).

## Tech Stack

- **Angular 22** — framework frontend
- **TypeScript** — lenguaje principal
- **SCSS** — estilos
- **HttpClient** — comunicación con la API

## Requisitos

- Node.js 18+
- Expense Tracker API corriendo en `http://localhost:8000`

## Levantar el proyecto

```bash
npm install
ng serve
```

El dashboard estará en `http://localhost:4200`

## Funcionalidades

- Registro e inicio de sesión con JWT
- Resumen mensual de ingresos, gastos y balance
- Crear y eliminar transacciones
- Categorizar gastos
- Ver gastos agrupados por categoría
- Guard de autenticación — rutas protegidas

## Estructura

```
src/app/
├── guards/        # Auth guard
├── models/        # Interfaces TypeScript
├── pages/
│   ├── login/     # Login y registro
│   └── dashboard/ # Dashboard principal
└── services/      # Servicio de API
```