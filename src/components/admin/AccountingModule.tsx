
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, DollarSign, TrendingUp, TrendingDown, PieChart } from "lucide-react";

const AccountingModule = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const financialSummary = {
    revenue: 45650,
    expenses: 28900,
    profit: 16750,
    tax: 3350
  };

  const expenseCategories = [
    { name: "Inventory & Supplies", amount: 15500, percentage: 53.6 },
    { name: "Marketing & Advertising", amount: 4200, percentage: 14.5 },
    { name: "Staff Salaries", amount: 3800, percentage: 13.1 },
    { name: "Rent & Utilities", amount: 2400, percentage: 8.3 },
    { name: "Insurance", amount: 1500, percentage: 5.2 },
    { name: "Other", amount: 1500, percentage: 5.2 }
  ];

  const monthlyData = [
    { month: "Jan", revenue: 38200, expenses: 24100, profit: 14100 },
    { month: "Feb", revenue: 42100, expenses: 26800, profit: 15300 },
    { month: "Mar", revenue: 39800, expenses: 25200, profit: 14600 },
    { month: "Apr", revenue: 44500, expenses: 27900, profit: 16600 },
    { month: "May", revenue: 45650, expenses: 28900, profit: 16750 }
  ];

  const invoices = [
    {
      id: "INV-001",
      client: "Green Valley Pharmacy",
      amount: 2450.00,
      status: "paid",
      dueDate: "2024-05-15",
      paidDate: "2024-05-12"
    },
    {
      id: "INV-002",
      client: "Natural Health Store",
      amount: 1800.00,
      status: "overdue",
      dueDate: "2024-05-10",
      paidDate: null
    },
    {
      id: "INV-003",
      client: "Wellness Center Co.",
      amount: 3200.00,
      status: "pending",
      dueDate: "2024-05-25",
      paidDate: null
    }
  ];

  return (
    <div className="space-y-6">
      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${financialSummary.revenue.toLocaleString()}
            </div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              ${financialSummary.expenses.toLocaleString()}
            </div>
            <div className="flex items-center text-sm text-red-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +8% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <Calculator className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ${financialSummary.profit.toLocaleString()}
            </div>
            <div className="flex items-center text-sm text-blue-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +18% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tax Liability</CardTitle>
            <PieChart className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              ${financialSummary.tax.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">
              20% of net profit
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="taxes">Taxes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Profit & Loss Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Profit & Loss Summary</CardTitle>
              <CardDescription>Financial performance for the current period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Revenue</span>
                  <span className="text-green-600 font-semibold">
                    +${financialSummary.revenue.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Operating Expenses</span>
                  <span className="text-red-600 font-semibold">
                    -${financialSummary.expenses.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b font-semibold text-lg">
                  <span>Net Profit</span>
                  <span className="text-blue-600">
                    ${financialSummary.profit.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">Profit Margin</span>
                  <span className="font-semibold">
                    {((financialSummary.profit / financialSummary.revenue) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Financial Trends</CardTitle>
              <CardDescription>Revenue, expenses, and profit over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((data, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{data.month} 2024</h3>
                      <span className="text-sm text-gray-600">
                        Margin: {((data.profit / data.revenue) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Revenue:</span>
                        <p className="font-medium text-green-600">${data.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Expenses:</span>
                        <p className="font-medium text-red-600">${data.expenses.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Profit:</span>
                        <p className="font-medium text-blue-600">${data.profit.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
              <CardDescription>Categorized expenses for better cost management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expenseCategories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{category.name}</span>
                        <span className="font-semibold">${category.amount.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="ml-4 text-sm text-gray-600">
                      {category.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Invoice Management</CardTitle>
                  <CardDescription>Track and manage customer invoices</CardDescription>
                </div>
                <Button>Create Invoice</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{invoice.id}</h3>
                      <p className="text-sm text-gray-600">{invoice.client}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${invoice.amount.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Due: {invoice.dueDate}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                        invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {invoice.status.toUpperCase()}
                      </span>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>Generate comprehensive financial reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border cursor-pointer hover:bg-gray-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Profit & Loss Report</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Comprehensive income statement showing revenue, expenses, and profit
                    </p>
                    <Button variant="outline" className="w-full">
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border cursor-pointer hover:bg-gray-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Cash Flow Report</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Track money coming in and going out of your business
                    </p>
                    <Button variant="outline" className="w-full">
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border cursor-pointer hover:bg-gray-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Tax Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Summary of tax obligations and deductible expenses
                    </p>
                    <Button variant="outline" className="w-full">
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border cursor-pointer hover:bg-gray-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Client Revenue Report</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Revenue breakdown by client and service category
                    </p>
                    <Button variant="outline" className="w-full">
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="taxes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Management</CardTitle>
              <CardDescription>Manage tax obligations and deductions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Quarterly Tax Due</h3>
                    <div className="text-2xl font-bold text-red-600">${financialSummary.tax.toLocaleString()}</div>
                    <p className="text-sm text-gray-600 mt-1">Due: June 15, 2024</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Deductible Expenses</h3>
                    <div className="text-2xl font-bold text-green-600">$12,450</div>
                    <p className="text-sm text-gray-600 mt-1">This quarter</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">Tax Rate</h3>
                    <div className="text-2xl font-bold">20%</div>
                    <p className="text-sm text-gray-600 mt-1">Effective rate</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Tax-Deductible Expenses</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>Office supplies and inventory</span>
                      <span className="font-medium">$8,200</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>Professional development and training</span>
                      <span className="font-medium">$1,500</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>Marketing and advertising</span>
                      <span className="font-medium">$2,750</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full">
                  Prepare Tax Documents
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountingModule;
