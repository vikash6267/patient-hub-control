
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Heart, Plus, Leaf, Globe } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    category: string;
    subcategory?: string;
    knowledgeSystem: string;
    inStock: number;
    isOnline?: boolean;
    description: string;
    supplier: string;
    rating: number;
    reviews: number;
    isOrganic: boolean;
    form?: string;
    unitSize?: string;
    unitPrice?: number;
  };
  onAddToCart: (product: any) => void;
  onCompareProduct: (product: any) => void;
}

const ProductCard = ({ product, onAddToCart, onCompareProduct }: ProductCardProps) => {
  // Calculate price per individual unit (capsule, ml, etc.)
  const calculateUnitPrice = () => {
    if (!product.unitSize) return null;
    
    // Extract number from unit size (e.g., "60 capsules" -> 60, "100ml" -> 100)
    const unitCount = parseInt(product.unitSize.match(/\d+/)?.[0] || "1");
    const pricePerUnit = product.price / unitCount;
    
    // Determine unit type from form or unit size
    let unitType = "unit";
    if (product.form?.toLowerCase().includes("capsule") || product.unitSize.toLowerCase().includes("capsule")) {
      unitType = "capsule";
    } else if (product.form?.toLowerCase().includes("tablet") || product.unitSize.toLowerCase().includes("tablet")) {
      unitType = "tablet";
    } else if (product.unitSize.toLowerCase().includes("ml") || product.unitSize.toLowerCase().includes("liquid")) {
      unitType = "ml";
    } else if (product.unitSize.toLowerCase().includes("powder") || product.unitSize.toLowerCase().includes("gram")) {
      unitType = "gram";
    }
    
    return { pricePerUnit, unitType, unitCount };
  };

  const unitPricing = calculateUnitPrice();

  return (
    <Card className={`group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white rounded-xl overflow-hidden h-full flex flex-col ${!product.isOnline ? 'opacity-60' : ''}`}>
      <CardHeader className="pb-3 relative flex-shrink-0">
        <Link to={`/product/${product.id}`} className="block">
          <div className="aspect-square bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
            <Leaf className="w-12 h-12 text-green-500 group-hover:scale-110 transition-transform duration-300" />
            {product.isOrganic && (
              <Badge className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1">
                Organic
              </Badge>
            )}
            {product.isOnline === false && (
              <Badge className="absolute bottom-2 left-2 bg-gray-600 text-white text-xs px-2 py-1">
                <Globe className="w-3 h-3 mr-1" />
                Offline
              </Badge>
            )}
          </div>
        </Link>
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="w-8 h-8 p-0 bg-white/90 hover:bg-white border-green-200 shadow-sm"
          >
            <Heart className="w-3.5 h-3.5 text-green-600" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => onCompareProduct(product)}
            className="w-8 h-8 p-0 bg-white/90 hover:bg-white border-blue-200 shadow-sm"
            title="Add to comparison"
          >
            <Plus className="w-3.5 h-3.5 text-blue-600" />
          </Button>
        </div>

        {/* Product Info */}
        <div className="space-y-3">
          {/* Category and Rating Row */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <Badge variant="outline" className="text-xs text-green-700 border-green-200 bg-green-50 mb-1">
                {product.category}
              </Badge>
              {product.subcategory && (
                <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 ml-1">
                  {product.subcategory}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium text-gray-700">{product.rating}</span>
              <span className="text-xs text-gray-500">({product.reviews})</span>
            </div>
          </div>

          {/* Knowledge System and Form */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
              {product.knowledgeSystem}
            </Badge>
            {product.form && (
              <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                {product.form}
              </Badge>
            )}
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.id}`}>
            <CardTitle className="text-base font-bold text-gray-900 group-hover:text-green-700 transition-colors cursor-pointer line-clamp-2 leading-tight">
              {product.name}
            </CardTitle>
          </Link>

          {/* Description */}
          <CardDescription className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {product.description}
          </CardDescription>
        </div>
      </CardHeader>

      {/* Product Details Section */}
      <div className="px-6 pb-4 flex-grow">
        <div className="bg-gray-50 rounded-lg p-3 space-y-2.5">
          {/* Pack Size */}
          {product.unitSize && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Pack Size:</span>
              <span className="text-sm font-bold text-gray-800">{product.unitSize}</span>
            </div>
          )}
          
          {/* Cost per Unit */}
          {unitPricing && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Cost per {unitPricing.unitType}:</span>
              <span className="text-sm font-bold text-green-600">
                ${unitPricing.pricePerUnit.toFixed(3)}
              </span>
            </div>
          )}
          
          {/* Supplier */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <span className="text-sm font-medium text-gray-600">Supplier:</span>
            <span className="text-sm font-semibold text-gray-800 truncate ml-2">{product.supplier}</span>
          </div>
        </div>
      </div>

      {/* Price and Add to Cart Section */}
      <CardContent className="pt-0 pb-4 mt-auto">
        <div className="space-y-3">
          {/* Price Section */}
          <div className="flex items-end justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-green-600">
                  ${product.price}
                </span>
                <span className="text-base text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              </div>
              {unitPricing && (
                <div className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded-md inline-block">
                  Save ${((product.originalPrice - product.price) / unitPricing.unitCount).toFixed(3)} per {unitPricing.unitType}
                </div>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium transition-colors h-10" 
            disabled={product.inStock === 0 || product.isOnline === false} 
            onClick={() => onAddToCart(product)}
          >
            {product.isOnline === false 
              ? "Product Offline" 
              : product.inStock > 0 
              ? "Add to Cart" 
              : "Out of Stock"
            }
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
