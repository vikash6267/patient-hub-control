
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Edit, Trash2, Phone, Mail, MapPin } from "lucide-react";
import { toast } from "react-toastify";
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";

interface WholesaleClient {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  businessType: string;
  taxId: string;
  creditLimit: number;
  paymentTerms: string;
  status: "active" | "inactive";
  createdAt: string;
}

const WholesaleClientManagement: React.FC = () => {
  const [clients, setClients] = useState<WholesaleClient[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<WholesaleClient | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    businessType: "",
    taxId: "",
    creditLimit: 0,
    paymentTerms: "",
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const clientsRef = collection(db, "wholesaleClients");
      const snapshot = await getDocs(clientsRef);
      const clientsData: WholesaleClient[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as WholesaleClient));
      setClients(clientsData);
    } catch (error) {
      console.error("Error fetching clients:", error);
      toast.error("Failed to load clients");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
      businessType: "",
      taxId: "",
      creditLimit: 0,
      paymentTerms: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingClient) {
        // Update existing client
        const clientRef = doc(db, "wholesaleClients", editingClient.id);
        await updateDoc(clientRef, formData);
        setClients(prev => prev.map(client => 
          client.id === editingClient.id 
            ? { ...client, ...formData }
            : client
        ));
        toast.success("Client updated successfully!");
        setEditingClient(null);
      } else {
        // Add new client
        const clientData: Omit<WholesaleClient, 'id'> = {
          ...formData,
          status: "active",
          createdAt: new Date().toISOString(),
        };
        
        const clientRef = doc(collection(db, "wholesaleClients"));
        await setDoc(clientRef, clientData);
        
        setClients(prev => [...prev, { id: clientRef.id, ...clientData }]);
        toast.success("Client added successfully!");
        setIsAddDialogOpen(false);
      }
      
      resetForm();
    } catch (error) {
      console.error("Error saving client:", error);
      toast.error("Failed to save client");
    }
  };

  const handleEdit = (client: WholesaleClient) => {
    setEditingClient(client);
    setFormData({
      companyName: client.companyName,
      contactPerson: client.contactPerson,
      email: client.email,
      phone: client.phone,
      address: client.address,
      businessType: client.businessType,
      taxId: client.taxId,
      creditLimit: client.creditLimit,
      paymentTerms: client.paymentTerms,
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (clientId: string) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await deleteDoc(doc(db, "wholesaleClients", clientId));
        setClients(prev => prev.filter(client => client.id !== clientId));
        toast.success("Client deleted successfully!");
      } catch (error) {
        console.error("Error deleting client:", error);
        toast.error("Failed to delete client");
      }
    }
  };

  const filteredClients = clients.filter(client =>
    client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ClientForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="contactPerson">Contact Person *</Label>
          <Input
            id="contactPerson"
            value={formData.contactPerson}
            onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="businessType">Business Type</Label>
          <Input
            id="businessType"
            value={formData.businessType}
            onChange={(e) => setFormData(prev => ({ ...prev, businessType: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="taxId">Tax ID</Label>
          <Input
            id="taxId"
            value={formData.taxId}
            onChange={(e) => setFormData(prev => ({ ...prev, taxId: e.target.value }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="creditLimit">Credit Limit ($)</Label>
          <Input
            id="creditLimit"
            type="number"
            value={formData.creditLimit}
            onChange={(e) => setFormData(prev => ({ ...prev, creditLimit: Number(e.target.value) }))}
          />
        </div>
        <div>
          <Label htmlFor="paymentTerms">Payment Terms</Label>
          <Input
            id="paymentTerms"
            value={formData.paymentTerms}
            onChange={(e) => setFormData(prev => ({ ...prev, paymentTerms: e.target.value }))}
            placeholder="e.g., Net 30"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => {
          setIsAddDialogOpen(false);
          setEditingClient(null);
          resetForm();
        }}>
          Cancel
        </Button>
        <Button type="submit">
          {editingClient ? "Update Client" : "Add Client"}
        </Button>
      </div>
    </form>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Wholesale Clients</h2>
          <p className="text-gray-600">Manage your wholesale client relationships</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setEditingClient(null); }}>
              <UserPlus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingClient ? "Edit Client" : "Add New Client"}
              </DialogTitle>
            </DialogHeader>
            <ClientForm />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Client List</CardTitle>
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading clients...</p>
          ) : filteredClients.length === 0 ? (
            <p className="text-center text-gray-500">No clients found</p>
          ) : (
            <div className="space-y-4">
              {filteredClients.map(client => (
                <Card key={client.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold">{client.companyName}</h3>
                          <Badge variant={client.status === "active" ? "default" : "secondary"}>
                            {client.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="space-y-1">
                            <p><strong>Contact:</strong> {client.contactPerson}</p>
                            <div className="flex items-center space-x-1">
                              <Mail className="w-4 h-4" />
                              <span>{client.email}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Phone className="w-4 h-4" />
                              <span>{client.phone}</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p><strong>Business Type:</strong> {client.businessType}</p>
                            <p><strong>Credit Limit:</strong> ${client.creditLimit?.toLocaleString()}</p>
                            <p><strong>Payment Terms:</strong> {client.paymentTerms}</p>
                          </div>
                        </div>
                        
                        {client.address && (
                          <div className="flex items-start space-x-1 mt-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mt-0.5" />
                            <span>{client.address}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(client)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(client.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WholesaleClientManagement;
