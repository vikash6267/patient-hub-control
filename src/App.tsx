import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import OrderConfirmation from "./pages/OrderConfirmation";
import AdminDashboard from "./pages/AdminDashboard";
import PatientPortal from "./pages/PatientPortal";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

// Knowledge System Pages
import Ayurveda from "./pages/knowledge/Ayurveda";
import Homeopathy from "./pages/knowledge/Homeopathy";
import Naturopathy from "./pages/knowledge/Naturopathy";
import Signup from "./pages/Signup";
import Patients from "./pages/Patients";
import Wholesale from "./pages/Wholesale";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/patient-portal" element={<PatientPortal />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/wholesale" element={<Wholesale />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<Signup />} />

            {/* Knowledge System Pages */}
            <Route path="/knowledge/ayurveda" element={<Ayurveda />} />
            <Route path="/knowledge/homeopathy" element={<Homeopathy />} />
            <Route path="/knowledge/naturopathy" element={<Naturopathy />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
