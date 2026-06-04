/**
 * Responsive design utilities and breakpoint helpers
 * 
 * Tailwind breakpoints:
 * - sm: 640px
 * - md: 768px
 * - lg: 1024px
 * - xl: 1280px
 * - 2xl: 1536px
 * 
 * Device targets:
 * - Mobile (iOS/Android): < 768px
 * - Tablet: 768px - 1024px
 * - 14" Laptop: ~1366px - 1440px (falls under lg: and xl: breakpoints)
 * - Desktop: > 1280px
 */

export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const DEVICE_SIZES = {
  mobile: {
    min: 0,
    max: 767,
    label: "Mobile (iOS/Android)"
  },
  tablet: {
    min: 768,
    max: 1023,
    label: "Tablet"
  },
  laptop14: {
    min: 1024,
    max: 1440,
    label: "14\" Laptop"
  },
  desktop: {
    min: 1441,
    max: Infinity,
    label: "Desktop"
  }
} as const;

/**
 * Responsive image sizes for different devices
 */
export const RESPONSIVE_IMAGE_SIZES = {
  hero: {
    mobile: "100vw",
    tablet: "100vw",
    laptop: "100vw",
    desktop: "100vw"
  },
  section: {
    mobile: "100vw",
    tablet: "100vw",
    laptop: "calc(100vw - 48px)",
    desktop: "1280px"
  },
  card: {
    mobile: "100%",
    tablet: "calc(50% - 12px)",
    laptop: "calc(25% - 18px)",
    desktop: "calc(25% - 18px)"
  }
} as const;

/**
 * Responsive font sizes using clamp for fluid typography
 */
export const RESPONSIVE_FONT_SIZES = {
  h1: "clamp(1.875rem, 5vw, 3.75rem)", // 30px - 60px
  h2: "clamp(1.5rem, 4vw, 2.25rem)", // 24px - 36px
  h3: "clamp(1.25rem, 3vw, 1.875rem)", // 20px - 30px
  body: "clamp(0.875rem, 1.2vw, 1rem)", // 14px - 16px
  small: "clamp(0.75rem, 1vw, 0.875rem)" // 12px - 14px
} as const;

/**
 * Responsive spacing utilities
 */
export const RESPONSIVE_SPACING = {
  section: {
    mobile: "py-12 md:py-16 lg:py-20 xl:py-24",
    large: "py-16 md:py-24 lg:py-32 xl:py-40"
  },
  padding: {
    mobile: "px-4 sm:px-6 md:px-8",
    container: "px-6 md:px-8 lg:px-12"
  }
} as const;

/**
 * Responsive grid utilities
 */
export const RESPONSIVE_GRID = {
  cols2: "grid-cols-1 md:grid-cols-2",
  cols3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  cols4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  cols6: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
} as const;

/**
 * Check if current viewport matches a breakpoint
 */
export const useMediaQuery = (breakpoint: keyof typeof BREAKPOINTS): boolean => {
  if (typeof window === "undefined") return false;
  
  const query = `(min-width: ${BREAKPOINTS[breakpoint]}px)`;
  return window.matchMedia(query).matches;
};

/**
 * Get current device size
 */
export const getCurrentDeviceSize = (): keyof typeof DEVICE_SIZES => {
  if (typeof window === "undefined") return "desktop";
  
  const width = window.innerWidth;
  
  if (width < DEVICE_SIZES.tablet.min) return "mobile";
  if (width < DEVICE_SIZES.laptop14.min) return "tablet";
  if (width < DEVICE_SIZES.desktop.min) return "laptop14";
  return "desktop";
};
