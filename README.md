# Inditex Frontend - Prueba Técnica

SPA de tienda de móviles con React, Vite y React Router.

## Features

- Listado de productos con búsqueda en tiempo real
- Detalle de producto
- Carrito (contador)
- Caché con TTL 1h
- Client-side routing con React Router
- Tests con Vitest y React Testing Library

## Stack

- React 19
- Vite
- React Router DOM
- Vitest + React Testing Library
- ESLint
- JavaScript ES6 (sin TypeScript)

## Instalación

```bash
npm install
```

## Scripts

- `npm run dev` — servidor de desarrollo
- `npm run build` — compilar para producción
- `npm run test` — ejecutar tests
- `npm run lint` — verificar código

## Estructura

```
src/
  api/          → Peticiones HTTP con caché
  components/   → Componentes presentacionales
  context/      → Cart Context
  pages/        → Páginas (coordinan datos y routing)
  services/     → Lógica técnica (cacheService)
```

## API

Base URL: `https://itx-frontend-test.onrender.com/`

- `GET /api/product` — Listado de productos
- `GET /api/product/:id` — Detalle de producto
- `POST /api/cart` — Añadir al carrito
