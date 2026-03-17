# Study Project — Playwright (base setup)

Minimal E2E project with [Playwright](https://playwright.dev).

## Installation

```bash
npm install
npx playwright install
```

(Only Chromium is needed for the base setup.)

## Run tests

```bash
npm test
```

Other commands: `npm run test:ui`, `npm run test:headed`, `npm run report`.

## Structure

| File / folder           | Purpose                         |
|-------------------------|----------------------------------|
| `playwright.config.ts`  | Config (browser, baseURL)        |
| `tests/*.spec.ts`       | Tests                           |
| `baseURL`               | Default: playwright.dev          |

To test your own site, change `baseURL` in `playwright.config.ts`.
