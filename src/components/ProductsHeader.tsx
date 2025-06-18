
import { Button } from "@/components/ui/button";
import { Leaf, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductsHeaderProps {
  totalItems: number;
  onOpenUserModal: (mode: "login" | "register" | "account") => void;
}

const ProductsHeader = ({ totalItems, onOpenUserModal }: ProductsHeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-green-700">Nutra Herb USA</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
              Home
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
              Products
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
              About
            </Link>
            <Link to="/blog" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
              Blog
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
              Contact
            </Link>
            <Link to="/patient-portal" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
              Patient Portal
            </Link>
            <Link to="/admin" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
              Admin
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onOpenUserModal("login")}
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              <User className="w-4 h-4 mr-2" />
              Account
            </Button>
            <Link to="/cart">
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart ({totalItems})
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProductsHeader;
