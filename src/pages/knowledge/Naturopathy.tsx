
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Star, ShoppingCart, ArrowLeft, Sun, Heart, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import ProductsHeader from "@/components/ProductsHeader";
import UserAccountModal from "@/components/UserAccountModal";

const Naturopathy = () => {
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userModalMode, setUserModalMode] = useState<"login" | "register" | "account">("login");
  const { addToCart, getTotalItems } = useCart();
  const { toast } = useToast();

  const openUserModal = (mode: "login" | "register" | "account") => {
    setUserModalMode(mode);
    setUserModalOpen(true);
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`
    });
  };

  const naturopathicProducts = [
    {
      id: 9,
      name: "Vitamin D3 + K2 Complex",
      price: 28.99,
      originalPrice: 36.99,
      category: "Essential Vitamins",
      rating: 4.8,
      reviews: 234,
      description: "Synergistic formula for bone health and immune support",
      benefits: ["Bone health", "Immune support", "Calcium absorption"],
      isOrganic: false
    },
    {
      id: 10,
      name: "Omega-3 Fish Oil",
      price: 32.99,
      originalPrice: 42.99,
      category: "Essential Fatty Acids",
      rating: 4.7,
      reviews: 189,
      description: "Pure, sustainably sourced omega-3 for heart and brain health",
      benefits: ["Heart health", "Brain function", "Anti-inflammatory"],
      isOrganic: false
    },
    {
      id: 11,
      name: "Probiotic Complex 50 Billion",
      price: 45.99,
      originalPrice: 59.99,
      category: "Digestive Health",
      rating: 4.9,
      reviews: 312,
      description: "Multi-strain probiotic for optimal gut health",
      benefits: ["Digestive health", "Immune support", "Gut microbiome"],
      isOrganic: true
    },
    {
      id: 12,
      name: "Magnesium Glycinate",
      price: 24.99,
      originalPrice: 31.99,
      category: "Essential Minerals",
      rating: 4.6,
      reviews: 156,
      description: "Highly absorbable magnesium for muscle and nerve function",
      benefits: ["Muscle relaxation", "Sleep support", "Stress relief"],
      isOrganic: false
    }
  ];

  const principles = [
    {
      title: "The Healing Power of Nature",
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      description: "Trust in the body's inherent wisdom to heal itself"
    },
    {
      title: "Identify and Treat the Causes",
      icon: <Shield className="w-8 h-8 text-green-600" />,
      description: "Look beyond symptoms to identify and address root causes"
    },
    {
      title: "First Do No Harm",
      icon: <Heart className="w-8 h-8 text-green-600" />,
      description: "Utilize methods and substances that minimize harmful side effects"
    },
    {
      title: "Doctor as Teacher",
      icon: <Sun className="w-8 h-8 text-green-600" />,
      description: "Educate patients in the steps to achieving and maintaining health"
    }
  ];

  const therapeuticModalities = [
    "Clinical Nutrition",
    "Herbal Medicine",
    "Hydrotherapy",
    "Physical Medicine",
    "Lifestyle Counseling",
    "Stress Management",
    "Environmental Medicine",
    "Detoxification"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <ProductsHeader 
        totalItems={getTotalItems()} 
        onOpenUserModal={openUserModal}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link to="/products">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Leaf className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Naturopathy - Nature's Path to Wellness</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover comprehensive natural healthcare that addresses the whole person and emphasizes prevention, treatment, and optimal health through natural methods.
          </p>
        </div>

        {/* What is Naturopathy */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700">What is Naturopathy?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Naturopathy is a distinct primary health care system that blends modern scientific knowledge with traditional and natural forms of medicine. It emphasizes the treatment of the whole person and encourages the body's natural healing processes.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="font-semibold text-green-700 mb-2">Natural Methods</h3>
                <p className="text-sm text-gray-600">Uses natural therapies and minimal intervention</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-semibold text-green-700 mb-2">Root Cause Focus</h3>
                <p className="text-sm text-gray-600">Addresses underlying causes, not just symptoms</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🧘</span>
                </div>
                <h3 className="font-semibold text-green-700 mb-2">Whole Person Care</h3>
                <p className="text-sm text-gray-600">Treats physical, mental, and emotional aspects</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Core Principles */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Six Principles of Naturopathy</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {principles.map((principle, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    {principle.icon}
                    <CardTitle className="text-xl text-green-700">{principle.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{principle.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Therapeutic Modalities */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700">Therapeutic Modalities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {therapeuticModalities.map((modality, index) => (
                <div key={index} className="bg-green-50 rounded-lg p-4 text-center">
                  <h3 className="font-semibold text-green-700 text-sm">{modality}</h3>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommended Products */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Essential Naturopathic Supplements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {naturopathicProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="aspect-square bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg mb-4 flex items-center justify-center relative">
                    <Leaf className="w-16 h-16 text-green-500 group-hover:scale-110 transition-transform duration-300" />
                    {product.isOrganic && (
                      <Badge className="absolute top-2 left-2 bg-green-600 text-white text-xs">
                        Organic
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                      {product.category}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900">
                      {product.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-gray-700">Benefits:</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {product.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="w-1 h-1 bg-green-400 rounded-full mr-2"></span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-green-600">
                            ${product.price}
                          </span>
                          <span className="text-lg text-gray-400 line-through">
                            ${product.originalPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white" 
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700">Benefits of Naturopathic Medicine</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Health Benefits</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Enhanced immune system function
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Improved energy and vitality
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Better digestive health
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Reduced chronic inflammation
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Lifestyle Benefits</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Improved sleep quality
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Better stress management
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Enhanced mental clarity
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Sustainable health practices
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center bg-green-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Embrace Natural Wellness</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Take the first step towards optimal health with naturopathic medicine. 
            Work with our licensed naturopathic doctors to create your personalized wellness plan.
          </p>
          <div className="space-x-4">
            <Link to="/products?knowledge=Naturopathy">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Shop Natural Products
              </Button>
            </Link>
            <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
              Book Consultation
            </Button>
          </div>
        </div>
      </div>

      <UserAccountModal
        isOpen={userModalOpen}
        onClose={() => setUserModalOpen(false)}
        mode={userModalMode}
      />
    </div>
  );
};

export default Naturopathy;
