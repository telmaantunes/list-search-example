# List-Search example

## Server

In order to run this SPA a simple server is needed to get the data.

### Go to `server` and install the server dependencies using:

```bash
pnpm install
```

or

```bash
npm install
```

### Run the server using:

```bash
pnpm run server
```

or

```bash
npm run server
```

The server should be running on port `3000`.

### Available routes

#### Books list -> http://localhost:3000/books

Returns a list of books, with their info.

#### Book details -> http://localhost:3000/books/SLUG

Returns the book information for the given SLUG (404 otherwise).


## SPA

Using Vue.js, this SPA gets information from a server (explained before) and lists it.

### Install the server dependencies using:

```bash
pnpm install --frozen-lockfile
```

or

```bash
npm install --frozen-lockfile
```

### Compile and Hot-Reload for Development

```bash
pnpm dev
```

or

```bash
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
pnpm test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
pnpm build
pnpm test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

### Available pages

#### Books list

Listing of all available books returned from the API, with some features:

- Text search and highlight (for title, synopsis and author).
- Pagination on the books list
- Synopsis truncated at 200 characters.
- Book's title and cover link to the book's individual page.
- Book's upvote functionality.

#### Book page

Book details, highlighting the cover and displaying the full synopsis.
