
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, ShoppingCart, User, CheckCircle, ArrowLeft, Leaf, Truck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGuestCheckout, setIsGuestCheckout] = useState(false);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: ""
  });

  const { toast } = useToast();
  const { cartItems, getTotalPrice, setShippingInfo, setGuestCheckout, createOrder } = useCart();
  const navigate = useNavigate();

  const subtotal = getTotalPrice();
  const getShippingCost = () => {
    if (subtotal === 0) return 0;
    switch (shippingMethod) {
      case 'express': return 19.99;
      case 'overnight': return 39.99;
      default: return 9.99;
    }
  };
  const shipping = getShippingCost();
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add some items to your cart before proceeding to payment.",
        variant: "destructive"
      });
      return;
    }

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required shipping information.",
        variant: "destructive"
      });
      return;
    }

    if (paymentMethod === "card") {
      const cardFields = ['cardNumber', 'expiry', 'cvv', 'cardName'];
      const missingCardFields = cardFields.filter(field => !formData[field as keyof typeof formData]);
      
      if (missingCardFields.length > 0) {
        toast({
          title: "Missing Payment Information",
          description: "Please fill in all required card information.",
          variant: "destructive"
        });
        return;
      }
    }

    setIsProcessing(true);
    
    // Set shipping info and guest checkout status
    setShippingInfo({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      shippingMethod: shippingMethod as 'standard' | 'express' | 'overnight'
    });
    
    setGuestCheckout(isGuestCheckout);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Create order and redirect to confirmation
      createOrder(paymentMethod);
      
      toast({
        title: "Payment Successful!",
        description: "Your order has been processed and will be shipped soon.",
      });
      
      navigate("/order-confirmation");
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some herbal products to your cart to proceed with payment.</p>
          <Link to="/products">
            <Button className="bg-green-600 hover:bg-green-700">
              <Leaf className="w-4 h-4 mr-2" />
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-2xl font-bold text-blue-600">HealthMart</Link>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Secure Checkout
              </Badge>
            </div>
            <Link to="/cart">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Cart
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Secure Checkout</h1>
          <p className="text-gray-600">Complete your purchase safely and securely</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Guest Checkout Option */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Account Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="guest-checkout" 
                    checked={isGuestCheckout}
                    onCheckedChange={(checked) => setIsGuestCheckout(checked === true)}
                  />
                  <Label htmlFor="guest-checkout">Continue as guest (no account required)</Label>
                </div>
                {!isGuestCheckout && (
                  <p className="text-sm text-gray-600 mt-2">
                    Create an account to track orders and save preferences
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  {isGuestCheckout ? "Contact Information" : "Customer Information"}
                </CardTitle>
                <CardDescription>Enter your billing and shipping details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input 
                      id="firstName" 
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="John" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input 
                      id="lastName" 
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Smith" 
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john@example.com" 
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(555) 123-4567" 
                  />
                </div>
                <div>
                  <Label htmlFor="address">Street Address *</Label>
                  <Input 
                    id="address" 
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="123 Main St" 
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input 
                      id="city" 
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="New York" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ny">New York</SelectItem>
                        <SelectItem value="ca">California</SelectItem>
                        <SelectItem value="tx">Texas</SelectItem>
                        <SelectItem value="fl">Florida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP Code *</Label>
                    <Input 
                      id="zip" 
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      placeholder="10001" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Method */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  Shipping Method
                </CardTitle>
                <CardDescription>Choose your preferred delivery option</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Standard Shipping</p>
                          <p className="text-sm text-gray-600">5-7 business days</p>
                        </div>
                        <span className="font-medium">$9.99</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Express Shipping</p>
                          <p className="text-sm text-gray-600">2-3 business days</p>
                        </div>
                        <span className="font-medium">$19.99</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="overnight" id="overnight" />
                    <Label htmlFor="overnight" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Overnight Shipping</p>
                          <p className="text-sm text-gray-600">Next business day</p>
                        </div>
                        <span className="font-medium">$39.99</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Method
                </CardTitle>
                <CardDescription>Choose your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={paymentMethod === "card" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("card")}
                    className="h-20 flex flex-col items-center justify-center"
                  >
                    <CreditCard className="w-6 h-6 mb-1" />
                    <span className="text-sm">Credit Card</span>
                  </Button>
                  <Button
                    variant={paymentMethod === "paypal" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("paypal")}
                    className="h-20 flex flex-col items-center justify-center"
                  >
                    <div className="w-6 h-6 bg-blue-600 rounded mb-1"></div>
                    <span className="text-sm">PayPal</span>
                  </Button>
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-4 mt-6">
                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input 
                        id="cardNumber" 
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        placeholder="1234 5678 9012 3456" 
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="expiry">Expiry Date *</Label>
                        <Input 
                          id="expiry" 
                          value={formData.expiry}
                          onChange={(e) => handleInputChange('expiry', e.target.value)}
                          placeholder="MM/YY" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input 
                          id="cvv" 
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          placeholder="123" 
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName">Name on Card *</Label>
                      <Input 
                        id="cardName" 
                        value={formData.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                        placeholder="John Smith" 
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="border-0 shadow-md sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                      <Leaf className="w-8 h-8 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping ({shippingMethod})</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 mt-6" 
                  size="lg"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    "Processing..."
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Complete Purchase
                    </>
                  )}
                </Button>

                <div className="text-center mt-4">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>256-bit SSL encryption</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Your payment information is secure and encrypted
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
