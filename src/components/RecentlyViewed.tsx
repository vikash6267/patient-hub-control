
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  inStock: number;
  rating: number;
  reviews: number;
  isOrganic: boolean;
}

interface RecentlyViewedProps {
  currentProductId?: number;
}

const RecentlyViewed = ({ currentProductId }: RecentlyViewedProps) => {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const recent = localStorage.getItem("recentlyViewed");
    if (recent) {
      const products = JSON.parse(recent);
      // Filter out current product if viewing product detail
      const filtered = currentProductId 
        ? products.filter((p: Product) => p.id !== currentProductId)
        : products;
      setRecentProducts(filtered.slice(0, 4));
    }
  }, [currentProductId]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`
    });
  };

  if (recentProducts.length === 0) return null;

  return (
    <Card className="border-purple-200 bg-purple-50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-purple-900 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Recently Viewed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg p-4 border border-purple-200">
              <Link to={`/product/${product.id}`}>
                <h4 className="font-medium text-gray-900 mb-2 hover:text-purple-600 transition-colors line-clamp-2">
                  {product.name}
                </h4>
              </Link>
              
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600">${product.price}</span>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm">{product.rating}</span>
                  </div>
                </div>
                
                <Badge variant="outline" className="text-xs border-purple-200 text-purple-700">
                  {product.category}
                </Badge>
                
                {product.isOrganic && (
                  <Badge className="bg-green-100 text-green-800 text-xs">Organic</Badge>
                )}
              </div>
              
              <Button
                size="sm"
                onClick={() => handleAddToCart(product)}
                disabled={product.inStock === 0}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <ShoppingCart className="w-3 h-3 mr-1" />
                {product.inStock > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentlyViewed;
