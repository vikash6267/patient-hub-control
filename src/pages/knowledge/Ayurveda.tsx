
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Star, ShoppingCart, Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import ProductsHeader from "@/components/ProductsHeader";
import UserAccountModal from "@/components/UserAccountModal";

const Ayurveda = () => {
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

  const ayurvedicProducts = [
    {
      id: 1,
      name: "Ashwagandha Root Extract",
      price: 29.99,
      originalPrice: 39.99,
      category: "Adaptogenic Herbs",
      rating: 4.8,
      reviews: 156,
      description: "Premium organic ashwagandha for stress relief and vitality",
      benefits: ["Reduces stress", "Improves energy", "Supports immunity"],
      isOrganic: true
    },
    {
      id: 2,
      name: "Turmeric Curcumin Complex",
      price: 24.99,
      originalPrice: 34.99,
      category: "Anti-inflammatory",
      rating: 4.9,
      reviews: 203,
      description: "High-potency turmeric with black pepper for enhanced absorption",
      benefits: ["Reduces inflammation", "Joint support", "Antioxidant protection"],
      isOrganic: true
    },
    {
      id: 3,
      name: "Triphala Digestive Support",
      price: 19.99,
      originalPrice: 26.99,
      category: "Digestive Health",
      rating: 4.7,
      reviews: 189,
      description: "Traditional three-fruit formula for digestive wellness",
      benefits: ["Improves digestion", "Detoxification", "Regular elimination"],
      isOrganic: true
    },
    {
      id: 4,
      name: "Brahmi Mind Support",
      price: 32.99,
      originalPrice: 42.99,
      category: "Cognitive Health",
      rating: 4.6,
      reviews: 134,
      description: "Ancient brain tonic for memory and mental clarity",
      benefits: ["Enhances memory", "Mental clarity", "Reduces anxiety"],
      isOrganic: true
    }
  ];

  const doshaTypes = [
    {
      name: "Vata",
      elements: "Air + Space",
      characteristics: "Creative, energetic, quick-thinking",
      imbalance: "Anxiety, restlessness, digestive issues",
      recommendations: "Warm foods, regular routine, grounding practices"
    },
    {
      name: "Pitta",
      elements: "Fire + Water",
      characteristics: "Intelligent, focused, ambitious",
      imbalance: "Anger, inflammation, skin issues",
      recommendations: "Cooling foods, moderate exercise, calming activities"
    },
    {
      name: "Kapha",
      elements: "Earth + Water",
      characteristics: "Calm, stable, nurturing",
      imbalance: "Lethargy, weight gain, congestion",
      recommendations: "Light foods, vigorous exercise, stimulating activities"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
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
          <div className="bg-orange-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Leaf className="w-12 h-12 text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Ayurveda - Ancient Wisdom for Modern Wellness</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the 5,000-year-old science of life that focuses on balancing mind, body, and spirit through natural remedies, proper nutrition, and lifestyle practices.
          </p>
        </div>

        {/* What is Ayurveda */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-orange-700">What is Ayurveda?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Ayurveda, meaning "knowledge of life," is one of the world's oldest healing systems. Originating in India over 5,000 years ago, it's based on the belief that health and wellness depend on a delicate balance between the mind, body, and spirit.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌿</span>
                </div>
                <h3 className="font-semibold text-orange-700 mb-2">Natural Healing</h3>
                <p className="text-sm text-gray-600">Uses herbs, minerals, and natural substances</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚖️</span>
                </div>
                <h3 className="font-semibold text-orange-700 mb-2">Balance & Harmony</h3>
                <p className="text-sm text-gray-600">Focuses on balancing the three doshas</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🧘</span>
                </div>
                <h3 className="font-semibold text-orange-700 mb-2">Holistic Approach</h3>
                <p className="text-sm text-gray-600">Treats the whole person, not just symptoms</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dosha Types */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Understanding Your Dosha</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {doshaTypes.map((dosha, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-700">{dosha.name}</CardTitle>
                  <Badge variant="outline" className="w-fit">{dosha.elements}</Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Characteristics:</h4>
                    <p className="text-sm text-gray-600">{dosha.characteristics}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">When Imbalanced:</h4>
                    <p className="text-sm text-gray-600">{dosha.imbalance}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Recommendations:</h4>
                    <p className="text-sm text-gray-600">{dosha.recommendations}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Recommended Ayurvedic Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ayurvedicProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="aspect-square bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg mb-4 flex items-center justify-center relative">
                    <Leaf className="w-16 h-16 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
                    {product.isOrganic && (
                      <Badge className="absolute top-2 left-2 bg-green-600 text-white text-xs">
                        Organic
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-orange-700 border-orange-200 bg-orange-50">
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
                            <span className="w-1 h-1 bg-orange-400 rounded-full mr-2"></span>
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
                          <span className="text-2xl font-bold text-orange-600">
                            ${product.price}
                          </span>
                          <span className="text-lg text-gray-400 line-through">
                            ${product.originalPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white" 
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
            <CardTitle className="text-2xl text-orange-700">Benefits of Ayurvedic Medicine</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Physical Benefits</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Improved digestion and metabolism
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Enhanced immune system function
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Better sleep quality and energy levels
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Reduced inflammation and pain
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Mental & Emotional Benefits</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Reduced stress and anxiety
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Improved mental clarity and focus
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Enhanced emotional balance
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Greater sense of well-being
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center bg-orange-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Your Ayurvedic Journey</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Discover personalized wellness solutions based on ancient Ayurvedic principles. 
            Consult with our experts to find the right products for your unique constitution.
          </p>
          <div className="space-x-4">
            <Link to="/products?knowledge=Ayurveda">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                Shop Ayurvedic Products
              </Button>
            </Link>
            <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50">
              Take Dosha Quiz
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

export default Ayurveda;
