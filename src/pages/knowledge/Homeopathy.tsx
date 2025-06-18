
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Star, ShoppingCart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import ProductsHeader from "@/components/ProductsHeader";
import UserAccountModal from "@/components/UserAccountModal";

const Homeopathy = () => {
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

  const homeopathicProducts = [
    {
      id: 5,
      name: "Arnica Montana 30C",
      price: 12.99,
      originalPrice: 16.99,
      category: "Pain Relief",
      rating: 4.7,
      reviews: 143,
      description: "For bruises, muscle soreness, and trauma",
      potency: "30C",
      uses: ["Bruises", "Muscle pain", "Sports injuries"]
    },
    {
      id: 6,
      name: "Oscillococcinum",
      price: 18.99,
      originalPrice: 24.99,
      category: "Cold & Flu",
      rating: 4.5,
      reviews: 298,
      description: "Natural flu relief and prevention",
      potency: "200CK",
      uses: ["Flu symptoms", "Prevention", "Recovery"]
    },
    {
      id: 7,
      name: "Ignatia Amara 30C",
      price: 14.99,
      originalPrice: 19.99,
      category: "Emotional Support",
      rating: 4.6,
      reviews: 167,
      description: "For grief, emotional upset, and mood swings",
      potency: "30C",
      uses: ["Grief", "Emotional stress", "Mood swings"]
    },
    {
      id: 8,
      name: "Nux Vomica 30C",
      price: 13.99,
      originalPrice: 18.99,
      category: "Digestive Health",
      rating: 4.8,
      reviews: 189,
      description: "For digestive issues and overindulgence",
      potency: "30C",
      uses: ["Indigestion", "Nausea", "Hangover"]
    }
  ];

  const principles = [
    {
      title: "Like Cures Like",
      latin: "Similia Similibus Curentur",
      description: "A substance that causes symptoms in a healthy person can cure similar symptoms in a sick person when highly diluted."
    },
    {
      title: "Minimum Dose",
      latin: "Law of Infinitesimals",
      description: "The smallest possible dose that produces a healing response is the most effective and safest."
    },
    {
      title: "Individualization",
      latin: "Totality of Symptoms",
      description: "Treatment is based on the unique symptom picture of each individual, not just the disease name."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
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
          <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Droplets className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Homeopathy - Gentle Healing Through Natural Law</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the gentle yet powerful healing system that works with your body's natural ability to heal itself using highly diluted natural substances.
          </p>
        </div>

        {/* What is Homeopathy */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-700">What is Homeopathy?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Homeopathy is a medical system developed by German physician Samuel Hahnemann in 1796. It's based on the principle that the body can heal itself and that "like cures like" - substances that cause symptoms in healthy people can cure similar symptoms in sick people when given in very small amounts.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌊</span>
                </div>
                <h3 className="font-semibold text-blue-700 mb-2">Gentle & Safe</h3>
                <p className="text-sm text-gray-600">Non-toxic with no harmful side effects</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-semibold text-blue-700 mb-2">Individualized</h3>
                <p className="text-sm text-gray-600">Treatment tailored to each person's unique symptoms</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌿</span>
                </div>
                <h3 className="font-semibold text-blue-700 mb-2">Natural Healing</h3>
                <p className="text-sm text-gray-600">Stimulates the body's own healing mechanisms</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Core Principles */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Core Principles of Homeopathy</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {principles.map((principle, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-700">{principle.title}</CardTitle>
                  <Badge variant="outline" className="w-fit text-blue-600 border-blue-200">{principle.latin}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{principle.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Homeopathic Remedies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {homeopathicProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg mb-4 flex items-center justify-center relative">
                    <Droplets className="w-16 h-16 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                    <Badge className="absolute top-2 left-2 bg-blue-600 text-white text-xs">
                      {product.potency}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50">
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
                      <h4 className="text-sm font-semibold text-gray-700">Common Uses:</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {product.uses.map((use, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                            {use}
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
                          <span className="text-2xl font-bold text-blue-600">
                            ${product.price}
                          </span>
                          <span className="text-lg text-gray-400 line-through">
                            ${product.originalPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
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

        {/* How It Works */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-700">How Homeopathy Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">The Process</h3>
                <ol className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
                    Detailed consultation to understand your unique symptoms
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
                    Selection of the most similar remedy based on symptom matching
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
                    Administration of highly diluted remedy
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">4</span>
                    Body's healing response is stimulated naturally
                  </li>
                </ol>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Conditions Treated</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Allergies
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Anxiety
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Digestive issues
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Skin conditions
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Sleep disorders
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Respiratory issues
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Headaches
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Emotional trauma
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Experience Gentle Healing</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Discover how homeopathy can support your body's natural healing process. 
            Consult with our certified homeopaths to find the right remedy for you.
          </p>
          <div className="space-x-4">
            <Link to="/products?knowledge=Homeopathy">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Shop Homeopathic Remedies
              </Button>
            </Link>
            <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
              Find a Practitioner
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

export default Homeopathy;
