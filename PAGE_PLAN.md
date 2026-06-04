# Heritage Restoration Website - Page Plan & Architecture

## Current State

- **Home Page (`/`)**: Exists as a massive single-page component (`Home.tsx`). It contains sections for Services, Resources, Testimonials, Projects, and Contact.
- **Not Found (`/404`)**: Exists.
- **Routing**: Handled by `wouter` in `App.tsx`.
- **Layout**: The navigation bar and footer are currently hardcoded inside `Home.tsx`.

## Missing Pages to Build

Based on the navigation links and standard restoration company website structure, we need to build the following pages:

1. **Services Pages** (Currently just anchor links `#services`):
   - `/services/fire-restoration`: Detailed page for Fire Restoration.
   - `/services/water-restoration`: Detailed page for Water Restoration.
   - `/services/storm-recovery`: Detailed page for Storm Recovery.
   - `/services/contents-services`: Detailed page for Contents Services.

2. **Resources Pages** (Currently modals in `Home.tsx`):
   - `/faq`: Frequently Asked Questions.
   - `/blog`: Blog listing page.
   - `/bill-of-rights`: Homeowner Bill of Rights.

3. **Contact Page** (Currently an anchor link `#contact`):
   - `/contact`: Dedicated contact page with a form and map.

## Architectural Changes Needed

1. **Extract Layout Components**:
   - Extract the Header/Navigation from `Home.tsx` into `src/components/layout/Header.tsx`.
   - Extract the Footer from `Home.tsx` into `src/components/layout/Footer.tsx`.
   - Create a `Layout.tsx` wrapper to wrap all pages so the header and footer are consistent across the site.

2. **Update Routing (`App.tsx`)**:
   - Add routes for all the new pages.
   - Wrap routes in the new `Layout` component.

3. **SEO & AI Optimization**:
   - Add `react-helmet-async` (or similar) to manage `<title>`, `<meta name="description">`, Open Graph tags, and JSON-LD structured data for each page.
   - Ensure semantic HTML tags (`<header>`, `<main>`, `<article>`, `<section>`, `<footer>`) are used correctly.
   - Add `aria-labels` and ensure accessibility for AI crawlers.

4. **Responsiveness**:
   - Ensure all new pages and extracted layout components use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`) correctly.
   - Specifically test and adjust for 14" laptops (around `1366x768` to `1440x900` resolution, usually falls under `lg:` or `xl:` breakpoints) and mobile devices (iOS/Android, `< 768px`).

## Execution Steps

1. Refactor `Home.tsx` to extract `Header` and `Footer`.
2. Create `Layout.tsx` and update `App.tsx`.
3. Build the Services pages.
4. Build the Resources pages.
5. Build the Contact page.
6. Implement SEO metadata across all pages.
7. Perform responsive testing and adjustments.
