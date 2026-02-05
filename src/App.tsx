import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import AIEmployeesIndex from "./pages/AIEmployeesIndex";
import AIEmployeeDetail from "./pages/AIEmployeeDetail";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import { ScrollToTop } from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ai-employees" element={<AIEmployeesIndex />} />
          <Route path="/ai-employees/:id" element={<AIEmployeeDetail />} />
          <Route path="/pricing" element={<Pricing />} />
          {/* Backward compatibility redirects */}
          <Route path="/marketplace/:id" element={<MarketplaceRedirect />} />
          <Route path="/marketplace" element={<Navigate to="/ai-employees" replace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Redirect component for old marketplace URLs
function MarketplaceRedirect() {
  const path = window.location.pathname;
  const id = path.split('/').pop();
  return <Navigate to={`/ai-employees/${id}`} replace />;
}

export default App;

