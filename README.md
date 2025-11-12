# movie-dashboard

 Vue 3 app (Vite) that lists TV shows by genre, supports search and show detail page.

Node

- Use Node v22.16.0.

Quick start

- Install: npm install
- Dev server: npm run dev
- Unit tests: npm run test:unit

What’s implemented

- Vue 3 + Composition API with <script setup> and TypeScript.
- Pinia store for app state (shows grouped by genre).
- Router (lazy routes) for Home, Search, Show detail.
- Service layer for TVMaze API calls (search, fetch by id).
- Accessible components: semantic lists, role/status regions, labelled search form.
- Reusable components: ShowList (horizontal), ShowCard (clickable LI), SearchBar, ScrollNavButton.
- Component styles scoped (can be centralized into global CSS).

Project layout (important)

- src/
    - main.ts — app bootstrap (pinia + router)
    - pages/ — HomePage.vue, SearchResults.vue, ShowDetail.vue
    - components/ — Layout, shows, common components (ShowList, ShowCard, SearchBar)
    - stores/ — Pinia stores
    - services/ — API helpers (shows.service.ts)
    - styles/ — base styles
    - **tests**/ — unit tests (Vitest)

Patterns & conventions used

- Composition API (refs, computed), <script setup>
- Pinia for state management (actions/getters)
- Router props and query-driven pages (useRoute/useRouter)
- Small service layer separating network logic from components
- Semantic HTML + ARIA for accessibility


Things that can be enhanced given time

- Centralize component CSS into src/styles/components/ for easier theming.
- Add an Image component to standardize lazy/loading/placeholder behavior.
- Add additional unit tests
- Add integration tests
- Optimize UI further to add a welcome page
- Add a simple CI job to run lint, tests and build on push.

License / notes

- Uses TVMaze API for data (see services/shows.service.ts).

Demo: https://github.com/user-attachments/assets/536b2c3a-adad-4b70-9c80-1e5e36f7b00d

