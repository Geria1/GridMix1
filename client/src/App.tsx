import { Switch, Route } from "wouter";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";
import Dashboard from "@/pages/Dashboard";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import AboutMe from "@/pages/AboutMe";
import Admin from "@/pages/Admin";
import Projects from "@/pages/Projects";
import Forecast from "@/pages/Forecast";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/about" component={About} />
        <Route path="/blog" component={Blog} />
        <Route path="/about-me" component={AboutMe} />
        <Route path="/admin" component={Admin} />
        <Route path="/projects" component={Projects} />
        <Route path="/forecast" component={Forecast} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
