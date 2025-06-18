
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Package, DollarSign, TrendingUp, Activity, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Patients',
      value: '1,234',
      change: '+12%',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Inventory Items',
      value: '856',
      change: '-3%',
      icon: Package,
      color: 'green'
    },
    {
      title: 'Monthly Revenue',
      value: '$45,678',
      change: '+18%',
      icon: DollarSign,
      color: 'purple'
    },
    {
      title: 'Growth Rate',
      value: '23.5%',
      change: '+5%',
      icon: TrendingUp,
      color: 'orange'
    }
  ];

  const recentActivities = [
    { id: 1, type: 'patient', message: 'New patient John Doe registered', time: '2 mins ago', status: 'success' },
    { id: 2, type: 'inventory', message: 'Low stock alert for Medicine X', time: '15 mins ago', status: 'warning' },
    { id: 3, type: 'payment', message: 'Payment of $150 received', time: '1 hour ago', status: 'success' },
    { id: 4, type: 'system', message: 'System backup completed', time: '2 hours ago', status: 'info' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your medical practice.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${
                      stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                    <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                  <div className={`p-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-100' :
                    activity.status === 'warning' ? 'bg-yellow-100' :
                    'bg-blue-100'
                  }`}>
                    {activity.status === 'success' ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : activity.status === 'warning' ? (
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    ) : (
                      <Clock className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <Users className="h-6 w-6 text-blue-600 mb-2" />
                <p className="font-medium text-gray-900">Add Patient</p>
                <p className="text-sm text-gray-600">Register new patient</p>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <Package className="h-6 w-6 text-green-600 mb-2" />
                <p className="font-medium text-gray-900">Add Inventory</p>
                <p className="text-sm text-gray-600">Add new medicine</p>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <DollarSign className="h-6 w-6 text-purple-600 mb-2" />
                <p className="font-medium text-gray-900">Process Payment</p>
                <p className="text-sm text-gray-600">Record transaction</p>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <TrendingUp className="h-6 w-6 text-orange-600 mb-2" />
                <p className="font-medium text-gray-900">View Reports</p>
                <p className="text-sm text-gray-600">Analytics & insights</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
