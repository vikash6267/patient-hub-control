
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, DollarSign, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PaymentGateway = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const payments = [
    {
      id: "PAY-001",
      patient: "Sarah Johnson",
      amount: 150.00,
      method: "Credit Card",
      status: "completed",
      date: "2024-05-20",
      description: "Consultation + Herbal Prescription"
    },
    {
      id: "PAY-002",
      patient: "Michael Chen",
      amount: 75.00,
      method: "PayPal",
      status: "pending",
      date: "2024-05-19",
      description: "Herbal Supplements Order"
    },
    {
      id: "PAY-003",
      patient: "Emily Davis",
      amount: 200.00,
      method: "Bank Transfer",
      status: "failed",
      date: "2024-05-18",
      description: "Treatment Plan Package"
    },
    {
      id: "PAY-004",
      patient: "Green Valley Pharmacy",
      amount: 2450.00,
      method: "Invoice",
      status: "completed",
      date: "2024-05-17",
      description: "Wholesale Order WO-001"
    }
  ];

  const handleProcessRefund = (paymentId: string, amount: number) => {
    toast({
      title: "Refund Processed",
      description: `Refund of $${amount} for payment ${paymentId} has been initiated.`,
    });
  };

  const handleRetryPayment = (paymentId: string) => {
    toast({
      title: "Payment Retry Initiated",
      description: `Payment ${paymentId} retry has been sent to the customer.`,
    });
  };

  const filteredPayments = payments.filter(payment =>
    payment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const failedPayments = payments.filter(p => p.status === 'failed').length;

  return (
    <div className="space-y-6">
      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${totalRevenue.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              ${pendingAmount.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Payments</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{failedPayments}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">92%</div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Transactions */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Payment Transactions</CardTitle>
              <CardDescription>Manage payments and process refunds</CardDescription>
            </div>
            <Button>
              <CreditCard className="w-4 h-4 mr-2" />
              Process Payment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="relative mb-6">
            <Input
              placeholder="Search by patient name or payment ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Payments Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Patient/Client</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>{payment.patient}</TableCell>
                    <TableCell>${payment.amount.toFixed(2)}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>
                      <Badge variant={
                        payment.status === 'completed' ? 'default' :
                        payment.status === 'pending' ? 'secondary' : 'destructive'
                      }>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{payment.description}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        {payment.status === 'completed' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleProcessRefund(payment.id, payment.amount)}
                          >
                            Refund
                          </Button>
                        )}
                        {payment.status === 'failed' && (
                          <Button 
                            size="sm"
                            onClick={() => handleRetryPayment(payment.id)}
                          >
                            Retry
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

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Gateway Settings</CardTitle>
          <CardDescription>Configure payment methods and processing settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Stripe</CardTitle>
                  <Badge variant="default">Active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">Credit card processing</p>
                <Button variant="outline" className="w-full">
                  Configure
                </Button>
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">PayPal</CardTitle>
                  <Badge variant="default">Active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">PayPal payments</p>
                <Button variant="outline" className="w-full">
                  Configure
                </Button>
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Bank Transfer</CardTitle>
                  <Badge variant="secondary">Inactive</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">Direct bank transfers</p>
                <Button variant="outline" className="w-full">
                  Enable
                </Button>
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Square</CardTitle>
                  <Badge variant="secondary">Inactive</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">In-person payments</p>
                <Button variant="outline" className="w-full">
                  Setup
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Analytics</CardTitle>
          <CardDescription>Track payment performance and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold">This Month</h3>
              <div className="text-3xl font-bold text-green-600">${totalRevenue.toLocaleString()}</div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +15% from last month
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold">Average Transaction</h3>
              <div className="text-3xl font-bold">${(totalRevenue / payments.filter(p => p.status === 'completed').length).toFixed(2)}</div>
              <div className="text-sm text-gray-600">Per successful payment</div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold">Processing Fees</h3>
              <div className="text-3xl font-bold text-red-600">$125.40</div>
              <div className="text-sm text-gray-600">3.2% of total revenue</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentGateway;
