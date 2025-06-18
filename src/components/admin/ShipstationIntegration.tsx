
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Ship, Package, Truck, MapPin, Calendar, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ShipstationIntegration = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  const shipments = [
    {
      id: "SS-001",
      orderId: "ORD-12345",
      customer: "Sarah Johnson",
      carrier: "UPS",
      service: "Ground",
      trackingNumber: "1Z999AA1234567890",
      status: "in_transit",
      shipDate: "2024-05-20",
      estimatedDelivery: "2024-05-23"
    },
    {
      id: "SS-002",
      orderId: "ORD-12346",
      customer: "Mike Chen",
      carrier: "FedEx",
      service: "Express",
      trackingNumber: "1234567890",
      status: "delivered",
      shipDate: "2024-05-19",
      estimatedDelivery: "2024-05-21"
    },
    {
      id: "SS-003",
      orderId: "ORD-12347",
      customer: "Green Valley Pharmacy",
      carrier: "USPS",
      service: "Priority",
      trackingNumber: "9400111899562789456123",
      status: "pending",
      shipDate: "2024-05-21",
      estimatedDelivery: "2024-05-24"
    }
  ];

  const carriers = [
    { name: "UPS", shipments: 45, avgCost: 12.50 },
    { name: "FedEx", shipments: 32, avgCost: 15.75 },
    { name: "USPS", shipments: 28, avgCost: 8.25 },
    { name: "DHL", shipments: 12, avgCost: 18.90 }
  ];

  const handleConnect = () => {
    setIsConnected(true);
    toast({
      title: "Shipstation Connected",
      description: "Successfully connected to Shipstation API",
    });
  };

  const handleCreateLabel = (shipmentId: string) => {
    toast({
      title: "Label Created",
      description: `Shipping label created for ${shipmentId}`,
    });
  };

  const handleTrackShipment = (trackingNumber: string) => {
    toast({
      title: "Tracking Info",
      description: `Opening tracking for ${trackingNumber}`,
    });
  };

  const filteredShipments = shipments.filter(shipment =>
    shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Ship className="w-5 h-5" />
                Shipstation Integration
              </CardTitle>
              <CardDescription>
                Manage shipping, tracking, and logistics from your admin panel
              </CardDescription>
            </div>
            <Badge variant={isConnected ? "default" : "secondary"}>
              {isConnected ? "Connected" : "Disconnected"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {!isConnected ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="API Key" type="password" />
                <Input placeholder="API Secret" type="password" />
              </div>
              <Button onClick={handleConnect} className="w-full">
                Connect to Shipstation
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Shipments</p>
                      <p className="text-2xl font-bold">117</p>
                    </div>
                    <Package className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">In Transit</p>
                      <p className="text-2xl font-bold">23</p>
                    </div>
                    <Truck className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Delivered</p>
                      <p className="text-2xl font-bold">89</p>
                    </div>
                    <MapPin className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Avg. Cost</p>
                      <p className="text-2xl font-bold">$12.80</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {isConnected && (
        <Tabs defaultValue="shipments" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="shipments">Shipments</TabsTrigger>
            <TabsTrigger value="carriers">Carriers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="shipments">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Shipments</CardTitle>
                    <CardDescription>Track and manage all shipments</CardDescription>
                  </div>
                  <Button>
                    <Package className="w-4 h-4 mr-2" />
                    Create Shipment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="Search shipments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Shipment ID</TableHead>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Carrier</TableHead>
                          <TableHead>Tracking Number</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Ship Date</TableHead>
                          <TableHead>Est. Delivery</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredShipments.map((shipment) => (
                          <TableRow key={shipment.id}>
                            <TableCell className="font-medium">{shipment.id}</TableCell>
                            <TableCell>{shipment.orderId}</TableCell>
                            <TableCell>{shipment.customer}</TableCell>
                            <TableCell>{shipment.carrier} {shipment.service}</TableCell>
                            <TableCell className="font-mono text-xs">{shipment.trackingNumber}</TableCell>
                            <TableCell>
                              <Badge variant={
                                shipment.status === 'delivered' ? 'default' :
                                shipment.status === 'in_transit' ? 'secondary' : 'outline'
                              }>
                                {shipment.status.replace('_', ' ')}
                              </Badge>
                            </TableCell>
                            <TableCell>{shipment.shipDate}</TableCell>
                            <TableCell>{shipment.estimatedDelivery}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleTrackShipment(shipment.trackingNumber)}
                                >
                                  Track
                                </Button>
                                {shipment.status === 'pending' && (
                                  <Button 
                                    size="sm"
                                    onClick={() => handleCreateLabel(shipment.id)}
                                  >
                                    Create Label
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="carriers">
            <Card>
              <CardHeader>
                <CardTitle>Carrier Performance</CardTitle>
                <CardDescription>Compare shipping carriers and costs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {carriers.map((carrier) => (
                    <Card key={carrier.name} className="border">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{carrier.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div>
                            <span className="text-sm text-gray-600">Shipments:</span>
                            <p className="text-xl font-bold">{carrier.shipments}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">Avg Cost:</span>
                            <p className="text-xl font-bold">${carrier.avgCost}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-4">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Analytics</CardTitle>
                <CardDescription>Track shipping performance and costs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Shipping analytics dashboard coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ShipstationIntegration;
