# Mobile Device Store - Frontend SPA

React single-page application for browsing and purchasing mobile devices. Built with Vite, React Router, and Vitest.

## Features

- **Product Listing**: Browse all available mobile devices with real-time search by brand and model
- **Product Details**: View comprehensive specifications including CPU, RAM, storage, battery, cameras, and dimensions
- **Shopping Cart**: Add products to cart with color and storage selection
- **Client-side Routing**: Navigate between product list and detail pages without page reload
- **Local Caching**: 1-hour TTL cache for API responses to improve performance
- **Cart Persistence**: Shopping cart count saved to localStorage

## Tech Stack

- **React 19.2.7** - UI framework with functional components
- **Vite 8.1.1** - Build tool and dev server
- **React Router 7.18.1** - Client-side routing
- **Vitest 4.1.10** - Unit testing framework
- **React Testing Library 16.3.2** - Component testing utilities
- **ESLint 10.6.0** - Code quality checks

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

```bash
npm install
```

### Available Scripts

- **`npm run dev`** - Start development server (http://localhost:5173)
- **`npm run build`** - Build for production
- **`npm run test`** - Run unit tests in watch mode
- **`npm run test -- --run`** - Run unit tests once
- **`npm run e2e`** - Run Playwright E2E tests
- **`npm run lint`** - Check code quality with ESLint
- **`npm run preview`** - Preview production build locally

## Architecture

```
src/
├── api/              # HTTP communication and response mapping
├── components/       # Reusable UI components (Header, ProductCard, etc.)
├── context/          # React Context for global state (CartContext)
├── pages/            # Page components (ProductListPage, ProductDetailPage)
├── services/         # Business logic (cacheService with 1h TTL)
└── __fixtures__/     # Shared test data and fixtures
```

Tests are co-located with the files they test (e.g. `components/ProductCard.test.jsx`).

### Key Patterns

- **Pages** coordinate data loading, state management, and page composition
- **Components** are presentational and receive data through props
- **Services** handle technical concerns like caching and API communication
- **Context** manages global UI state (shopping cart count)

## API Integration

The app communicates with a backend API for:

- `GET /products` - Fetch all products with search/filter
- `GET /products/:id` - Get product details
- `POST /cart` - Add item to cart

All responses are cached client-side for 1 hour to reduce network requests.

## Testing

The project includes 24 unit tests covering:

- **API client** - Response mapping and caching behavior
- **Components** - Rendering, user interactions, and state updates
- **Pages** - Data loading, filtering, and error handling
- **Services** - Cache TTL and localStorage persistence

Run unit tests with:

```bash
npm run test -- --run
```

### End-to-End (E2E) Testing

E2E tests with Playwright verify key user workflows and page functionality:

- **Product List Loading** - Verify products load and display correctly
- **Result Count Display** - Verify result counter shows product count
- **Home Page Navigation** - Verify main page loads with products
- **Cart Counter** - Verify cart count is visible in header
- **Product Details** - Verify product information displays
- **Component Availability** - Verify UI components are present

Tests run on both **Chrome and Firefox** browsers for cross-browser compatibility (6 tests × 2 browsers = 12 total tests).

Run E2E tests with:

```bash
npm run e2e
```

Tests use realistic timeouts (60s per test) to handle slower CI/CD environments.

### CI/CD Pipeline

GitHub Actions automatically runs on every push and pull request:

1. **Lint** - ESLint code quality checks
2. **Unit Tests** - Vitest with jsdom
3. **Build** - Vite production build verification
4. **E2E Tests** - Playwright tests on Chrome and Firefox
5. **Report** - Playwright HTML report stored as artifact

See [`.github/workflows/ci.yml`](.github/workflows/ci.yml) for pipeline configuration.

## Code Quality

ESLint rules enforce:

- React best practices
- Functional component patterns
- Proper hook usage
- Code style consistency

Run linting with:

```bash
npm run lint
```

## CI/CD Pipeline & Branch Protection

The project uses **GitHub Actions** for automated testing on every push and pull request.

**Main branch is protected** - code can only merge if:
- ✅ ESLint checks pass (no code style violations)
- ✅ All 24 unit tests pass
- ✅ All 12 E2E tests pass (Chrome + Firefox)
- ✅ Production build succeeds
- ✅ Code is reviewed and approved

See [CI-CD.md](CI-CD.md) for detailed information about the pipeline, branch protection rules, and troubleshooting.

## Browser Support

Works in all modern browsers that support:

- ES6+ JavaScript
- React 19
- localStorage API
- Fetch API

## Deployment

Build the app for production:

```bash
npm run build
```

This creates an optimized build in the `dist/` folder that can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

## Development Notes

- No TypeScript - pure JavaScript ES6
- No state management libraries (Redux, Zustand) - React Context is sufficient
- No CSS frameworks - plain CSS with Grid and Flexbox
- Functional components only - no class components
- Tests co-located with source code for easy maintenance

## Performance Features

- **Code splitting** via Vite
- **1-hour response caching** with localStorage
- **Responsive images** with lazy loading
- **Optimized CSS** with media queries
- **Fast refresh** during development

---

Developed as a technical assessment for a mobile device store frontend SPA.
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
