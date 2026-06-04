import { HelmetProvider } from "react-helmet-async";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Pages
import Home from "@/pages/Home";
import Contact from "@/pages/Contact";
import Projects from "@/pages/Projects";
import NotFound from "@/pages/NotFound";
import FAQ from "@/pages/resources/FAQ";
import Blog from "@/pages/resources/Blog";
import BillOfRights from "@/pages/resources/BillOfRights";
import FireRestoration from "@/pages/services/FireRestoration";
import WaterRestoration from "@/pages/services/WaterRestoration";
import StormRecovery from "@/pages/services/StormRecovery";
import ContentsServices from "@/pages/services/ContentsServices";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/contact" component={Contact} />
      <Route path="/projects" component={Projects} />

      <Route path="/resources/faq" component={FAQ} />
      <Route path="/resources/blog" component={Blog} />
      <Route path="/resources/bill-of-rights" component={BillOfRights} />

      <Route path="/services/fire-restoration" component={FireRestoration} />
      <Route path="/services/water-restoration" component={WaterRestoration} />
      <Route path="/services/storm-recovery" component={StormRecovery} />
      <Route path="/services/contents-services" component={ContentsServices} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ThemeProvider defaultTheme="light">
          <Router />
        </ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;

