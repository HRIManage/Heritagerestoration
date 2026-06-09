# Implementation Plan - Homepage Premium Design Upgrades

We will elevate the homepage (`Home.tsx`) to match the custom, premium, editorial aesthetic of the redesigned subpages. This will involve removing template-like boxes, upgrading standard text grids to high-depth card lists, re-styling the 8-step timeline to be borderless and typographical, and converting boxy stats/testimonials into clean editorial blocks.

## User Review Required

> [!IMPORTANT]
>
> - **Hero Office Locations:** We will transition the office locations in the hero from boxy clipped cards to an elegant, floating glassmorphic container with thin separators, making it integrate beautifully with the hero photo.
> - **Trust Badges Row:** We will re-style the floating badge section into a clean horizontal trust bar with delicate animations.
> - **Staggered Service Cards:** The specialized services section will be upgraded to feature clean, borderless cards topped with hover-zooming images.
> - **Borderless Timeline Steps:** We will remove the closed card borders around the 8-step timeline, relying instead on open whitespace, a delicate center path, and translucent typographic background watermarks.
> - **Editorial Testimonials & Stats:** Testimonial blocks and the bottom stat strip will transition to borderless formats with soft depth shadows and thin dividers.

---

## Proposed Changes

### 1. Homepage Hero & Badge Trust Bar

#### [MODIFY] [Home.tsx](file:///c:/Users/BennettYanajai/Desktop/heritage_homepage/client/src/pages/Home.tsx)

- **Hero Locations:**
  - Replace the boxy, clip-path cards for the North/South offices in the hero with a unified **floating glassmorphism card** on the right.
  - The card will have a subtle white-transparent background (`bg-white/10 backdrop-blur-md`), a thin border, and a clean vertical divider separating the two locations.
- **Badge Trust Bar:**
  - Re-style the floating trust badges (Emergency Response, IICRC Certified, 5 Year Warranty) to sit in a **delicate, borderless horizontal bar** below the hero fold, using clean typography and subtle entrance slide animations.

### 2. Specialized Restoration Cards

- **Service Listings:**
  - Instead of simple text links with full-round icon backgrounds, we will convert the 4 service items into **premium editorial card blocks**:
    - Each block will have a rounded top image (matching the service's category image) that zooms in slightly on hover.
    - Below the image, the title, description, and an animated hover arrow sit in a clean white, borderless frame.

### 3. Winding Process Timeline & Testimonials

- **Borderless Process Steps:**
  - We will remove the borders (`border-[#3F4143]/10`) around all 8 timeline cards.
  - Cards will sit directly on the textured canvas with a soft shadow depth.
  - Large watermarked step numbers in the background will guide the user visually.
  - On mobile, cards will also be borderless with a delicate left-accent green line.
- **Bespoke Testimonials:**
  - Remove closed rectangular borders. Testimonial items will feature a **large double-quote watermark** and sit as borderless containers with high-depth shadows (`shadow-[0_15px_40px_rgba(0,0,0,0.03)]`), using a solid left-edge green accent.

### 4. Bottom Statistics Strip

- **Borderless Stat Columns:**
  - Replace the 4 rounded rectangles at the bottom of the page with a **single unified editorial banner**.
  - Stats will be laid out in 4 columns separated by thin vertical dividers, matching the office locations style on the subpages.

---

## Verification Plan

### Automated Tests

- Run `npm run check` to verify TypeScript compile checks.
- Run `npm run build` to verify production assets bundle successfully.
