# Testing Guide

## Device Testing Matrix

### iOS Devices

| Device            | Screen Size | Resolution | Viewport |
| ----------------- | ----------- | ---------- | -------- |
| iPhone SE         | 4.7"        | 375×667    | 375px    |
| iPhone 12         | 6.1"        | 390×844    | 390px    |
| iPhone 12 Pro Max | 6.7"        | 428×926    | 428px    |
| iPad (7th gen)    | 10.2"       | 768×1024   | 768px    |
| iPad Pro 11"      | 11"         | 834×1194   | 834px    |
| iPad Pro 12.9"    | 12.9"       | 1024×1366  | 1024px   |

### Android Devices

| Device                   | Screen Size | Resolution | Viewport |
| ------------------------ | ----------- | ---------- | -------- |
| Samsung Galaxy S21       | 6.2"        | 360×800    | 360px    |
| Samsung Galaxy S21+      | 6.7"        | 384×854    | 384px    |
| Samsung Galaxy S21 Ultra | 6.8"        | 384×854    | 384px    |
| Samsung Galaxy Tab S7    | 11"         | 800×1280   | 800px    |
| Samsung Galaxy Tab S8    | 11"         | 1024×1536  | 1024px   |

### Laptop & Desktop

| Device            | Screen Size | Resolution | Viewport |
| ----------------- | ----------- | ---------- | -------- |
| 14" Laptop (WXGA) | 14"         | 1366×768   | 1366px   |
| 14" Laptop (FHD)  | 14"         | 1440×900   | 1440px   |
| 15" Laptop        | 15"         | 1920×1080  | 1920px   |
| 24" Monitor       | 24"         | 1920×1200  | 1920px   |
| 27" Monitor       | 27"         | 2560×1440  | 2560px   |

## Manual Testing Checklist

### Home Page (/)

#### Mobile (375px - 767px)

- [ ] Logo displays correctly
- [ ] Navigation hamburger menu works
- [ ] Hero section text is readable
- [ ] Service cards stack vertically
- [ ] Images load properly
- [ ] Buttons are touch-friendly (44px+)
- [ ] Footer links are accessible
- [ ] No horizontal scrolling

#### Tablet (768px - 1023px)

- [ ] Navigation shows horizontal menu
- [ ] Service cards display in 2 columns
- [ ] Hero section has proper spacing
- [ ] Images scale appropriately
- [ ] All content is visible without scrolling horizontally

#### 14" Laptop (1366px - 1440px)

- [ ] Navigation dropdown menus work
- [ ] Service cards display in 4 columns
- [ ] Hero section fills viewport properly
- [ ] Hover effects work smoothly
- [ ] All text is readable at normal zoom

#### Desktop (1920px+)

- [ ] Content container has max-width
- [ ] Spacing is balanced
- [ ] All interactive elements work
- [ ] Animations are smooth

### Service Pages (/services/\*)

#### Mobile

- [ ] Title and description are readable
- [ ] Service details stack vertically
- [ ] Process steps are numbered clearly
- [ ] CTA buttons are prominent
- [ ] Contact information is accessible

#### Desktop

- [ ] Multi-column layouts work
- [ ] Icons display properly
- [ ] Hover effects on cards
- [ ] Smooth scrolling animations

### Contact Page (/contact)

#### Mobile

- [ ] Form fields are full-width
- [ ] Input fields are at least 16px font
- [ ] Submit button is large enough
- [ ] Office locations display vertically
- [ ] Phone/email links work

#### Desktop

- [ ] Form displays in 2 columns where appropriate
- [ ] Map integration works
- [ ] All contact information is visible
- [ ] Form validation works

## Browser Testing

### Chrome/Edge

- [ ] Latest version
- [ ] Previous version
- [ ] Mobile emulation (DevTools)

### Firefox

- [ ] Latest version
- [ ] Previous version
- [ ] Responsive design mode

### Safari

- [ ] Latest version
- [ ] Previous version
- [ ] iOS Safari (iPhone)
- [ ] iPad Safari

## Performance Testing

### Lighthouse Audit

```bash
# Run Lighthouse audit
# In Chrome DevTools: Ctrl+Shift+P → Lighthouse
```

**Target Scores:**

- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 95

### Core Web Vitals

| Metric                         | Target  | Status |
| ------------------------------ | ------- | ------ |
| Largest Contentful Paint (LCP) | < 2.5s  | ✓      |
| First Input Delay (FID)        | < 100ms | ✓      |
| Cumulative Layout Shift (CLS)  | < 0.1   | ✓      |

### Page Load Time

- Mobile (3G): < 5s
- Mobile (4G): < 3s
- Desktop: < 2s

## Responsive Design Testing

### Viewport Sizes to Test

