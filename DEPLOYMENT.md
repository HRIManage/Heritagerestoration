# Deployment & Build Guide

## Project Overview

Heritage Restoration website is built with:

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4
- **Routing**: Wouter (lightweight router)
- **Animations**: Framer Motion
- **SEO**: React Helmet Async
- **Build Tool**: Vite
- **Backend**: Express.js (Node.js)

## Prerequisites

- Node.js 18+ (recommended 22.13.0)
- pnpm 10.4.1+ (package manager)
- Git

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd heritage_homepage

# Install dependencies
pnpm install

# Install any missing packages
pnpm install react-helmet-async
```

## Development

### Start Development Server

```bash
# Run Vite development server with hot reload
pnpm run dev

# Server will start at http://localhost:5173
```

### Build for Production

```bash
# Build the project
pnpm run build

# Preview production build locally
pnpm run preview
```

### Type Checking

```bash
# Check TypeScript types
pnpm run check
```

### Code Formatting

```bash
# Format code with Prettier
pnpm run format
```

## Project Structure

```
heritage_homepage/
├── client/
│   └── src/
│       ├── components/
│       │   ├── layout/
│       │   │   ├── Header.tsx
│       │   │   ├── Footer.tsx
│       │   │   └── Layout.tsx
│       │   ├── ui/
│       │   │   └── (shadcn/ui components)
│       │   └── (other components)
│       ├── pages/
│       │   ├── Home.tsx
│       │   ├── Contact.tsx
│       │   └── services/
│       │       ├── FireRestoration.tsx
│       │       ├── WaterRestoration.tsx
│       │       ├── StormRecovery.tsx
│       │       └── ContentsServices.tsx
│       ├── lib/
│       │   ├── seo.ts
│       │   └── responsive.ts
│       ├── contexts/
│       │   └── ThemeContext.tsx
│       ├── hooks/
│       │   └── (custom hooks)
│       ├── App.tsx
│       ├── main.tsx
│       └── index.css
├── server/
│   └── index.ts
├── public/
│   ├── sitemap.xml
│   ├── robots.txt
│   └── (static assets)
├── photo/
│   └── (project images)
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.ts
```

## Key Features

### SEO Optimization

- Meta tags on all pages (via React Helmet)
- Structured data (JSON-LD) for search engines
- Sitemap and robots.txt
- Semantic HTML structure
- Open Graph tags for social sharing

### Responsive Design

- Mobile-first approach
- Optimized for iOS and Android
- Special optimization for 14" laptops (1366×768 - 1440×900)
- Tailwind breakpoints: xs, sm, md, lg, xl, 2xl
- Fluid typography using `clamp()`

### Performance

- Code splitting with Vite
- Lazy loading for images
- Optimized bundle size
- Fast page load times
- Efficient CSS with Tailwind purging

### Accessibility

- Semantic HTML tags
- ARIA labels
- Keyboard navigation
- Color contrast compliance
- Touch-friendly button sizes

## Pages & Routes

| Route                         | Component            | Purpose                             |
| ----------------------------- | -------------------- | ----------------------------------- |
| `/`                           | Home.tsx             | Landing page with services overview |
| `/services/fire-restoration`  | FireRestoration.tsx  | Fire damage restoration details     |
| `/services/water-restoration` | WaterRestoration.tsx | Water damage restoration details    |
| `/services/storm-recovery`    | StormRecovery.tsx    | Storm damage recovery details       |
| `/services/contents-services` | ContentsServices.tsx | Contents pack-out & storage         |
| `/contact`                    | Contact.tsx          | Contact form and office locations   |
| `/404`                        | NotFound.tsx         | 404 error page                      |

## Environment Variables

Create a `.env` file in the root directory (if needed):

```env
VITE_API_URL=https://api.heritagerestoration.com
VITE_GOOGLE_MAPS_KEY=your_google_maps_api_key
```

## Deployment Options

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set production domain
vercel --prod
```

### Option 2: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### Option 3: Docker

```bash
# Build Docker image
docker build -t heritage-restoration .

# Run container
docker run -p 3000:3000 heritage-restoration
```

### Option 4: Manual Server Deployment

```bash
# Build the project
pnpm run build

# Start production server
pnpm run start

# Server will run on port 3000
```

## Performance Checklist

- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 2s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Mobile performance optimized
- [ ] Images optimized (WebP format)
- [ ] CSS minified
- [ ] JavaScript minified
- [ ] Fonts optimized

## SEO Checklist

- [ ] Meta titles on all pages
- [ ] Meta descriptions on all pages
- [ ] Open Graph tags for social sharing
- [ ] Structured data (JSON-LD) implemented
- [ ] Sitemap.xml created and submitted
- [ ] Robots.txt configured
- [ ] Canonical URLs set
- [ ] Mobile-friendly design
- [ ] Fast page load times
- [ ] No broken links

## Monitoring & Analytics

### Google Analytics

```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_ID");
</script>
```

### Google Search Console

- Submit sitemap.xml
- Monitor search performance
- Check for indexing issues
- Monitor mobile usability

## Troubleshooting

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Clear Vite cache
rm -rf dist .vite
pnpm run build
```

### Port Already in Use

```bash
# Change port in vite.config.ts or use:
pnpm run dev -- --port 3001
```

### TypeScript Errors

```bash
# Check types
pnpm run check

# Fix type issues in IDE
# Use Ctrl+Shift+P (Cmd+Shift+P on Mac) → TypeScript: Restart TS Server
```

## Maintenance

### Regular Updates

```bash
# Check for outdated packages
pnpm outdated

# Update packages
pnpm update

# Update specific package
pnpm update package-name@latest
```

### Security

```bash
# Audit for vulnerabilities
pnpm audit

# Fix vulnerabilities
pnpm audit --fix
```

## Support

For issues or questions:

- Check existing documentation
- Review code comments
- Check Git history for changes
- Contact development team

## License

MIT License - See LICENSE file for details
