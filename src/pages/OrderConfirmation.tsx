
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Package, Truck, Calendar, MapPin, CreditCard, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const OrderConfirmation = () => {
  const { lastOrder, clearCart } = useCart();

  useEffect(() => {
    // Clear cart after order confirmation
    if (lastOrder) {
      clearCart();
    }
  }, [lastOrder, clearCart]);

  if (!lastOrder) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No order found</h2>
          <p className="text-gray-600 mb-6">Please complete your purchase first.</p>
          <Link to="/products">
            <Button className="bg-green-600 hover:bg-green-700">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + (lastOrder.shippingInfo.shippingMethod === 'overnight' ? 1 : lastOrder.shippingInfo.shippingMethod === 'express' ? 3 : 7));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-2xl font-bold text-blue-600">HealthMart</Link>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Order Confirmed
              </Badge>
            </div>
            <Link to="/">
              <Button variant="outline" size="sm">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-4">Thank you for your purchase. Your order has been successfully placed.</p>
          <div className="bg-white rounded-lg p-4 border border-green-200 inline-block">
            <p className="text-sm text-gray-600">Order Number</p>
            <p className="text-lg font-bold text-green-600">{lastOrder.orderId}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Order Details */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {lastOrder.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-green-500" />
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
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${lastOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${lastOrder.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${lastOrder.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>${lastOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping & Payment Info */}
          <div className="space-y-6">
            {/* Shipping Information */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">{lastOrder.shippingInfo.firstName} {lastOrder.shippingInfo.lastName}</p>
                  <p className="text-gray-600">{lastOrder.shippingInfo.address}</p>
                  <p className="text-gray-600">{lastOrder.shippingInfo.city}, {lastOrder.shippingInfo.state} {lastOrder.shippingInfo.zipCode}</p>
                  <p className="text-gray-600">{lastOrder.shippingInfo.email}</p>
                  <p className="text-gray-600">{lastOrder.shippingInfo.phone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Shipping Method</span>
                    <Badge variant="outline" className="capitalize">
                      {lastOrder.shippingInfo.shippingMethod}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Estimated Delivery</span>
                    <span className="font-medium">{estimatedDelivery.toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span>Payment Method</span>
                  <span className="font-medium capitalize">{lastOrder.paymentMethod}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* What's Next */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-medium mb-2">Processing</h3>
                <p className="text-sm text-gray-600">We're preparing your order for shipment</p>
              </div>
              <div className="text-center p-4">
                <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Truck className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="font-medium mb-2">Shipping</h3>
                <p className="text-sm text-gray-600">Your order will be shipped within 1-2 business days</p>
              </div>
              <div className="text-center p-4">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-medium mb-2">Delivery</h3>
                <p className="text-sm text-gray-600">Enjoy your herbal supplements!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link to="/products">
            <Button variant="outline" size="lg">
              <Leaf className="w-5 h-5 mr-2" />
              Continue Shopping
            </Button>
          </Link>
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            Track Your Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