```css
/* Mobile */
320px, 375px, 414px, 480px

/* Tablet */
600px, 768px, 800px, 1024px

/* Laptop */
1024px, 1366px, 1440px

/* Desktop */
1920px, 2560px
```

### Orientation Testing

- [ ] Portrait mode on mobile
- [ ] Landscape mode on mobile
- [ ] Portrait mode on tablet
- [ ] Landscape mode on tablet

### Zoom Testing

- [ ] 80% zoom
- [ ] 100% zoom (default)
- [ ] 120% zoom
- [ ] 150% zoom

## Accessibility Testing

### Keyboard Navigation

- [ ] Tab through all interactive elements
- [ ] Enter/Space activates buttons
- [ ] Escape closes modals
- [ ] Focus indicators visible
- [ ] Logical tab order

### Screen Reader Testing

- [ ] Use NVDA (Windows) or JAWS
- [ ] Use VoiceOver (Mac/iOS)
- [ ] Use TalkBack (Android)

**Test:**

- [ ] Page title announced
- [ ] Headings announced correctly
- [ ] Links have descriptive text
- [ ] Form labels associated
- [ ] Images have alt text
- [ ] Buttons announced correctly

### Color Contrast

- [ ] Text contrast ratio ≥ 4.5:1 (normal text)
- [ ] Text contrast ratio ≥ 3:1 (large text)
- [ ] Use WebAIM Contrast Checker

## SEO Testing

### Meta Tags

- [ ] Title tag present and unique
- [ ] Meta description present
- [ ] Open Graph tags present
- [ ] Twitter Card tags present
- [ ] Canonical URL set

### Structured Data

```bash
# Test with Google Rich Results Test
# https://search.google.com/test/rich-results
```

- [ ] JSON-LD validates
- [ ] LocalBusiness schema correct
- [ ] Service schema correct

### Sitemap & Robots

- [ ] Sitemap.xml accessible
- [ ] Robots.txt accessible
- [ ] No crawl errors in Search Console

## Mobile-Specific Testing

### iOS Testing

- [ ] Viewport meta tag correct
- [ ] Touch events work
- [ ] Keyboard doesn't cover inputs
- [ ] Safe area respected (notch/home indicator)
- [ ] Status bar color correct

### Android Testing

- [ ] Viewport meta tag correct
- [ ] Touch events work
- [ ] System back button works
- [ ] Keyboard doesn't cover inputs
- [ ] System font scaling respected

## 14" Laptop Specific Testing

### 1366×768 Resolution

- [ ] All content visible without horizontal scroll
- [ ] Navigation dropdown menus don't overflow
- [ ] Hero section properly sized
- [ ] Service cards fit in 4-column grid
- [ ] Footer content properly arranged

### 1440×900 Resolution

- [ ] Content properly centered
- [ ] Spacing is balanced
- [ ] All interactive elements accessible
- [ ] No layout shifts

## Automated Testing Setup

### Install Testing Tools

```bash
pnpm install -D vitest @testing-library/react @testing-library/jest-dom
```

### Run Tests

```bash
# Run all tests
pnpm run test

# Run with coverage
pnpm run test:coverage

# Watch mode
pnpm run test:watch
```

## Cross-Browser Testing Services

### BrowserStack

- Test on real devices
- Automate testing
- Screenshot testing

### Sauce Labs

- Cross-browser testing
- Automated testing
- Performance testing

## Testing Checklist Summary

- [ ] Mobile devices (iOS & Android)
- [ ] Tablet devices
- [ ] 14" Laptop (1366×768 and 1440×900)
- [ ] Desktop (1920×1080+)
- [ ] All browsers (Chrome, Firefox, Safari, Edge)
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast
- [ ] Page load performance
- [ ] SEO meta tags
- [ ] Structured data
- [ ] Responsive images
- [ ] Touch interactions
- [ ] Form validation
- [ ] Error handling
- [ ] Accessibility compliance

## Performance Optimization Tips

### Images

- Use WebP format with fallback
- Implement lazy loading
- Use responsive images (srcset)
- Compress images (80-90% quality)

### CSS

- Purge unused Tailwind classes
- Minify CSS
- Use CSS Grid for layouts
- Avoid inline styles

### JavaScript

- Code splitting with Vite
- Lazy load components
- Minimize bundle size
- Use production builds

### Fonts

- Use system fonts or Google Fonts
- Limit font weights
- Preload critical fonts
- Use font-display: swap

## Continuous Integration

### GitHub Actions Example

```yaml
name: Test & Deploy
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "18"
          cache: "pnpm"
      - run: pnpm install
      - run: pnpm run check
      - run: pnpm run build
      - run: pnpm run test
```

## Reporting Issues

When reporting issues, include:

- Device/browser information
- Screen resolution
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/videos
- Console errors
