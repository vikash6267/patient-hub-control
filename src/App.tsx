
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/Layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Inventory from "./pages/Inventory";
import Wholesale from "./pages/Wholesale";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
          <Route path="/patients" element={<DashboardLayout><Patients /></DashboardLayout>} />
          <Route path="/inventory" element={<DashboardLayout><Inventory /></DashboardLayout>} />
          <Route path="/communication" element={<DashboardLayout><div className="p-8 text-center text-gray-500">Communication module coming soon...</div></DashboardLayout>} />
          <Route path="/marketing" element={<DashboardLayout><div className="p-8 text-center text-gray-500">Marketing module coming soon...</div></DashboardLayout>} />
          <Route path="/forms" element={<DashboardLayout><div className="p-8 text-center text-gray-500">Forms module coming soon...</div></DashboardLayout>} />
          <Route path="/documents" element={<DashboardLayout><div className="p-8 text-center text-gray-500">Documents module coming soon...</div></DashboardLayout>} />
          <Route path="/wholesale" element={<DashboardLayout><Wholesale /></DashboardLayout>} />
          <Route path="/payments" element={<DashboardLayout><div className="p-8 text-center text-gray-500">Payments module coming soon...</div></DashboardLayout>} />
          <Route path="/accounting" element={<DashboardLayout><div className="p-8 text-center text-gray-500">Accounting module coming soon...</div></DashboardLayout>} />
          <Route path="/shipping" element={<DashboardLayout><div className="p-8 text-center text-gray-500">Shipping module coming soon...</div></DashboardLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
