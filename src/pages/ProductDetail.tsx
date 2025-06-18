import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Heart, Share2, ShoppingCart, Star, Leaf, Shield, Award, Truck, User, Minus, Plus, Globe } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import UserAccountModal from "@/components/UserAccountModal";
import StockAlert from "@/components/StockAlert";
import RecentlyViewed from "@/components/RecentlyViewed";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userModalMode, setUserModalMode] = useState<"login" | "register" | "account">("login");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Ashwagandha Root Extract for Relaxation & Stress Relief",
      price: 29.99,
      originalPrice: 39.99,
      category: "Herbal Medicine",
      subcategory: "Stress Support",
      concern: "Energy",
      knowledgeSystem: "Ayurveda",
      form: "Capsules",
      unitSize: "60 capsules",
      unitPrice: 0.50,
      inStock: 25,
      isOnline: true,
      description: "Premium organic ashwagandha for stress relief and vitality",
      sku: "ASH001",
      supplier: "Himalayan Herbs",
      rating: 4.8,
      reviews: 156,
      isOrganic: true,
      ingredients: "Organic Ashwagandha Root Extract (Withania somnifera), Vegetarian Capsule",
      dosage: "Take 1-2 capsules daily with food or as directed by healthcare professional",
      benefits: ["Reduces stress and anxiety", "Supports energy levels", "Promotes restful sleep", "Enhanced mental clarity"],
      certifications: ["USDA Organic", "Non-GMO", "Gluten-Free", "Third-Party Tested"]
    },
    {
      id: 2,
      name: "Turmeric Curcumin for Energy & Vitality",
      price: 24.99,
      originalPrice: 34.99,
      category: "Herbal Medicine",
      subcategory: "",
      concern: "Aches and Pains",
      knowledgeSystem: "Ayurveda",
      form: "Tablets",
      unitSize: "90 tablets",
      unitPrice: 0.28,
      inStock: 45,
      isOnline: true,
      description: "High-potency turmeric with black pepper extract",
      sku: "TUR001",
      supplier: "Golden Spice Co.",
      rating: 4.9,
      reviews: 203,
      isOrganic: true,
      ingredients: "Organic Turmeric Root Extract, Black Pepper Extract (Piperine), Vegetarian Capsule",
      dosage: "Take 1 capsule twice daily with meals",
      benefits: ["Supports joint health", "Natural anti-inflammatory", "Antioxidant properties", "Enhanced absorption with piperine"],
      certifications: ["USDA Organic", "Non-GMO", "Vegan", "GMP Certified"]
    },
    {
      id: 3,
      name: "Collagen15X Advanced Formula",
      price: 49.99,
      originalPrice: 67.99,
      category: "Supplements",
      subcategory: "Collagen15X",
      concern: "Bone Health",
      knowledgeSystem: "Naturopathy",
      form: "Powder",
      unitSize: "30 servings",
      unitPrice: 1.67,
      inStock: 30,
      isOnline: false,
      description: "Advanced collagen formula for joint and skin health",
      sku: "COL15X",
      supplier: "Joint Care Pro",
      rating: 4.7,
      reviews: 189,
      isOrganic: false,
      ingredients: "Hydrolyzed Collagen Peptides (Types I, II, III), Vitamin C, Hyaluronic Acid",
      dosage: "Mix 1 scoop with 8oz of water or beverage daily",
      benefits: ["Supports joint flexibility", "Promotes skin elasticity", "Strengthens hair and nails", "Easy absorption"],
      certifications: ["Grass-Fed", "Pasture-Raised", "Non-GMO", "Third-Party Tested"]
    },
    {
      id: 4,
      name: "Lavender Essential Oil NOW 1-oz",
      price: 16.99,
      originalPrice: 22.99,
      category: "Essential Oils",
      subcategory: "Aromatherapy",
      concern: "Sleep Support",
      knowledgeSystem: "Aromatherapy",
      form: "Liquid",
      unitSize: "30ml (1 fl oz)",
      unitPrice: 0.57,
      inStock: 0,
      isOnline: true,
      description: "Pure lavender essential oil for relaxation and sleep",
      sku: "LAV001",
      supplier: "Nature's Essence",
      rating: 4.8,
      reviews: 134,
      isOrganic: true,
      ingredients: "100% Pure Lavandula angustifolia (Lavender) Oil",
      dosage: "For aromatherapy use only. Add 3-5 drops to diffuser or dilute with carrier oil for topical use",
      benefits: ["Promotes relaxation", "Supports restful sleep", "Calms the mind", "Natural stress relief"],
      certifications: ["USDA Organic", "Steam Distilled", "Therapeutic Grade", "GC/MS Tested"]
    }
  ]);
  const { addToCart, getTotalItems } = useCart();
  const { toast } = useToast();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  // Mock product data - in real app, this would come from API
  const product = products.find(p => p.id === parseInt(id || "0"));

  useEffect(() => {
    if (product) {
      // Add to recently viewed
      const recent = localStorage.getItem("recentlyViewed");
      const recentList = recent ? JSON.parse(recent) : [];
      
      // Remove if already exists and add to front
      const filtered = recentList.filter((p: any) => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, 8); // Keep last 8 viewed
      
      localStorage.setItem("recentlyViewed", JSON.stringify(updated));
    }
  }, [product]);

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Show loading state
  if (isLoading) {
    return <LoadingState type="product-detail" />;
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <ErrorState 
          title="Failed to load product"
          message={error}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link to="/products">
            <Button className="bg-green-600 hover:bg-green-700">
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: product.name, href: `/product/${product.id}`, current: true }
  ];

  const reviews = [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      date: "2 weeks ago",
      comment: "This ashwagandha has been a game-changer for my stress levels. I feel more balanced and energized throughout the day."
    },
    {
      id: 2,
      name: "Mike R.",
      rating: 4,
      date: "1 month ago",
      comment: "High quality product. I've noticed improved sleep and less anxiety since starting this supplement."
    }
  ];

  const handleToggleOnline = (productId: number) => {
    setProducts(prevProducts => 
      prevProducts.map(p => 
        p.id === productId ? { ...p, isOnline: !p.isOnline } : p
      )
    );
    toast({
      title: "Product Status Updated",
      description: `Product is now ${product?.isOnline ? 'offline' : 'online'}.`
    });
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast({
      title: "Added to Cart!",
      description: `${quantity} x ${product.name} added to your cart.`
    });
  };

  const openUserModal = (mode: "login" | "register" | "account") => {
    setUserModalMode(mode);
    setUserModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
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
              <Link to="/products" className="text-green-600 font-medium">
                Products
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
                onClick={() => openUserModal("login")}
                className="border-green-200 text-green-700 hover:bg-green-50"
              >
                <User className="w-4 h-4 mr-2" />
                Account
              </Button>
              <Link to="/cart">
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart ({getTotalItems()})
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <BreadcrumbNav items={breadcrumbItems} />

        {/* Back Button */}
        <div className="mb-6">
          <Link to="/products">
            <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center relative overflow-hidden">
              <Leaf className="w-32 h-32 text-green-500" />
              {product.isOrganic && (
                <Badge className="absolute top-4 left-4 bg-green-600 text-white">
                  Organic
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                    {product.category}
                  </Badge>
                  {product.subcategory && (
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                      {product.subcategory}
                    </Badge>
                  )}
                  <Badge variant="secondary" className="bg-purple-50 text-purple-700">
                    {product.knowledgeSystem}
                  </Badge>
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                    {product.form}
                  </Badge>
                </div>
                
                {/* Online Status Toggle */}
                <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-lg border">
                  <Globe className={`w-4 h-4 ${product.isOnline ? 'text-green-600' : 'text-gray-400'}`} />
                  <span className="text-sm font-medium text-gray-700">
                    {product.isOnline ? 'Online' : 'Offline'}
                  </span>
                  <Switch
                    checked={product.isOnline}
                    onCheckedChange={() => handleToggleOnline(product.id)}
                  />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-600 text-lg">{product.description}</p>
            </div>

            {/* Online Status Alert */}
            {!product.isOnline && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800">
                    This product is currently offline and not visible to customers.
                  </span>
                </div>
              </div>
            )}

            {/* Rating and Reviews */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-lg font-medium text-gray-700 ml-2">{product.rating}</span>
              </div>
              <span className="text-gray-500">({product.reviews} reviews)</span>
            </div>

            {/* Price and Stock */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-4xl font-bold text-green-600">${product.price}</span>
                <span className="text-2xl text-gray-400 line-through">${product.originalPrice}</span>
                <Badge className="bg-red-100 text-red-800">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant={product.inStock > 10 ? "secondary" : product.inStock > 0 ? "outline" : "destructive"}
                  className={product.inStock > 10 ? "bg-green-100 text-green-700" : ""}
                >
                  {product.inStock > 0 ? `${product.inStock} in stock` : "Out of stock"}
                </Badge>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-600">{product.unitSize}</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-600">${product.unitPrice}/unit</span>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium">SKU:</span> {product.sku}</p>
              <p><span className="font-medium">Supplier:</span> {product.supplier}</p>
              <p><span className="font-medium">Form:</span> {product.form}</p>
              <p><span className="font-medium">Unit Size:</span> {product.unitSize}</p>
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2">
              {product.certifications?.map((cert, index) => (
                <Badge key={index} variant="outline" className="border-green-200 text-green-700">
                  <Award className="w-3 h-3 mr-1" />
                  {cert}
                </Badge>
              ))}
            </div>

            {/* Stock Alert for Out of Stock Products */}
            {product.inStock === 0 && (
              <StockAlert
                productId={product.id}
                productName={product.name}
                isInStock={product.inStock > 0}
              />
            )}

            {/* Quantity and Add to Cart */}
            {product.inStock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-gray-700">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-10 w-10 p-0"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.min(product.inStock, quantity + 1))}
                      className="h-10 w-10 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    size="lg"
                    onClick={handleAddToCart}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart - ${(product.price * quantity).toFixed(2)}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-green-200 text-green-700 hover:bg-green-50"
                  >
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-12">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {product.benefits?.map((benefit, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-green-600" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ingredients" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ingredients</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{product.ingredients}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="usage" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dosage & Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{product.dosage}</p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Important:</strong> Consult with a healthcare professional before use, especially if pregnant, nursing, or taking medications.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Customer reviews will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Recently Viewed Products */}
        <RecentlyViewed currentProductId={product.id} />
      </div>

      {/* User Account Modal */}
      <UserAccountModal
        isOpen={userModalOpen}
        onClose={() => setUserModalOpen(false)}
        mode={userModalMode}
      />
    </div>
  );
};

export default ProductDetail;
