
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, ShoppingCart, BarChart3 } from "lucide-react";
import WholesaleClientManagement from "@/components/wholesale/WholesaleClientManagement";
import WholesaleOrderCreation from "@/components/wholesale/WholesaleOrderCreation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Wholesale = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Wholesale Management</h1>
          <p className="text-gray-600">Manage wholesale clients and bulk orders</p>
        </div>

        <Tabs defaultValue="clients" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="clients" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Clients
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Create Order
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clients">
            <WholesaleClientManagement />
          </TabsContent>

          <TabsContent value="orders">
            <WholesaleOrderCreation />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Wholesale Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  Analytics dashboard coming soon...
                  <br />
                  <span className="text-sm">Track wholesale sales, client performance, and revenue</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Wholesale;
