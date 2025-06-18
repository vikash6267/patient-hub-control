import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  User,
  Search,
  Star,
  Heart,
  Menu,
  Filter,
  Shield,
  Truck,
  Award,
  Users,
  ArrowRight,
  Play,
  ChevronLeft,
  ChevronRight,
  Leaf,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAccountModal from "@/components/UserAccountModal";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userModalMode, setUserModalMode] = useState<
    "login" | "register" | "account"
  >("login");

  const productTypes = [
    {
      name: "Herbal Tincture",
      image: "/placeholder.svg",
      active: true,
    },
    {
      name: "Herbal Capsule",
      image: "/placeholder.svg",
      active: false,
    },
    {
      name: "Essential Oil",
      image: "/placeholder.svg",
      active: false,
    },
    {
      name: "Herbal Tea",
      image: "/placeholder.svg",
      active: false,
    },
    {
      name: "Herbal Cream",
      image: "/placeholder.svg",
      active: false,
    },
  ];
  const trendingProducts = [
    {
      id: 1,
      name: "Premium Turmeric Extract",
      price: 24.99,
      originalPrice: 29.99,
      image: "/placeholder.svg",
      rating: 4.8,
      discount: "Sale",
      category: "Extract",
    },
    {
      id: 2,
      name: "Ashwagandha Capsules",
      price: 34.99,
      originalPrice: 44.99,
      image: "/placeholder.svg",
      rating: 4.9,
      discount: "Sale",
      category: "Capsules",
    },
    {
      id: 3,
      name: "Organic Hair Oil",
      price: 19.99,
      originalPrice: 24.99,
      image: "/placeholder.svg",
      rating: 4.7,
      discount: "Sale",
      category: "Hair Care",
    },
    {
      id: 4,
      name: "Herbal Hair Shampoo",
      price: 22.99,
      originalPrice: 27.99,
      image: "/placeholder.svg",
      rating: 4.6,
      discount: "Sale",
      category: "Hair Care",
    },
    {
      id: 5,
      name: "Morning Wellness Blend",
      price: 26.99,
      originalPrice: 31.99,
      image: "/placeholder.svg",
      rating: 4.8,
      discount: "Sale",
      category: "Blend",
    },
    {
      id: 6,
      name: "Immunity Booster Capsules",
      price: 39.99,
      originalPrice: 49.99,
      image: "/placeholder.svg",
      rating: 4.7,
      discount: "Sale",
      category: "Capsules",
    },
    {
      id: 7,
      name: "Advanced Herbal Formula",
      price: 44.99,
      originalPrice: 54.99,
      image: "/placeholder.svg",
      rating: 4.9,
      discount: "Sale",
      category: "Formula",
    },
    {
      id: 8,
      name: "Herbal Energy Gummies",
      price: 16.99,
      originalPrice: 21.99,
      image: "/placeholder.svg",
      rating: 4.8,
      discount: "Sale",
      category: "Gummies",
    },
  ];
  const reviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "Best Herbal Products I have Ever Used! The quality is amazing and the natural effects are exactly what I needed.",
      product: "Turmeric Extract 1000mg",
    },
    {
      name: "Mike Chen",
      rating: 5,
      text: "Best Selling Herbal Blend Ever! Helped me with my wellness routine tremendously.",
      product: "Morning Wellness Formula",
    },
  ];
  const articles = [
    {
      title:
        "The Ultimate Guide to Herbal Medicine: Everything You Need to Know",
      date: "Mar 15, 2024",
      image: "/placeholder.svg",
      category: "Education",
    },
    {
      title: "How to Choose the Right Herbal Product for Your Wellness Needs",
      date: "Mar 10, 2024",
      image: "/placeholder.svg",
      category: "Guide",
    },
    {
      title: "Herbal Remedies for Athletes: Performance and Recovery Benefits",
      date: "Mar 5, 2024",
      image: "/placeholder.svg",
      category: "Health",
    },
  ];

  const knowledgeSystems = [
    { name: "Ayurveda", description: "Ancient Indian holistic healing system" },
    { name: "Homeopathy", description: "Natural healing through micro-doses" },
    { name: "Naturopathy", description: "Body's natural healing abilities" },
    {
      name: "Bach Flower Remedies",
      description: "Emotional wellness through flower essences",
    },
    { name: "Aroma Therapy", description: "Healing through essential oils" },
    { name: "Music Therapy", description: "Therapeutic use of music" },
    {
      name: "Magnetic Therapy",
      description: "Healing through magnetic fields",
    },
  ];

  const shopCategories = [
    { name: "Anti-Inflammatory", description: "Natural inflammation relief" },
    { name: "Baby & Kids Products", description: "Safe products for children" },
    {
      name: "Bone & Joint Support",
      description: "Strengthen bones and joints",
    },
    { name: "Brain Health", description: "Cognitive and memory support" },
    {
      name: "CBD & HEMP products",
      description: "Premium CBD wellness products",
    },
    {
      name: "Energy & Stress Support",
      description: "Natural energy and stress relief",
    },
    {
      name: "Gut & Digestive Health",
      description: "Digestive wellness solutions",
    },
    {
      name: "Herbs & Natural remedies",
      description: "Traditional herbal medicine",
    },
    { name: "Homeopathy", description: "Homeopathic healing solutions" },
    { name: "Hormonal Health", description: "Balance your hormones naturally" },
    { name: "Immune Support", description: "Boost your immune system" },
    { name: "Liver Support", description: "Liver detox and health" },
    { name: "Men Wellness", description: "Men's health products" },
    {
      name: "Nutrition & Functional Foods",
      description: "Nutritional supplements",
    },
    { name: "Pain Relief", description: "Natural pain management" },
    { name: "Pet Health", description: "Natural health for pets" },
    { name: "Protein & Fitness", description: "Fitness and protein products" },
    {
      name: "Skin, Beauty & Personal Care",
      description: "Natural beauty solutions",
    },
    { name: "Vitality & Wellness", description: "Overall wellness products" },
    {
      name: "Vitamin-Minerals & Food Supplements",
      description: "Essential vitamins and minerals",
    },
    { name: "Weight Management", description: "Healthy weight solutions" },
    { name: "Women Wellness", description: "Women's health products" },
  ];
  const handleOpenUserModal = (mode: "login" | "register" | "account") => {
    setUserModalMode(mode);
    setUserModalOpen(true);
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Top Header Bar */}
      <div className="bg-green-600 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span>Free shipping on orders over $50</span>
            <span>•</span>
            <span>24/7 Customer Support</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>EN</span>
            <span>USD</span>
          </div>
        </div>
      </div>

      {/* Enhanced Main Header */}
      <header className="bg-white shadow-lg border-b sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Nutra Herb USA
                </h1>
                <p className="text-xs text-green-600 font-medium">
                  Natural Wellness Solutions
                </p>
              </div>
            </div>

            {/* Enhanced Mega Menu Navigation - Added Shop Categories */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="space-x-1">
                <NavigationMenuItem>
                  <Link
                    to="/"
                    className="text-green-600 font-semibold px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    Home
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-green-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200">
                    Shop Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[800px] p-8 bg-white rounded-xl shadow-2xl border-0">
                      <div className="mb-6">
                        <h3 className="font-bold text-xl text-gray-900 mb-2">
                          Shop by Category
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Find products by health category
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                        {shopCategories.map((category, index) => (
                          <NavigationMenuLink key={index} asChild>
                            <Link
                              to={`/products?category=${encodeURIComponent(
                                category.name.toLowerCase().replace(/\s+/g, "-")
                              )}`}
                              className="group flex flex-col p-3 hover:bg-green-50 rounded-lg cursor-pointer transition-all duration-200 border border-transparent hover:border-green-200"
                            >
                              <div className="font-semibold text-sm text-gray-900 group-hover:text-green-700 mb-1">
                                {category.name}
                              </div>
                              <div className="text-xs text-gray-600 group-hover:text-green-600">
                                {category.description}
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-green-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200">
                    Knowledge Systems
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[500px] p-8 bg-white rounded-xl shadow-2xl border-0">
                      <div className="mb-6">
                        <h3 className="font-bold text-xl text-gray-900 mb-2">
                          Alternative Medicine Systems
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Explore traditional healing wisdom
                        </p>
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        {knowledgeSystems.map((system, index) => (
                          <NavigationMenuLink key={index} asChild>
                            <Link
                              to={`/knowledge/${encodeURIComponent(
                                system.name.toLowerCase().replace(/\s+/g, "-")
                              )}`}
                              className="group flex flex-col p-4 hover:bg-green-50 rounded-xl cursor-pointer transition-all duration-200 border border-transparent hover:border-green-200"
                            >
                              <div className="font-semibold text-gray-900 group-hover:text-green-700 mb-1">
                                {system.name}
                              </div>
                              <div className="text-sm text-gray-600 group-hover:text-green-600">
                                {system.description}
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    to="/about"
                    className="text-gray-700 hover:text-green-600 font-medium cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  >
                    About
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    to="/blog"
                    className="text-gray-700 hover:text-green-600 font-medium cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  >
                    Blog
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    to="/contact"
                    className="text-gray-700 hover:text-green-600 font-medium cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  >
                    Contact
                  </Link>
                </NavigationMenuItem>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenUserModal("login")}
                  className="border-green-200 text-green-700 hover:bg-green-50"
                >
                  <User className="w-4 h-4 mr-2" />
                  Account
                </Button>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-green-50"
                  >
                    <Menu className="w-6 h-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mt-2 bg-white rounded-xl shadow-xl border-0">
                  <DropdownMenuItem className="hover:bg-green-50 rounded-lg">
                    <Link to="/" className="w-full font-medium">
                      Home
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-green-50 rounded-lg font-medium">
                    <Link to="/products" className="w-full">
                      Shop Categories
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-green-50 rounded-lg font-medium">
                    <Link to="/knowledge" className="w-full">
                      Knowledge Systems
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-green-50 rounded-lg font-medium">
                    <Link to="/about" className="w-full">
                      About
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-green-50 rounded-lg font-medium">
                    <Link to="/blog" className="w-full">
                      Blog
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-green-50 rounded-lg font-medium">
                    <Link to="/contact" className="w-full">
                      Contact
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenUserModal("login")}
                  className="border-green-200 text-green-700 hover:bg-green-50"
                >
                  <User className="w-4 h-4 mr-2" />
                  Account
                </Button>
              </DropdownMenu>
            </div>

            {/* Enhanced Header Actions */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-green-50 rounded-lg p-2"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-green-50 rounded-lg p-2"
              >
                <Heart className="w-5 h-5 text-gray-600" />
              </Button>
              {/* <Button
                variant="ghost"
                size="sm"
                className="hover:bg-green-50 rounded-lg p-2"
              >
                <User className="w-5 h-5 text-gray-600" />
              </Button> */}
              <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white flex items-center space-x-2 rounded-lg px-4 py-2 shadow-lg transition-all duration-200">
                <ShoppingCart className="w-4 h-4" />
                <span className="font-medium">0</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-lime-100 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Badge className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1">
                  25% Off
                </Badge>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Pure Natural Herbs
                <br />
                <span className="text-green-600">For Wellness</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Experience the power of nature with our premium herbal products
                crafted with traditional wisdom and modern science.
              </p>
              <div className="flex items-center space-x-4 mb-8">
                <Button className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
                  Shop Now
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 text-lg px-8 py-3"
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Video</span>
                </Button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>Lab Tested</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span>Free Shipping</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/placeholder.svg"
                  alt="Herbal Products"
                  className="w-full max-w-md mx-auto drop-shadow-2xl"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400 rounded-full opacity-20"></div>
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-green-400 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Types Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pick Your Product Type
            </h2>
            <p className="text-gray-600">
              Choose from our premium selection of herbal products
            </p>
          </div>
          <div className="flex justify-center space-x-8">
            {productTypes.map((type, index) => (
              <div
                key={index}
                className={`text-center cursor-pointer transition-all duration-300 ${
                  type.active
                    ? "transform -translate-y-2"
                    : "hover:transform hover:-translate-y-1"
                }`}
              >
                <div
                  className={`w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center ${
                    type.active
                      ? "bg-green-600"
                      : "bg-gray-100 hover:bg-green-100"
                  }`}
                >
                  <img
                    src={type.image}
                    alt={type.name}
                    className={`w-10 h-10 ${
                      type.active ? "filter brightness-0 invert" : ""
                    }`}
                  />
                </div>
                <p
                  className={`text-sm font-medium ${
                    type.active ? "text-green-600" : "text-gray-600"
                  }`}
                >
                  {type.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="/placeholder.svg"
                alt="Quality Assurance"
                className="w-full rounded-2xl shadow-xl"
              />
              <div className="absolute top-6 left-6 bg-white rounded-full p-4 shadow-lg">
                <Award className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                We Provide High Quality And Certified Herbal Products
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-600">
                    Third-party lab tested for purity
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-600">
                    Made from organically grown herbs
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-gray-600">
                    Traditional extraction methods for maximum potency
                  </span>
                </div>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Herbal Specialist Banner */}
      <section className="py-8 bg-gradient-to-r from-yellow-400 to-orange-400">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">
                  No.1 Herbal Specialist
                </h3>
                <p className="text-white/90 text-sm">
                  Trusted by thousands of wellness enthusiasts
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-bold text-2xl">500K+</p>
              <p className="text-white/90 text-sm">Happy Customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trending Herbal Products
            </h2>
            <p className="text-gray-600">
              Discover our most popular natural wellness products
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-white rounded-xl overflow-hidden"
              >
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-green-500 text-white text-xs px-2 py-1">
                      {product.discount}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-white/90 hover:bg-white"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="mb-2">
                    <Badge
                      variant="secondary"
                      className="text-xs bg-gray-100 text-gray-600"
                    >
                      {product.category}
                    </Badge>
                  </div>

                  <h4 className="font-semibold text-gray-900 mb-2 text-sm leading-tight">
                    {product.name}
                  </h4>

                  <div className="flex items-center space-x-1 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">
                      ({product.rating})
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-green-600">
                        ${product.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700 text-sm py-2">
                    <ShoppingCart className="w-3 h-3 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" className="px-8 py-3">
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* What Makes Different Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                What Makes HerbalLife Different?
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-sm mb-2">
                    Premium Quality
                  </h4>
                  <p className="text-xs text-gray-600">Lab tested for purity</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-sm mb-2">
                    Certified Organic
                  </h4>
                  <p className="text-xs text-gray-600">
                    All products are certified
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-sm mb-2">Expert Support</h4>
                  <p className="text-xs text-gray-600">Professional guidance</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Truck className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-sm mb-2">Fast Delivery</h4>
                  <p className="text-xs text-gray-600">
                    Quick and secure shipping
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/placeholder.svg"
                  alt="Herbal Products"
                  className="w-full rounded-2xl shadow-xl"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-400 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Brands Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Featured Popular Brands
            </h2>
          </div>
          <div className="flex justify-center items-center space-x-12 opacity-60">
            {[1, 2, 3, 4, 5, 6].map((brand) => (
              <div
                key={brand}
                className="w-20 h-12 bg-gray-200 rounded flex items-center justify-center"
              >
                <span className="text-gray-400 text-xs">Brand {brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Selling Products Section */}
      <section className="py-16 bg-green-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-lime-800"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Top Selling Herbal Products
              </h2>
              <div className="bg-yellow-400 text-gray-900 rounded-2xl p-6 mb-8">
                <div className="flex items-center space-x-4">
                  <img
                    src="/placeholder.svg"
                    alt="Herbal Extract"
                    className="w-16 h-16"
                  />
                  <div>
                    <h3 className="font-bold text-lg">
                      Premium Turmeric 1000mg
                    </h3>
                    <div className="flex items-center space-x-2 text-sm">
                      <span>★★★★★</span>
                      <span>4.9 (124 reviews)</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-2xl font-bold">$24.99</span>
                      <span className="line-through text-gray-600">$34.99</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button className="bg-white text-green-900 hover:bg-gray-100">
                Shop Now
              </Button>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg"
                alt="Top Selling Product"
                className="w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Customer Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="p-6 border-0 shadow-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <h5 className="font-bold text-lg mb-2">
                  {review.text.split("!")[0]}!
                </h5>
                <p className="text-gray-600 mb-3">
                  {review.text.split("!")[1]}
                </p>
                <Badge variant="secondary">{review.product}</Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Articles Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Recent Articles
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-video bg-gray-200">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-3 bg-green-100 text-green-800">
                    {article.category}
                  </Badge>
                  <h3 className="font-bold text-lg mb-3 leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{article.date}</p>
                  <Button
                    variant="ghost"
                    className="p-0 text-green-600 hover:text-green-700"
                  >
                    Read More <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button className="bg-green-600 hover:bg-green-700">
              View All Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Nutra Herb USA</h3>
              </div>
              <p className="text-green-100 mb-6">
                Your trusted source for premium herbal wellness products.
              </p>
              <div className="space-y-2 text-green-100">
                <p>📧 info@herballife.com</p>
                <p>📞 +1 (555) 123-4567</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-6">Quick Links</h4>
              <div className="space-y-3 text-green-100">
                <div className="hover:text-white cursor-pointer">About Us</div>
                <div className="hover:text-white cursor-pointer">Shop</div>
                <div className="hover:text-white cursor-pointer">Blog</div>
                <div className="hover:text-white cursor-pointer">Contact</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-6">Products</h4>
              <div className="space-y-3 text-green-100">
                <div className="hover:text-white cursor-pointer">
                  Herbal Extracts
                </div>
                <div className="hover:text-white cursor-pointer">
                  Essential Oils
                </div>
                <div className="hover:text-white cursor-pointer">
                  Herbal Teas
                </div>
                <div className="hover:text-white cursor-pointer">
                  Natural Creams
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-6">Support</h4>
              <div className="space-y-3 text-green-100">
                <div className="hover:text-white cursor-pointer">FAQ</div>
                <div className="hover:text-white cursor-pointer">Shipping</div>
                <div className="hover:text-white cursor-pointer">Returns</div>
                <div className="hover:text-white cursor-pointer">Privacy</div>
              </div>
            </div>
          </div>
          <div className="border-t border-green-800 mt-12 pt-8 text-center text-green-100">
            <p>&copy; 2024 HerbalLife. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <UserAccountModal
        isOpen={userModalOpen}
        onClose={() => setUserModalOpen(false)}
        mode={userModalMode}
      />
    </div>
  );
};
export default Index;
