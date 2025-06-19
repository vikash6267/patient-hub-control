import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, ShoppingCart, Package } from "lucide-react";
import { toast } from "react-toastify";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

interface WholesaleClient {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  creditLimit: number;
  paymentTerms: string;
}

interface InventoryItem {
  id: string;
  name: string;
  price: number;
  wholesalePrice: number;
  stock: number;
  category: string;
  description: string;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

const WholesaleOrderCreation: React.FC = () => {
  const [clients, setClients] = useState<WholesaleClient[]>([]);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderNotes, setOrderNotes] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch clients
      const clientsRef = collection(db, "wholesaleClients");
      const clientsSnapshot = await getDocs(clientsRef);
      const clientsData: WholesaleClient[] = clientsSnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as WholesaleClient)
      );
      setClients(clientsData);

      // Fetch inventory
      const inventoryRef = collection(db, "products");
      const inventorySnapshot = await getDocs(inventoryRef);
      const inventoryData: InventoryItem[] = inventorySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            wholesalePrice: doc.data().price * 0.7, // 30% discount for wholesale
            ...doc.data(),
          } as InventoryItem)
      );
      setInventoryItems(inventoryData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const addToOrder = (item: InventoryItem) => {
    const existingItem = orderItems.find(
      (orderItem) => orderItem.id === item.id
    );

    if (existingItem) {
      updateQuantity(item.id, existingItem.quantity + 1);
    } else {
      const newOrderItem: OrderItem = {
        id: item.id,
        name: item.name,
        price: item.wholesalePrice,
        quantity: 1,
        subtotal: item.wholesalePrice,
      };
      setOrderItems((prev) => [...prev, newOrderItem]);
    }
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setOrderItems((prev) => prev.filter((item) => item.id !== itemId));
    } else {
      setOrderItems((prev) =>
        prev.map((item) =>
          item.id === itemId
            ? {
                ...item,
                quantity: newQuantity,
                subtotal: item.price * newQuantity,
              }
            : item
        )
      );
    }
  };

  const getTotalAmount = () => {
    return orderItems.reduce((total, item) => total + item.subtotal, 0);
  };

  const createWholesaleOrder = async () => {
    if (!selectedClient) {
      toast.error("Please select a client");
      return;
    }

    if (orderItems.length === 0) {
      toast.error("Please add items to the order");
      return;
    }

    try {
      const selectedClientData = clients.find((c) => c.id === selectedClient);
      const orderData = {
        clientId: selectedClient,
        clientName: selectedClientData?.companyName,
        contactPerson: selectedClientData?.contactPerson,
        items: orderItems,
        totalAmount: getTotalAmount(),
        status: "pending",
        orderType: "wholesale",
        notes: orderNotes,
        paymentTerms: selectedClientData?.paymentTerms,
        createdAt: new Date().toISOString(),
        orderNumber: `WO-${Date.now()}`,
      };

      const orderRef = doc(collection(db, "wholesaleOrders"));
      await setDoc(orderRef, orderData);

      toast.success("Wholesale order created successfully!");

      // Reset form
      setSelectedClient("");
      setOrderItems([]);
      setOrderNotes("");
    } catch (error) {
      console.error("Error creating wholesale order:", error);
      toast.error("Failed to create order");
    }
  };

  const filteredItems = inventoryItems.filter(
    (item) =>
      item.mfgName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedClientData = clients.find((c) => c.id === selectedClient);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Create Wholesale Order</h2>
          <p className="text-gray-600">
            Create orders for wholesale clients with discounted pricing
          </p>
        </div>
      </div>

      {/* Client Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Client</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a wholesale client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.companyName} - {client.contactPerson}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedClientData && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Client Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p>
                      <strong>Company:</strong> {selectedClientData.companyName}
                    </p>
                    <p>
                      <strong>Contact:</strong>{" "}
                      {selectedClientData.contactPerson}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Credit Limit:</strong> $
                      {selectedClientData.creditLimit?.toLocaleString()}
                    </p>
                    <p>
                      <strong>Payment Terms:</strong>{" "}
                      {selectedClientData.paymentTerms}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Product Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="w-5 h-5 mr-2" />
            Select Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="border">
                <CardContent className="p-4">
                  <h3 className="font-semibold">{item.mfgName}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {item.description}
                  </p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Retail Price:</span>
                      <span className="line-through text-gray-500">
                        ${item?.cost}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">
                        Wholesale Price (10% off):
                      </span>
                      <span className="font-bold text-green-600">
                        ${(item?.cost ? item?.cost * 0.9 : 0).toFixed(2)}
                      </span>
                    </div>
                    {/* <div className="flex justify-between">
                      <span className="font-medium">Wholesale Price:</span>
                      <span className="font-bold text-green-600">
                        ${item.wholesalePrice?.toFixed(2)}
                      </span>
                    </div> */}
                    <Badge
                      variant={item.inStock > 0 ? "default" : "destructive"}
                    >
                      Stock: {item.inStock}
                    </Badge>
                    <Badge
                      className="ml-2"
                      variant={item.extStock > 0 ? "default" : "destructive"}
                    >
                      Extra Stock: {item.extStock}
                    </Badge>
                  </div>
                  <Button
                    onClick={() => addToOrder(item)}
                    disabled={item.inStock === 0 || !selectedClient}
                    className="w-full mt-3"
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

      {/* Order Summary */}
      {orderItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-3 border rounded"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <span className="font-bold w-20 text-right">
                      ${item.subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="orderNotes">Order Notes (Optional)</Label>
                  <Input
                    id="orderNotes"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Special instructions, delivery notes, etc."
                  />
                </div>

                <div className="border-t pt-4 flex justify-between items-center">
                  <div className="text-right">
                    <p className="text-lg">
                      <span className="font-medium">Total Items: </span>
                      {orderItems.reduce((sum, item) => sum + item.quantity, 0)}
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      Total: ${getTotalAmount().toFixed(2)}
                    </p>
                  </div>
                  <Button onClick={createWholesaleOrder} size="lg">
                    Create Wholesale Order
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WholesaleOrderCreation;
