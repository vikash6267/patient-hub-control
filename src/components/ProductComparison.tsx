
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  subcategory: string;
  concern: string;
  knowledgeSystem: string;
  inStock: number;
  description: string;
  sku: string;
  supplier: string;
  rating: number;
  reviews: number;
  isOrganic: boolean;
}

interface ProductComparisonProps {
  products: Product[];
  onRemoveProduct: (productId: number) => void;
  onClearAll: () => void;
}

const ProductComparison = ({ products, onRemoveProduct, onClearAll }: ProductComparisonProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  if (products.length === 0) return null;

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`
    });
  };

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-blue-900">
            Product Comparison ({products.length})
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={onClearAll}
            className="border-blue-300 text-blue-700"
          >
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg p-4 border border-blue-200 relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveProduct(product.id)}
                className="absolute top-2 right-2 h-6 w-6 p-0 text-blue-600 hover:text-blue-700"
              >
                <X className="w-4 h-4" />
              </Button>
              
              <h4 className="font-medium text-gray-900 mb-2 pr-8 line-clamp-2">{product.name}</h4>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-semibold text-green-600">${product.price}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{product.rating}</span>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Stock:</span>
                  <Badge variant={product.inStock > 10 ? "secondary" : "outline"} className="text-xs">
                    {product.inStock} left
                  </Badge>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="text-xs">{product.category}</span>
                </div>
                
                {product.isOrganic && (
                  <Badge className="bg-green-100 text-green-800 text-xs">Organic</Badge>
                )}
              </div>
              
              <Button
                size="sm"
                onClick={() => handleAddToCart(product)}
                disabled={product.inStock === 0}
                className="w-full mt-3 bg-green-600 hover:bg-green-700"
              >
                <ShoppingCart className="w-3 h-3 mr-1" />
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductComparison;
