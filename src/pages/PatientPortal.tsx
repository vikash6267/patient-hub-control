
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, 
  Calendar, 
  Package, 
  FileText, 
  Activity, 
  Heart, 
  Pill, 
  Clock, 
  Leaf,
  ShoppingCart,
  Download,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";

const PatientPortal = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample patient data
  const patientData = {
    name: "Dilip",
    clientId: "NTU123456",
    email: "dilip@example.com",
    phone: "(555) 123-4567",
    dateOfBirth: "1985-06-15",
    address: "123 Wellness St, Health City, HC 12345",
    emergencyContact: "Jane Doe - (555) 987-6543"
  };

  const recentActivities = [
    { date: "2024-01-08", action: "Ordered Ashwagandha Extract", type: "order" },
    { date: "2024-01-05", action: "Completed Health Assessment", type: "form" },
    { date: "2024-01-03", action: "Appointment with Dr. Smith", type: "appointment" },
    { date: "2023-12-28", action: "Downloaded Wellness Guide", type: "document" }
  ];

  const currentSupplements = [
    { name: "Ashwagandha Root Extract", dosage: "500mg daily", status: "Active", nextRefill: "2024-02-15" },
    { name: "Turmeric Curcumin", dosage: "300mg twice daily", status: "Active", nextRefill: "2024-02-20" },
    { name: "Vitamin D3", dosage: "2000 IU daily", status: "Paused", nextRefill: "N/A" }
  ];

  const upcomingAppointments = [
    { date: "2024-01-15", time: "10:00 AM", practitioner: "Dr. Sarah Smith", type: "Consultation" },
    { date: "2024-01-22", time: "2:30 PM", practitioner: "Dr. Mike Johnson", type: "Follow-up" }
  ];

  const orderHistory = [
    { id: "ORD001", date: "2024-01-08", items: 3, total: 89.97, status: "Delivered" },
    { id: "ORD002", date: "2023-12-15", items: 2, total: 54.98, status: "Delivered" },
    { id: "ORD003", date: "2023-11-28", items: 1, total: 29.99, status: "Delivered" }
  ];

  const healthRecords = [
    { date: "2024-01-05", type: "Health Assessment", practitioner: "Dr. Smith", action: "View" },
    { date: "2023-12-20", type: "Blood Test Results", practitioner: "Lab Corp", action: "Download" },
    { date: "2023-12-01", type: "Consultation Notes", practitioner: "Dr. Smith", action: "View" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Leaf className="w-8 h-8 text-green-600" />
                <span className="text-2xl font-bold text-green-700">Nutra Herb USA</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
                Home
              </Link>
              <Link to="/products" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
                Products
              </Link>
              <Link to="/patient-portal" className="text-green-600 font-medium border-b-2 border-green-600">
                Patient Portal
              </Link>
              <Link to="/admin" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
                Admin
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link to="/payment">
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Shop
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-green-100 text-green-700 text-xl font-bold">
                {patientData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {patientData.name}</h1>
              <p className="text-lg text-gray-600">Client ID: {patientData.clientId}</p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8 bg-white shadow-sm">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="health-solutions" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Health Solutions</span>
            </TabsTrigger>
            <TabsTrigger value="supplements" className="flex items-center gap-2">
              <Pill className="w-4 h-4" />
              <span className="hidden sm:inline">Supplements</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Appointments</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="records" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Records</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-0 shadow-md bg-white rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Active Supplements</CardTitle>
                  <Pill className="h-5 w-5 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">2</div>
                  <p className="text-xs text-green-600 font-medium mt-1">Currently taking</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-white rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Upcoming Appointments</CardTitle>
                  <Calendar className="h-5 w-5 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{upcomingAppointments.length}</div>
                  <p className="text-xs text-blue-600 font-medium mt-1">Next: Jan 15</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-white rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
                  <Package className="h-5 w-5 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{orderHistory.length}</div>
                  <p className="text-xs text-purple-600 font-medium mt-1">All time</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-white rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Health Records</CardTitle>
                  <FileText className="h-5 w-5 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">{healthRecords.length}</div>
                  <p className="text-xs text-orange-600 font-medium mt-1">Available</p>
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
                  <Button onClick={() => setActiveTab("appointments")} className="h-20 flex flex-col gap-2 bg-blue-600 hover:bg-blue-700">
                    <Calendar className="w-6 h-6" />
                    <span>Book Appointment</span>
                  </Button>
                  <Link to="/products">
                    <Button className="h-20 flex flex-col gap-2 bg-green-600 hover:bg-green-700 w-full">
                      <Package className="w-6 h-6" />
                      <span>Order Supplements</span>
                    </Button>
                  </Link>
                  <Button onClick={() => setActiveTab("records")} className="h-20 flex flex-col gap-2 bg-purple-600 hover:bg-purple-700">
                    <FileText className="w-6 h-6" />
                    <span>View Records</span>
                  </Button>
                  <Button onClick={() => setActiveTab("health-solutions")} className="h-20 flex flex-col gap-2 bg-orange-600 hover:bg-orange-700">
                    <Heart className="w-6 h-6" />
                    <span>Health Solutions</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-lg bg-white rounded-xl">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'order' ? 'bg-green-500' :
                      activity.type === 'appointment' ? 'bg-blue-500' :
                      activity.type === 'form' ? 'bg-purple-500' : 'bg-orange-500'
                    }`}></div>
                    <span className="text-sm text-gray-600">{activity.date}</span>
                    <span className="text-sm">{activity.action}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="health-solutions" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white rounded-xl">
              <CardHeader>
                <CardTitle>Personalized Health Solutions</CardTitle>
                <CardDescription>Tailored recommendations based on your health profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 border border-green-200 rounded-lg">
                    <h3 className="font-semibold text-green-700 mb-2">Stress Management</h3>
                    <p className="text-sm text-gray-600 mb-4">Based on your current supplements and health goals</p>
                    <Button size="sm" variant="outline">View Plan</Button>
                  </div>
                  <div className="p-4 border border-blue-200 rounded-lg">
                    <h3 className="font-semibold text-blue-700 mb-2">Energy Optimization</h3>
                    <p className="text-sm text-gray-600 mb-4">Customized energy-boosting protocols</p>
                    <Button size="sm" variant="outline">View Plan</Button>
                  </div>
                  <div className="p-4 border border-purple-200 rounded-lg">
                    <h3 className="font-semibold text-purple-700 mb-2">Immune Support</h3>
                    <p className="text-sm text-gray-600 mb-4">Seasonal immune system strengthening</p>
                    <Button size="sm" variant="outline">View Plan</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="supplements" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white rounded-xl">
              <CardHeader>
                <CardTitle>Current Supplements</CardTitle>
                <CardDescription>Your active supplement regimen</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentSupplements.map((supplement, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-gray-900">{supplement.name}</h3>
                        <p className="text-sm text-gray-600">{supplement.dosage}</p>
                        <p className="text-xs text-gray-500">Next refill: {supplement.nextRefill}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={supplement.status === "Active" ? "default" : "secondary"}>
                          {supplement.status}
                        </Badge>
                        <Button size="sm" variant="outline">Reorder</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white rounded-xl">
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled consultations and follow-ups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-gray-900">{appointment.type}</h3>
                        <p className="text-sm text-gray-600">with {appointment.practitioner}</p>
                        <p className="text-xs text-gray-500">{appointment.date} at {appointment.time}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Reschedule</Button>
                        <Button size="sm">Join Video Call</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book New Appointment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white rounded-xl">
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>Your previous purchases and deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                        <p className="text-sm text-gray-600">{order.items} items • ${order.total}</p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="default" className="bg-green-100 text-green-700">
                          {order.status}
                        </Badge>
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="records" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white rounded-xl">
              <CardHeader>
                <CardTitle>Health Records</CardTitle>
                <CardDescription>Your medical documents and test results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {healthRecords.map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-gray-900">{record.type}</h3>
                        <p className="text-sm text-gray-600">By {record.practitioner}</p>
                        <p className="text-xs text-gray-500">{record.date}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          {record.action === "Download" ? <Download className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
                          {record.action}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientPortal;
