# AGENTS.md
## Project context
Technical test frontend SPA for a mobile device store.
The app must provide:
- Product list page
- Product detail page
- Client-side routing
- Product search by brand and model
- Add-to-cart action
- Cart count visible in the header
- Client-side cache with 1 hour TTL
- Required scripts: start, build, test, lint
## Technical stack
- React
- JavaScript ES6
- Vite
- React Router
- Fetch API
- Vitest
- React Testing Library
- ESLint
Do not use:
- TypeScript
- Redux
- Zustand
- Tailwind
- Material UI
- Styled Components
- Next.js
- Axios unless explicitly decided
## Architecture
Use this structure:
src/
 api/
 components/
 context/
 pages/
 services/
Responsibilities:
- pages: coordinate data loading, state, routing params and page composition.
- components: presentational UI, receive data through props.
- api: HTTP communication with backend endpoints.
- services: technical concerns such as cache and TTL.
- context: shared UI state such as cart count.
## Implementation rules
- Implement one small task at a time.
- Do not modify unrelated files.
- Prefer simple, readable code over clever abstractions.
- Keep React components small.
- Use functional components.
- Use hooks only when needed.
- Handle loading and error states.
- Keep API response mapping outside UI components.
- Use localStorage only through cacheService.
- Add or update tests when behavior changes.
## Internal model
Product list item:
- id
- brand
- model
- price
- imgUrl
Product detail:
- id
- brand
- model
- price
- imgUrl
- cpu
- ram
- os
- displayResolution
- battery
- cameras
- dimensions
- weight
- options
Cart action:
- product id
- selected colorCode
- selected storageCode
Cart state:
- count only