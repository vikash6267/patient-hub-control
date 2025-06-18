
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, TrendingUp, Users, DollarSign, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const WholesaleBusiness = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const wholesaleOrders = [
    {
      id: "WO-001",
      client: "Green Valley Pharmacy",
      products: "Chamomile Tea (100 units), Lavender Oil (50 units)",
      amount: 2450.00,
      status: "pending",
      orderDate: "2024-05-20",
      dueDate: "2024-05-25"
    },
    {
      id: "WO-002",
      client: "Natural Health Store",
      products: "Stress Relief Blend (200 units)",
      amount: 1800.00,
      status: "completed",
      orderDate: "2024-05-18",
      dueDate: "2024-05-23"
    },
    {
      id: "WO-003",
      client: "Wellness Center Co.",
      products: "Digestive Support Mix (150 units)",
      amount: 3200.00,
      status: "shipped",
      orderDate: "2024-05-15",
      dueDate: "2024-05-20"
    }
  ];

  const wholesaleClients = [
    {
      id: "1",
      name: "Green Valley Pharmacy",
      contact: "pharmacy@greenvalley.com",
      totalOrders: 15,
      totalSpent: 25000,
      status: "active",
      lastOrder: "2024-05-20"
    },
    {
      id: "2",
      name: "Natural Health Store",
      contact: "orders@naturalhealth.com",
      totalOrders: 22,
      totalSpent: 18500,
      status: "active",
      lastOrder: "2024-05-18"
    },
    {
      id: "3",
      name: "Wellness Center Co.",
      contact: "purchasing@wellnesscenter.com",
      totalOrders: 8,
      totalSpent: 12000,
      status: "inactive",
      lastOrder: "2024-04-10"
    }
  ];

  const handleProcessOrder = (orderId: string) => {
    toast({
      title: "Order Processed",
      description: `Order ${orderId} has been processed successfully.`,
    });
  };

  const filteredOrders = wholesaleOrders.filter(order =>
    order.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Wholesale Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {wholesaleOrders.filter(o => o.status === 'pending' || o.status === 'shipped').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${wholesaleOrders.reduce((sum, order) => sum + order.amount, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {wholesaleClients.filter(c => c.status === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">+18%</div>
          </CardContent>
        </Card>
      </div>

      {/* Wholesale Orders */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Wholesale Orders</CardTitle>
              <CardDescription>Manage wholesale orders and deliveries</CardDescription>
            </div>
            <Button>
              <Package className="w-4 h-4 mr-2" />
              New Order
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="relative mb-6">
            <Input
              placeholder="Search orders by client or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Orders Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.client}</TableCell>
                    <TableCell className="max-w-xs truncate">{order.products}</TableCell>
                    <TableCell>${order.amount.toLocaleString()}</TableCell>
                    <TableCell>{order.orderDate}</TableCell>
                    <TableCell>{order.dueDate}</TableCell>
                    <TableCell>
                      <Badge variant={
                        order.status === 'completed' ? 'default' :
                        order.status === 'shipped' ? 'secondary' : 'outline'
                      }>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        {order.status === 'pending' && (
                          <Button 
                            size="sm"
                            onClick={() => handleProcessOrder(order.id)}
                          >
                            Process
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Wholesale Clients */}
      <Card>
        <CardHeader>
          <CardTitle>Wholesale Clients</CardTitle>
          <CardDescription>Manage wholesale client relationships</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {wholesaleClients.map((client) => (
              <div key={client.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{client.name}</h3>
                    <p className="text-sm text-gray-600">{client.contact}</p>
                  </div>
                  <Badge variant={client.status === 'active' ? 'default' : 'secondary'}>
                    {client.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Total Orders:</span>
                    <p className="font-medium">{client.totalOrders}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Total Spent:</span>
                    <p className="font-medium">${client.totalSpent.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Last Order:</span>
                    <p className="font-medium">{client.lastOrder}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Status:</span>
                    <p className="font-medium capitalize">{client.status}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Order History
                  </Button>
                  <Button variant="outline" size="sm">
                    Create Order
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pricing Tiers */}
      <Card>
        <CardHeader>
          <CardTitle>Wholesale Pricing Tiers</CardTitle>
          <CardDescription>Manage volume-based pricing for wholesale clients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Bronze Tier</CardTitle>
                <p className="text-sm text-gray-600">Orders under $1,000</p>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">15% Discount</div>
                <p className="text-sm text-gray-600">Standard wholesale pricing for small volume orders</p>
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Silver Tier</CardTitle>
                <p className="text-sm text-gray-600">Orders $1,000 - $5,000</p>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">20% Discount</div>
                <p className="text-sm text-gray-600">Enhanced pricing for medium volume orders</p>
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Gold Tier</CardTitle>
                <p className="text-sm text-gray-600">Orders over $5,000</p>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">25% Discount</div>
                <p className="text-sm text-gray-600">Premium pricing for high volume orders</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WholesaleBusiness;
