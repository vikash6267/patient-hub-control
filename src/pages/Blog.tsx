import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, Tag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductsHeader from "@/components/ProductsHeader";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import UserAccountModal from "@/components/UserAccountModal";

const Blog = () => {
  const { totalItems } = useCart();
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userModalMode, setUserModalMode] = useState<"login" | "register" | "account">("login");

  const handleOpenUserModal = (mode: "login" | "register" | "account") => {
    setUserModalMode(mode);
    setUserModalOpen(true);
  };

  const blogPosts = [
    {
      id: 1,
      title: "The Science Behind Turmeric: Nature's Golden Healer",
      excerpt: "Discover the powerful anti-inflammatory properties of turmeric and how this ancient spice can support your modern wellness routine.",
      author: "Dr. Sarah Chen",
      date: "2024-06-05",
      category: "Ayurveda",
      readTime: "5 min read",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Homeopathic Remedies for Seasonal Allergies",
      excerpt: "Learn about gentle homeopathic solutions that can help manage seasonal allergies without harsh side effects.",
      author: "Dr. Michael Rodriguez",
      date: "2024-06-03",
      category: "Homeopathy", 
      readTime: "7 min read",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Building Immunity Naturally: A Naturopathic Approach",
      excerpt: "Explore natural ways to strengthen your immune system using herbs, nutrition, and lifestyle modifications.",
      author: "Dr. Emily Johnson",
      date: "2024-06-01",
      category: "Naturopathy",
      readTime: "6 min read",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Stress Management with Adaptogenic Herbs",
      excerpt: "Understanding how adaptogenic herbs like ashwagandha and rhodiola can help your body cope with daily stress.",
      author: "Dr. Sarah Chen",
      date: "2024-05-28",
      category: "Ayurveda",
      readTime: "8 min read",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      title: "The Art of Herbal Tea Blending",
      excerpt: "Master the ancient art of creating therapeutic herbal tea blends for specific health concerns and wellness goals.",
      author: "Dr. Robert Kim",
      date: "2024-05-25",
      category: "Naturopathy",
      readTime: "10 min read",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      title: "Digestive Health: Traditional Remedies for Modern Problems",
      excerpt: "Explore time-tested herbal solutions for common digestive issues using traditional medicine principles.",
      author: "Dr. Michael Rodriguez",
      date: "2024-05-22",
      category: "Homeopathy",
      readTime: "6 min read",
      image: "/placeholder.svg"
    }
  ];

  const categories = ["All", "Ayurveda", "Homeopathy", "Naturopathy"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <ProductsHeader totalItems={totalItems} onOpenUserModal={handleOpenUserModal} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-6">
            Wellness Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore the latest insights, research, and wisdom from the world of natural health 
            and herbal medicine. Our expert practitioners share their knowledge to help you 
            on your wellness journey.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-2 bg-white rounded-lg p-2 shadow-lg">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? "bg-green-600 hover:bg-green-700 text-white" 
                  : "text-gray-600 hover:text-green-600"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
              <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 rounded-t-lg"></div>
              <CardHeader>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                    {post.category}
                  </span>
                </div>
                <CardTitle className="text-xl group-hover:text-green-700 transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="w-4 h-4 mr-1" />
                    {post.author}
                  </div>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full mt-4 text-green-600 hover:text-green-700 hover:bg-green-50 group"
                >
                  Read More 
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-4">Stay Updated</CardTitle>
            <p className="text-xl opacity-90">
              Subscribe to our newsletter for the latest wellness tips, research, and exclusive offers.
            </p>
          </CardHeader>
          <CardContent className="text-center">
            <div className="max-w-md mx-auto flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg text-gray-900"
              />
              <Button variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <UserAccountModal
        isOpen={userModalOpen}
        onClose={() => setUserModalOpen(false)}
        mode={userModalMode}
      />
    </div>
  );
};

export default Blog;
