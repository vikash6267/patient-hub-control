
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, TrendingUp, Package, DollarSign } from 'lucide-react';

const Wholesale = () => {
  const wholesaleOrders = [
    {
      id: 'WS001',
      client: 'City Hospital',
      items: 15,
      total: 2500.00,
      status: 'Pending',
      date: '2024-01-20'
    },
    {
      id: 'WS002',
      client: 'Metro Clinic',
      items: 8,
      total: 1200.00,
      status: 'Shipped',
      date: '2024-01-18'
    },
    {
      id: 'WS003',
      client: 'Healthcare Center',
      items: 25,
      total: 4500.00,
      status: 'Delivered',
      date: '2024-01-15'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Wholesale Management</h1>
          <p className="text-gray-600 mt-2">Manage bulk orders and wholesale clients</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          New Wholesale Order
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Clients</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <Building2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$45,280</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Growth</p>
                <p className="text-2xl font-bold text-gray-900">+18%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Wholesale Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {wholesaleOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{order.client}</h3>
                    <p className="text-sm text-gray-600">Order #{order.id} • {order.items} items</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">{order.date}</p>
                  </div>
                  <Badge variant={
                    order.status === 'Delivered' ? 'default' :
                    order.status === 'Shipped' ? 'secondary' :
                    'destructive'
                  }>
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Wholesale;
