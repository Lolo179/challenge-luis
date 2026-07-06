# Architecture

This SPA follows a simple layered frontend architecture.

Backend analogy:

Controller / Use Case / Client

maps to:

Page / Component / API-Service

## Data flow

Product list:

User opens `/`

→ ProductListPage

→ productApi.getProducts()

→ ProductCard list

Product detail:

User opens `/product/:id`

→ ProductDetailPage

→ productApi.getProductById(id)

→ ProductDescription + ProductActions

Add to cart:

ProductActions

→ cartApi.addToCart()

→ CartContext updates count

→ Header displays count

## Main decisions

- React is used with JavaScript ES6 to match the technical test.

- Vite is used for a simple development setup.

- React Router handles client-side routing.

- Context API is used only for cart count.

- localStorage is wrapped by cacheService.

- UI components do not call APIs directly.

- API responses are mapped before reaching components.
 