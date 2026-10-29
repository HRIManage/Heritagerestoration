import { Helmet, HelmetProvider } from "react-helmet-async";
import { Route, Switch, useLocation, Router as WouterRouter } from "wouter";
import { Suspense, useEffect, type ComponentType } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

const GSC_VERIFICATION = (
  import.meta.env.VITE_GSC_VERIFICATION as string | undefined
)?.trim();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // Fallback for asynchronous layout shifts during React rendering
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 5);

    return () => clearTimeout(timer);
  }, [location]);
  return null;
}

// ─── Pages, loaded one chunk per page ───────────────────────────────────────
// Each page's code is its own file, so a first visit downloads only what that
// page needs. The page for the current URL is loaded *before* the app renders
// (see preloadRoute in main.tsx / entry-server.tsx), so nothing flashes blank,
// and every other page is fetched quietly in the background afterwards.
import NotFound from "@/pages/NotFound";

type PageLoader = () => Promise<{ default: ComponentType<any> }>;

function lazyPage(loader: PageLoader) {
  let Loaded: ComponentType<any> | null = null;
  let pending: Promise<void> | null = null;
  const load = () =>
    (pending ??= loader().then(m => {
      Loaded = m.default;
    }));
  function Page(props: any) {
    if (!Loaded) throw load(); // Suspense shows the fallback until it resolves
    return <Loaded {...props} />;
  }
  return Object.assign(Page, { load }) as ComponentType<any> & { load: () => Promise<void> };
}

const Home = lazyPage(() => import("@/pages/Home"));
const Contact = lazyPage(() => import("@/pages/Contact"));
const Projects = lazyPage(() => import("@/pages/Projects"));
const FAQ = lazyPage(() => import("@/pages/resources/FAQ"));
const Blog = lazyPage(() => import("@/pages/resources/Blog"));
const BillOfRights = lazyPage(() => import("@/pages/resources/BillOfRights"));
const FireRestoration = lazyPage(() => import("@/pages/services/FireRestoration"));
const WaterRestoration = lazyPage(() => import("@/pages/services/WaterRestoration"));
const StormRecovery = lazyPage(() => import("@/pages/services/StormRecovery"));
const ContentsServices = lazyPage(() => import("@/pages/services/ContentsServices"));
const ServiceAreas = lazyPage(() => import("@/pages/locations/ServiceAreas"));
const LocationPage = lazyPage(() => import("@/pages/locations/LocationPage"));
const Privacy = lazyPage(() => import("@/pages/legal/Privacy"));
const Terms = lazyPage(() => import("@/pages/legal/Terms"));
const ThankYou = lazyPage(() => import("@/pages/ThankYou"));
const Commercial = lazyPage(() => import("@/pages/commercial/Commercial"));
const CommercialService = lazyPage(() => import("@/pages/commercial/CommercialService"));

/** URL pattern -> page. Keep in step with the <Route>s in Router() below. */
const PAGE_ROUTES: [string, { load: () => Promise<void> }][] = [
  ["/", Home],
  ["/home", Home],
  ["/contact", Contact],
  ["/projects", Projects],
  ["/our-projects", Projects],
  ["/resources/faq", FAQ],
  ["/resources/blog", Blog],
  ["/resources/vlog", Blog],
  ["/vlog", Blog],
  ["/resources/bill-of-rights", BillOfRights],
  ["/services/fire-restoration", FireRestoration],
  ["/services/water-restoration", WaterRestoration],
  ["/services/storm-recovery", StormRecovery],
  ["/services/contents-services", ContentsServices],
  ["/commercial", Commercial],
  ["/commercial-restoration", Commercial],
  ["/commercial/fire-restoration", CommercialService],
  ["/commercial/water-restoration", CommercialService],
  ["/service-areas", ServiceAreas],
  ["/service-area/:slug", LocationPage],
  ["/privacy", Privacy],
  ["/terms", Terms],
  ["/thank-you", ThankYou],
];

/** Loads the page for `pathname` (so the first render never has to wait). */
export function preloadRoute(pathname: string): Promise<void> {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const hit = PAGE_ROUTES.find(([pattern]) =>
    new RegExp("^" + pattern.replace(/:[^/]+/g, "[^/]+") + "$").test(clean)
  );
  return hit ? hit[1].load() : Promise.resolve();
}

/** Fetches every remaining page in the background so later clicks are instant. */
export function preloadAllRoutes(): void {
  const run = () => PAGE_ROUTES.forEach(([, page]) => page.load().catch(() => {}));
  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(run, { timeout: 4000 });
  } else {
    setTimeout(run, 2000);
  }
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/contact" component={Contact} />
      <Route path="/projects" component={Projects} />
      <Route path="/our-projects" component={Projects} />

      <Route path="/resources/faq" component={FAQ} />
      <Route path="/resources/blog" component={Blog} />
      <Route path="/resources/vlog" component={Blog} />
      <Route path="/vlog" component={Blog} />
      <Route path="/resources/bill-of-rights" component={BillOfRights} />

      <Route path="/services/fire-restoration" component={FireRestoration} />
      <Route path="/services/water-restoration" component={WaterRestoration} />
      <Route path="/services/storm-recovery" component={StormRecovery} />
      <Route path="/services/contents-services" component={ContentsServices} />

      <Route path="/commercial" component={Commercial} />
      <Route path="/commercial-restoration" component={Commercial} />
      <Route path="/commercial/fire-restoration">
        <CommercialService service="fire" />
      </Route>
      <Route path="/commercial/water-restoration">
        <CommercialService service="water" />
      </Route>

      <Route path="/service-areas" component={ServiceAreas} />
      <Route path="/service-area/:slug" component={LocationPage} />

      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/thank-you" component={ThankYou} />

      <Route component={NotFound} />
    </Switch>
  );
}

type AppProps = {
  /** Set only by the build-time prerender (entry-server.tsx). */
  ssrPath?: string;
  helmetContext?: object;
};

function App({ ssrPath, helmetContext }: AppProps = {}) {
  return (
    <HelmetProvider context={helmetContext}>
      {GSC_VERIFICATION ? (
        <Helmet>
          <meta name="google-site-verification" content={GSC_VERIFICATION} />
        </Helmet>
      ) : null}
      <ErrorBoundary>
        <ThemeProvider defaultTheme="light">
          <WouterRouter ssrPath={ssrPath}>
            <ScrollToTop />
            <Suspense fallback={<div className="min-h-screen bg-[#FAF9F6]" aria-busy="true" />}>
              <Router />
            </Suspense>
          </WouterRouter>
        </ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
