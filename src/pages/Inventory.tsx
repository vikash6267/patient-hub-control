
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Package, AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Inventory = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    quantity: '',
    minQuantity: '',
    price: '',
    supplier: '',
    expiryDate: '',
    batchNumber: '',
    description: ''
  });

  const [inventory] = useState([
    {
      id: 1,
      name: 'Paracetamol 500mg',
      category: 'Pain Relief',
      quantity: 150,
      minQuantity: 50,
      price: 0.50,
      supplier: 'MedSupply Co.',
      expiryDate: '2025-12-31',
      batchNumber: 'PAR2024001',
      status: 'In Stock'
    },
    {
      id: 2,
      name: 'Amoxicillin 250mg',
      category: 'Antibiotics',
      quantity: 25,
      minQuantity: 30,
      price: 2.50,
      supplier: 'PharmaCorp',
      expiryDate: '2024-08-15',
      batchNumber: 'AMX2024002',
      status: 'Low Stock'
    },
    {
      id: 3,
      name: 'Insulin Injection',
      category: 'Diabetes',
      quantity: 80,
      minQuantity: 20,
      price: 15.00,
      supplier: 'DiabetesCare Ltd.',
      expiryDate: '2024-06-30',
      batchNumber: 'INS2024003',
      status: 'In Stock'
    }
  ]);

  const handleAddItem = () => {
    if (!newItem.name || !newItem.category || !newItem.quantity) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Inventory item added successfully",
    });

    setNewItem({
      name: '',
      category: '',
      quantity: '',
      minQuantity: '',
      price: '',
      supplier: '',
      expiryDate: '',
      batchNumber: '',
      description: ''
    });
    setIsAddDialogOpen(false);
  };

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = inventory.length;
  const lowStockItems = inventory.filter(item => item.quantity <= item.minQuantity).length;
  const totalValue = inventory.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-2">Track and manage your medical inventory</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Inventory Item</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="itemName">Item Name *</Label>
                <Input
                  id="itemName"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  placeholder="Enter item name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={newItem.category} onValueChange={(value) => setNewItem({...newItem, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pain Relief">Pain Relief</SelectItem>
                    <SelectItem value="Antibiotics">Antibiotics</SelectItem>
                    <SelectItem value="Diabetes">Diabetes</SelectItem>
                    <SelectItem value="Cardiovascular">Cardiovascular</SelectItem>
                    <SelectItem value="Respiratory">Respiratory</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                  placeholder="Enter quantity"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minQuantity">Minimum Quantity</Label>
                <Input
                  id="minQuantity"
                  type="number"
                  value={newItem.minQuantity}
                  onChange={(e) => setNewItem({...newItem, minQuantity: e.target.value})}
                  placeholder="Enter minimum quantity"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price per Unit</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={newItem.price}
                  onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                  placeholder="Enter price"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Input
                  id="supplier"
                  value={newItem.supplier}
                  onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
                  placeholder="Enter supplier name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={newItem.expiryDate}
                  onChange={(e) => setNewItem({...newItem, expiryDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="batchNumber">Batch Number</Label>
                <Input
                  id="batchNumber"
                  value={newItem.batchNumber}
                  onChange={(e) => setNewItem({...newItem, batchNumber: e.target.value})}
                  placeholder="Enter batch number"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  placeholder="Enter item description"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddItem} className="bg-green-600 hover:bg-green-700">
                Add Item
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-red-600">{lowStockItems}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-green-600">${totalValue.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search inventory by name, category, or supplier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-gray-900">Item Name</th>
                  <th className="text-left p-3 font-medium text-gray-900">Category</th>
                  <th className="text-left p-3 font-medium text-gray-900">Quantity</th>
                  <th className="text-left p-3 font-medium text-gray-900">Price</th>
                  <th className="text-left p-3 font-medium text-gray-900">Supplier</th>
                  <th className="text-left p-3 font-medium text-gray-900">Expiry</th>
                  <th className="text-left p-3 font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">Batch: {item.batchNumber}</p>
                      </div>
                    </td>
                    <td className="p-3 text-gray-600">{item.category}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${
                          item.quantity <= item.minQuantity ? 'text-red-600' : 'text-gray-900'
                        }`}>
                          {item.quantity}
                        </span>
                        {item.quantity <= item.minQuantity && (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                    </td>
                    <td className="p-3 text-gray-900 font-medium">${item.price.toFixed(2)}</td>
                    <td className="p-3 text-gray-600">{item.supplier}</td>
                    <td className="p-3 text-gray-600">{item.expiryDate}</td>
                    <td className="p-3">
                      <Badge variant={item.status === 'In Stock' ? 'default' : 'destructive'}>
                        {item.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
