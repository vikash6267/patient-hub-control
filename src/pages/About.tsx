import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Heart, Users, Award, Globe, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import ProductsHeader from "@/components/ProductsHeader";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import UserAccountModal from "@/components/UserAccountModal";

const About = () => {
  const { totalItems } = useCart();
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userModalMode, setUserModalMode] = useState<"login" | "register" | "account">("login");

  const handleOpenUserModal = (mode: "login" | "register" | "account") => {
    setUserModalMode(mode);
    setUserModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <ProductsHeader totalItems={totalItems} onOpenUserModal={handleOpenUserModal} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-6">
            About Nutra Herb USA
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your trusted partner in natural health and wellness, providing authentic 
            herbal solutions backed by traditional wisdom and modern science.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="border-green-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-green-700">
                <Heart className="w-8 h-8 mr-3" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                To empower individuals on their journey to optimal health through 
                premium natural remedies, expert guidance, and personalized care. 
                We believe in the healing power of nature and strive to make 
                authentic herbal medicine accessible to everyone.
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-blue-700">
                <Globe className="w-8 h-8 mr-3" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                To be the leading destination for natural health solutions, 
                bridging ancient healing traditions with modern wellness needs. 
                We envision a world where everyone has access to safe, effective, 
                and natural healthcare alternatives.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-green-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Shield className="w-12 h-12 mx-auto text-green-600 mb-4" />
                <CardTitle className="text-xl text-green-700">Quality & Safety</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We source only the highest quality herbs and maintain strict 
                  quality control standards to ensure safety and efficacy.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Leaf className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                <CardTitle className="text-xl text-blue-700">Natural Healing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We honor traditional healing systems while embracing modern 
                  research to provide the best natural health solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Users className="w-12 h-12 mx-auto text-green-600 mb-4" />
                <CardTitle className="text-xl text-green-700">Patient Care</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Every customer is unique. We provide personalized guidance 
                  and support to help you achieve your health goals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Our Story */}
        <Card className="mb-16 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl text-center text-gray-800 mb-6">Our Story</CardTitle>
          </CardHeader>
          <CardContent className="text-lg text-gray-700 leading-relaxed space-y-4">
            <p>
              Founded with a passion for natural healing, Nutra Herb USA began as a small 
              family business dedicated to sharing the wisdom of traditional medicine. 
              Our founders, with backgrounds in Ayurveda, Homeopathy, and Naturopathy, 
              recognized the growing need for authentic, high-quality herbal remedies.
            </p>
            <p>
              Over the years, we've built strong relationships with trusted suppliers 
              worldwide, ensuring that our customers receive only the finest natural 
              products. Our team of experienced practitioners and wellness experts 
              continues to research and curate the most effective herbal solutions.
            </p>
            <p>
              Today, Nutra Herb USA serves thousands of customers across the country, 
              helping them discover the transformative power of natural medicine while 
              maintaining our commitment to quality, authenticity, and personalized care.
            </p>
          </CardContent>
        </Card>

        {/* Certifications */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Certifications</h2>
          <div className="flex justify-center items-center space-x-8 flex-wrap">
            <div className="flex items-center space-x-2 text-green-700">
              <Award className="w-8 h-8" />
              <span className="font-semibold">FDA Registered</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-700">
              <Award className="w-8 h-8" />
              <span className="font-semibold">GMP Certified</span>
            </div>
            <div className="flex items-center space-x-2 text-green-700">
              <Award className="w-8 h-8" />
              <span className="font-semibold">Organic Certified</span>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Start Your Wellness Journey?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Explore our extensive collection of natural remedies and discover the power of herbal medicine.
          </p>
          <div className="space-x-4">
            <Link to="/products">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                Shop Products
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg">
                Contact Us
              </Button>
            </Link>
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

export default About;
