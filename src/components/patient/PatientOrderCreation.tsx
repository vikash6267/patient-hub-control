
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

interface InventoryItem {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface PatientOrderCreationProps {
  patientId: string;
}

const PatientOrderCreation: React.FC<PatientOrderCreationProps> = ({ patientId }) => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchInventoryItems();
  }, []);

  const fetchInventoryItems = async () => {
    try {
      const inventoryRef = collection(db, "inventory");
      const snapshot = await getDocs(inventoryRef);
      const items: InventoryItem[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as InventoryItem));
      setInventoryItems(items);
    } catch (error) {
      console.error("Error fetching inventory:", error);
      toast.error("Failed to load inventory items");
    } finally {
      setLoading(false);
    }
  };

  const addToOrder = (item: InventoryItem) => {
    const existingItem = orderItems.find(orderItem => orderItem.id === item.id);
    
    if (existingItem) {
      setOrderItems(prev => prev.map(orderItem => 
        orderItem.id === item.id 
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      ));
    } else {
      setOrderItems(prev => [...prev, {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1
      }]);
    }
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setOrderItems(prev => prev.filter(item => item.id !== itemId));
    } else {
      setOrderItems(prev => prev.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getTotalAmount = () => {
    return orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const createOrder = async () => {
    if (orderItems.length === 0) {
      toast.error("Please add items to your order");
      return;
    }

    try {
      const orderData = {
        patientId,
        items: orderItems,
        totalAmount: getTotalAmount(),
        status: "pending",
        createdAt: new Date().toISOString(),
        orderType: "patient"
      };

      const orderRef = doc(collection(db, "orders"));
      await setDoc(orderRef, orderData);

      toast.success("Order created successfully!");
      setOrderItems([]);
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order");
    }
  };

  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading inventory...</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Order from Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map(item => (
              <Card key={item.id} className="border">
                <CardContent className="p-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">${item.price}</span>
                    <Badge variant={item.stock > 0 ? "default" : "destructive"}>
                      Stock: {item.stock}
                    </Badge>
                  </div>
                  <Button 
                    onClick={() => addToOrder(item)}
                    disabled={item.stock === 0}
                    className="w-full mt-2"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add to Order
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {orderItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Current Order
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orderItems.map(item => (
                <div key={item.id} className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600">${item.price} each</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="font-medium">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    <span className="font-bold ml-4">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
              
              <div className="border-t pt-3 flex justify-between items-center">
                <span className="text-lg font-bold">
                  Total: ${getTotalAmount().toFixed(2)}
                </span>
                <Button onClick={createOrder}>
                  Create Order
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PatientOrderCreation;
