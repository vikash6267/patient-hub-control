import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import FilterPanel from "@/components/FilterPanel";
import ProductComparison from "@/components/ProductComparison";
import RecentlyViewed from "@/components/RecentlyViewed";
import MobileFilterDrawer from "@/components/MobileFilterDrawer";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import ProductCard from "@/components/ProductCard";
import KnowledgeSystemsGrid from "@/components/KnowledgeSystemsGrid";
import ProductsHeader from "@/components/ProductsHeader";
import UserAccountModal from "@/components/UserAccountModal";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [selectedConcern, setSelectedConcern] = useState("all");
  const [selectedKnowledgeSystem, setSelectedKnowledgeSystem] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userModalMode, setUserModalMode] = useState<"login" | "register" | "account">("login");
  const [compareProducts, setCompareProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, getTotalItems } = useCart();
  const { toast } = useToast();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products", current: true }
  ];

  // Knowledge Systems
  const knowledgeSystems = [
    { name: "Ayurveda", description: "Ancient Indian healing system", color: "bg-orange-100 text-orange-700" },
    { name: "Homeopathy", description: "Like cures like principle", color: "bg-blue-100 text-blue-700" },
    { name: "Naturopathy", description: "Natural healing methods", color: "bg-green-100 text-green-700" },
    { name: "Bach Flower Remedies", description: "Emotional healing with flowers", color: "bg-purple-100 text-purple-700" },
    { name: "Aromatherapy", description: "Essential oil healing", color: "bg-pink-100 text-pink-700" },
    { name: "Music Therapy", description: "Healing through sound", color: "bg-indigo-100 text-indigo-700" },
    { name: "Magnetic Therapy", description: "Magnetic field healing", color: "bg-gray-100 text-gray-700" }
  ];

  // Shop by Concern categories
  const shopByConcern = [
    "Aches and Pains", "Allergy/Sinus", "Blood Sugar Support", "Bone Health",
    "Brain Support", "Cardiovascular Support", "Digestion Support", "Energy",
    "Gastrointestinal", "General Health", "Hormonal Health", "Hormone Support",
    "Immune System", "Men Health", "Menopause Support", "Sexual Health",
    "Sleep Support", "Vitality & Wellness", "Weight Management", "Women's Health"
  ];

  // Enhanced Shop Categories with subcategories
  const shopCategories = [
    { 
      name: "Anti-Inflammatory", 
      subcategories: [] 
    },
    { 
      name: "Baby & Kids Products", 
      subcategories: [] 
    },
    { 
      name: "Bone & Joint Support", 
      subcategories: ["Jointo", "Collagen15X", "Collagen950"] 
    },
    { 
      name: "Brain Health", 
      subcategories: ["Brain & Memory Support"] 
    },
    { 
      name: "CBD & HEMP products", 
      subcategories: ["CBD Oil", "Broad Spectrum", "Pain Relief"] 
    },
    { 
      name: "Energy & Stress Support", 
      subcategories: ["Stress Support"] 
    },
    { 
      name: "Gut & Digestive Health", 
      subcategories: ["Digestion", "Cleanse & Detox"] 
    },
    { 
      name: "Herbs & Natural remedies", 
      subcategories: ["Ayurvedic Formulas", "Homeopathic Formulas"] 
    },
    { 
      name: "Homeopathy", 
      subcategories: ["Cold Relief", "Pain Relief", "Restful Sleep"] 
    },
    { 
      name: "Hormonal Health", 
      subcategories: ["Hormone Balancing"] 
    },
    { 
      name: "Immune Support", 
      subcategories: ["Herbs & Natural remedies"] 
    },
    { 
      name: "Liver Support", 
      subcategories: [] 
    },
    { 
      name: "Men Wellness", 
      subcategories: [] 
    },
    { 
      name: "Nutrition & Functional Foods", 
      subcategories: ["Trace Mineral Drops", "Fulvic Acid", "Cordyceps-Mushroom", "Hormone Balancing Super Foods", "Leg Cramps PM"] 
    },
    { 
      name: "Pain Relief", 
      subcategories: ["Infla Pet Pain"] 
    },
    { 
      name: "Pet Health", 
      subcategories: ["Joint Health", "Anti-Inflammatory"] 
    },
    { 
      name: "Protein & Fitness", 
      subcategories: [] 
    },
    { 
      name: "Skin, Beauty & Personal Care", 
      subcategories: ["Anti-Aging", "Hair Care", "Oral Health", "Collagen"] 
    },
    { 
      name: "Vitality & Wellness", 
      subcategories: ["Collagen"] 
    },
    { 
      name: "Vitamin-Minerals & Food Supplements", 
      subcategories: ["Digestion", "Joint Health", "Immune Support", "Heart Support", "Minerals"] 
    },
    { 
      name: "Weight Management", 
      subcategories: [] 
    },
    { 
      name: "Women Wellness", 
      subcategories: [] 
    }
  ];

  // Enhanced product list with subcategories and detailed unit information
  const products = [
    {
      id: 1,
      name: "Ashwagandha Root Extract for Relaxation & Stress Relief",
      price: 29.99,
      originalPrice: 39.99,
      category: "Energy & Stress Support",
      subcategory: "Stress Support",
      concern: "Energy",
      knowledgeSystem: "Ayurveda",
      inStock: 25,
      description: "Premium organic ashwagandha for stress relief and vitality",
      supplier: "Himalayan Herbs",
      rating: 4.8,
      reviews: 156,
      isOrganic: true,
      form: "Capsules",
      unitSize: "60 capsules"
    },
    {
      id: 2,
      name: "Turmeric Curcumin for Energy & Vitality",
      price: 24.99,
      originalPrice: 34.99,
      category: "Anti-Inflammatory",
      subcategory: "",
      concern: "Aches and Pains",
      knowledgeSystem: "Ayurveda",
      inStock: 45,
      description: "High-potency turmeric with black pepper extract",
      supplier: "Golden Spice Co.",
      rating: 4.9,
      reviews: 203,
      isOrganic: true,
      form: "Tablets",
      unitSize: "90 tablets"
    },
    {
      id: 3,
      name: "Collagen15X Advanced Formula",
      price: 49.99,
      originalPrice: 67.99,
      category: "Bone & Joint Support",
      subcategory: "Collagen15X",
      concern: "Bone Health",
      knowledgeSystem: "Naturopathy",
      inStock: 30,
      description: "Advanced collagen formula for joint and skin health",
      supplier: "Joint Care Pro",
      rating: 4.7,
      reviews: 189,
      isOrganic: false,
      form: "Powder",
      unitSize: "300 grams"
    },
    {
      id: 4,
      name: "Lavender Essential Oil NOW 1-oz",
      price: 16.99,
      originalPrice: 22.99,
      category: "Herbs & Natural remedies",
      subcategory: "Aromatherapy",
      concern: "Sleep Support",
      knowledgeSystem: "Aromatherapy",
      inStock: 18,
      description: "Pure lavender essential oil for relaxation and sleep",
      supplier: "Nature's Essence",
      rating: 4.8,
      reviews: 134,
      isOrganic: true,
      form: "Liquid",
      unitSize: "30 ml"
    },
    {
      id: 5,
      name: "CBD Oil 2000mg Peppermint",
      price: 89.99,
      originalPrice: 120.00,
      category: "CBD & HEMP products",
      subcategory: "CBD Oil",
      concern: "Pain Relief",
      knowledgeSystem: "Naturopathy",
      inStock: 12,
      description: "High-potency CBD oil with refreshing peppermint flavor",
      supplier: "Hemp Wellness",
      rating: 4.9,
      reviews: 98,
      isOrganic: true,
      form: "Liquid",
      unitSize: "60 ml"
    },
    {
      id: 6,
      name: "Trace Mineral Drops",
      price: 34.99,
      originalPrice: 44.99,
      category: "Nutrition & Functional Foods",
      subcategory: "Trace Mineral Drops",
      concern: "General Health",
      knowledgeSystem: "Naturopathy",
      inStock: 25,
      description: "Essential trace minerals for optimal health",
      supplier: "Mineral Pro",
      rating: 4.6,
      reviews: 167,
      isOrganic: true,
      form: "Liquid",
      unitSize: "120 ml"
    },
    {
      id: 7,
      name: "Joint Health Formula for Pets",
      price: 28.99,
      originalPrice: 38.99,
      category: "Pet Health",
      subcategory: "Joint Health",
      concern: "Pet Care",
      knowledgeSystem: "Naturopathy",
      inStock: 15,
      description: "Natural joint support formula for dogs and cats",
      supplier: "Pet Wellness Co.",
      rating: 4.8,
      reviews: 89,
      isOrganic: true,
      form: "Capsules",
      unitSize: "45 capsules"
    },
    {
      id: 8,
      name: "Brain & Memory Support Complex",
      price: 42.99,
      originalPrice: 54.99,
      category: "Brain Health",
      subcategory: "Brain & Memory Support",
      concern: "Brain Support",
      knowledgeSystem: "Naturopathy",
      inStock: 20,
      description: "Comprehensive brain health and memory enhancement formula",
      supplier: "Mind Health Labs",
      rating: 4.7,
      reviews: 145,
      isOrganic: false,
      form: "Capsules",
      unitSize: "120 capsules"
    }
  ];

  const allCategories = ["all", ...shopCategories.map(cat => cat.name)];
  const allConcerns = ["all", ...shopByConcern];

  // Get subcategories for selected category
  const availableSubcategories = selectedCategory === "all" 
    ? [] 
    : shopCategories.find(cat => cat.name === selectedCategory)?.subcategories || [];

  const filteredProducts = products.filter(product => 
    (selectedCategory === "all" || product.category === selectedCategory) &&
    (selectedSubcategory === "all" || product.subcategory === selectedSubcategory) &&
    (selectedConcern === "all" || product.concern === selectedConcern) &&
    (selectedKnowledgeSystem === "all" || product.knowledgeSystem === selectedKnowledgeSystem) &&
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "stock":
        return b.inStock - a.inStock;
      case "rating":
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const openUserModal = (mode: "login" | "register" | "account") => {
    setUserModalMode(mode);
    setUserModalOpen(true);
  };

  const handleCompareProduct = (product: any) => {
    if (compareProducts.find(p => p.id === product.id)) {
      toast({
        title: "Already in Comparison",
        description: "This product is already in your comparison list."
      });
      return;
    }

    if (compareProducts.length >= 3) {
      toast({
        title: "Comparison Limit Reached",
        description: "You can compare up to 3 products at a time.",
        variant: "destructive"
      });
      return;
    }

    setCompareProducts(prev => [...prev, product]);
    toast({
      title: "Added to Comparison",
      description: `${product.name} has been added to comparison.`
    });
  };

  const removeFromComparison = (productId: number) => {
    setCompareProducts(prev => prev.filter(p => p.id !== productId));
  };

  const clearComparison = () => {
    setCompareProducts([]);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedSubcategory("all");
    setSelectedConcern("all");
    setSelectedKnowledgeSystem("all");
    setSortBy("name");
  };

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    // Simulate retry logic
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Show error state if there's an error
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <ErrorState 
          title="Failed to load products"
          message={error}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <ProductsHeader 
        totalItems={getTotalItems()} 
        onOpenUserModal={openUserModal}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <BreadcrumbNav items={breadcrumbItems} />

        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Online Vitamin Shop</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover nature's finest remedies through various healing systems and comprehensive wellness solutions
          </p>
        </div>

        {/* Knowledge Systems */}
        <KnowledgeSystemsGrid knowledgeSystems={knowledgeSystems} />

        {/* Recently Viewed Products */}
        <div className="mb-8">
          <RecentlyViewed />
        </div>

        {/* Product Comparison */}
        {compareProducts.length > 0 && (
          <div className="mb-8">
            <ProductComparison
              products={compareProducts}
              onRemoveProduct={removeFromComparison}
              onClearAll={clearComparison}
            />
          </div>
        )}

        {/* Mobile and Desktop Filters */}
        <div className="mb-8">
          {/* Mobile Filter */}
          <div className="md:hidden mb-4">
            <MobileFilterDrawer
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedSubcategory={selectedSubcategory}
              onSubcategoryChange={setSelectedSubcategory}
              selectedConcern={selectedConcern}
              onConcernChange={setSelectedConcern}
              selectedKnowledgeSystem={selectedKnowledgeSystem}
              onKnowledgeSystemChange={setSelectedKnowledgeSystem}
              sortBy={sortBy}
              onSortChange={setSortBy}
              allCategories={allCategories}
              availableSubcategories={availableSubcategories}
              allConcerns={allConcerns}
              knowledgeSystems={knowledgeSystems}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Desktop Filter */}
          <div className="hidden md:block">
            <FilterPanel
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSearch={handleSearch}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedSubcategory={selectedSubcategory}
              onSubcategoryChange={setSelectedSubcategory}
              selectedConcern={selectedConcern}
              onConcernChange={setSelectedConcern}
              sortBy={sortBy}
              onSortChange={setSortBy}
              allCategories={allCategories}
              availableSubcategories={availableSubcategories}
              allConcerns={allConcerns}
              knowledgeSystems={knowledgeSystems}
              selectedKnowledgeSystem={selectedKnowledgeSystem}
              onKnowledgeSystemChange={setSelectedKnowledgeSystem}
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 font-medium">
            Showing {filteredProducts.length} of {products.length} products
            {selectedCategory !== "all" && ` in ${selectedCategory}`}
            {selectedSubcategory !== "all" && ` > ${selectedSubcategory}`}
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <LoadingState count={8} type="products" />
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onCompareProduct={handleCompareProduct}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Try adjusting your search or filter criteria to discover more natural remedies
                </p>
              </div>
            )}
          </>
        )}
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

export default Products;
