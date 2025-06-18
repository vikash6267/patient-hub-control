import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Package, Users, MessageSquare, Megaphone, FileText, ShoppingCart, CreditCard, Calculator, BarChart3, Settings, Bell, TrendingUp, Leaf, LayoutDashboard, Phone, Ship } from "lucide-react";
import { Link } from "react-router-dom";
import InventoryManagement from "@/components/admin/InventoryManagement";
import PatientManagement from "@/components/admin/PatientManagement";
import CommunicationCenter from "@/components/admin/CommunicationCenter";
import MarketingTools from "@/components/admin/MarketingTools";
import FormManagement from "@/components/admin/FormManagement";
import DocumentCenter from "@/components/admin/DocumentCenter";
import WholesaleBusiness from "@/components/admin/WholesaleBusiness";
import PaymentGateway from "@/components/admin/PaymentGateway";
import AccountingModule from "@/components/admin/AccountingModule";
import RingCentralIntegration from "@/components/admin/RingCentralIntegration";
import ShipstationIntegration from "@/components/admin/ShipstationIntegration";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data for dashboard overview
  const dashboardStats = {
    totalPatients: 1247,
    activeOrders: 89,
    monthlyRevenue: 45650,
    pendingTasks: 12,
    lowStockItems: 8,
    newMessages: 15,
    wholesaleOrders: 23,
    paymentsPending: 7
  };
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Leaf className="w-8 h-8 text-green-600" />
                <span className="text-2xl font-bold text-green-700">Nutra Herb</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
                Home
              </Link>
              <Link to="/products" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
                Products
              </Link>
              <Link to="/patient-portal" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
                Patient Portal
              </Link>
              <Link to="/admin" className="text-green-600 font-medium border-b-2 border-green-600">
                Admin
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-500">
                  {dashboardStats.pendingTasks}
                </Badge>
              </Button>
              <div className="flex items-center space-x-2">
                <LayoutDashboard className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-700">Admin Panel</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Business Management Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete business management solution for your herbal practice - from inventory to patient care
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 lg:grid-cols-11 mb-8 bg-white shadow-sm">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Inventory</span>
            </TabsTrigger>
            <TabsTrigger value="patients" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Patients</span>
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Communication</span>
            </TabsTrigger>
            <TabsTrigger value="marketing" className="flex items-center gap-2">
              <Megaphone className="w-4 h-4" />
              <span className="hidden sm:inline">Marketing</span>
            </TabsTrigger>
            <TabsTrigger value="forms" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Forms</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Documents</span>
            </TabsTrigger>
            <TabsTrigger value="wholesale" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Wholesale</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Payments</span>
            </TabsTrigger>
            <TabsTrigger value="accounting" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              <span className="hidden sm:inline">Accounting</span>
            </TabsTrigger>
            <TabsTrigger value="shipping" className="flex items-center gap-2">
              <Ship className="w-4 h-4" />
              <span className="hidden sm:inline">Shipping</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Overview Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="border-0 shadow-md bg-white rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Patients</CardTitle>
                  <Users className="h-5 w-5 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{dashboardStats.totalPatients}</div>
                  <p className="text-xs text-blue-600 font-medium mt-1">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-white rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Active Orders</CardTitle>
                  <Package className="h-5 w-5 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{dashboardStats.activeOrders}</div>
                  <p className="text-xs text-green-600 font-medium mt-1">
                    +8% from yesterday
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-white rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Monthly Revenue</CardTitle>
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">${dashboardStats.monthlyRevenue}</div>
                  <p className="text-xs text-purple-600 font-medium mt-1">
                    +15% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-white rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Pending Tasks</CardTitle>
                  <Bell className="h-5 w-5 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{dashboardStats.pendingTasks}</div>
                  <p className="text-xs text-orange-600 font-medium mt-1">
                    Requires attention
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-white rounded-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Quick Actions</CardTitle>
                <CardDescription>Access frequently used functions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button onClick={() => setActiveTab("patients")} className="h-20 flex flex-col gap-2 bg-blue-600 hover:bg-blue-700">
                    <Users className="w-6 h-6" />
                    <span>Add Patient</span>
                  </Button>
                  <Button onClick={() => setActiveTab("inventory")} className="h-20 flex flex-col gap-2 bg-green-600 hover:bg-green-700">
                    <Package className="w-6 h-6" />
                    <span>Add Product</span>
                  </Button>
                  <Button onClick={() => setActiveTab("communication")} className="h-20 flex flex-col gap-2 bg-purple-600 hover:bg-purple-700">
                    <MessageSquare className="w-6 h-6" />
                    <span>Send Message</span>
                  </Button>
                  <Button onClick={() => setActiveTab("payments")} className="h-20 flex flex-col gap-2 bg-orange-600 hover:bg-orange-700">
                    <CreditCard className="w-6 h-6" />
                    <span>Process Payment</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white rounded-xl">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">New patient registration - Sarah Johnson</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Wholesale order completed - $2,450</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Marketing campaign sent to 1,200 patients</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Low stock alert - Chamomile Capsules</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white rounded-xl">
                <CardHeader>
                  <CardTitle>System Alerts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <span className="text-sm text-red-800">Low stock items: {dashboardStats.lowStockItems}</span>
                    <Button size="sm" variant="outline" onClick={() => setActiveTab("inventory")}>
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm text-yellow-800">Pending payments: {dashboardStats.paymentsPending}</span>
                    <Button size="sm" variant="outline" onClick={() => setActiveTab("payments")}>
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm text-blue-800">New messages: {dashboardStats.newMessages}</span>
                    <Button size="sm" variant="outline" onClick={() => setActiveTab("communication")}>
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inventory">
            <InventoryManagement />
          </TabsContent>

          <TabsContent value="patients">
            <PatientManagement />
          </TabsContent>

          <TabsContent value="communication">
            <RingCentralIntegration />
          </TabsContent>

          <TabsContent value="marketing">
            <MarketingTools />
          </TabsContent>

          <TabsContent value="forms">
            <FormManagement />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentCenter />
          </TabsContent>

          <TabsContent value="wholesale">
            <WholesaleBusiness />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentGateway />
          </TabsContent>

          <TabsContent value="accounting">
            <AccountingModule />
          </TabsContent>

          <TabsContent value="shipping">
            <ShipstationIntegration />
          </TabsContent>
        </Tabs>
      </div>
    </div>;
};
export default AdminDashboard;
