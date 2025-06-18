import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Package,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
} from "lucide-react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";

interface Product {
  id: string; // Changed to string for Firebase document ID
  sku: string;
  altNum: string;
  mfgName: string;
  itemName: string;
  unit: number;
  type: string;
  packType: string;
  location: string;
  purchaseDate: string;
  expiredDate: string;
  cost: number;
  inStock: number;
  extStock: number;
  daysRemain: number;
  levelA: number;
  levelB: number;
  levelC: number;
  status: "instock" | "lowstock" | "outofstock" | "discontinued";
  doc1Link: string;
  doc2Link: string;
  category: string;
  description: string;
  image?: string;
}

const calculateDaysRemaining = (expiryDate: string) => {
  const today = new Date();
  const expDate = new Date(expiryDate);
  const diffTime = expDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

const InventoryStats = ({ products }: { products: Product[] }) => {
  const totalProducts = products.length;
  const inStockCount = products.filter((p) => p.status === "instock").length;
  const lowStockCount = products.filter((p) => p.status === "lowstock").length;
  const outOfStockCount = products.filter(
    (p) => p.status === "outofstock"
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProducts}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">In Stock</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {inStockCount}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">
            {lowStockCount}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
          <XCircle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {outOfStockCount}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface ProductFormProps {
  product: Partial<Product>;
  onChange: (product: Partial<Product>) => void;
  onSave: (product: Partial<Product>) => Promise<void>; // Modified to accept product and be async
  onCancel: () => void;
  isEditing?: boolean;
}

const ProductForm = ({
  product,
  onChange,
  onSave,
  onCancel,
  isEditing = false,
}: ProductFormProps) => {
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!product.sku?.trim()) {
      toast({
        title: "Validation Error",
        description: "SKU is required",
        variant: "destructive",
      });
      return;
    }
    if (!product.itemName?.trim()) {
      toast({
        title: "Validation Error",
        description: "Item Name is required",
        variant: "destructive",
      });
      return;
    }
    if (!product.mfgName?.trim()) {
      toast({
        title: "Validation Error",
        description: "Manufacturer is required",
        variant: "destructive",
      });
      return;
    }

    await onSave(product); // Pass the product to onSave
  };

  return (
    <div className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
          {isEditing
            ? `Edit Product: ${product.itemName || ""}`
            : "Add New Product"}
        </DialogTitle>
        <DialogDescription>
          {isEditing
            ? "Modify the product details below."
            : "Enter the product details to add to your inventory"}
        </DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="sku">SKU *</Label>
            <Input
              id="sku"
              value={product.sku || ""}
              onChange={(e) => onChange({ ...product, sku: e.target.value })}
              placeholder="Product SKU"
            />
          </div>

          <div>
            <Label htmlFor="altNum">Alternative Number</Label>
            <Input
              id="altNum"
              value={product.altNum || ""}
              onChange={(e) => onChange({ ...product, altNum: e.target.value })}
              placeholder="Alternative number"
            />
          </div>

          <div>
            <Label htmlFor="mfgName">Manufacturer *</Label>
            <Input
              id="mfgName"
              value={product.mfgName || ""}
              onChange={(e) =>
                onChange({ ...product, mfgName: e.target.value })
              }
              placeholder="Manufacturer name"
            />
          </div>

          <div>
            <Label htmlFor="itemName">Item Name *</Label>
            <Input
              id="itemName"
              value={product.itemName || ""}
              onChange={(e) =>
                onChange({ ...product, itemName: e.target.value })
              }
              placeholder="Product name"
            />
          </div>

          <div>
            <Label htmlFor="unit">Unit</Label>
            <Input
              id="unit"
              type="number"
              value={product.unit || 0}
              onChange={(e) =>
                onChange({ ...product, unit: parseInt(e.target.value) || 0 })
              }
              placeholder="Unit quantity"
            />
          </div>

          <div>
            <Label htmlFor="type">Type</Label>
            <Select
              value={product.type || ""}
              onValueChange={(value) => onChange({ ...product, type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Caps">Capsules</SelectItem>
                <SelectItem value="Tablets">Tablets</SelectItem>
                <SelectItem value="Liquid">Liquid</SelectItem>
                <SelectItem value="Powder">Powder</SelectItem>
                <SelectItem value="Tea">Tea</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="packType">Pack Type</Label>
            <Select
              value={product.packType || ""}
              onValueChange={(value) =>
                onChange({ ...product, packType: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select pack type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bottle">Bottle</SelectItem>
                <SelectItem value="Bags">Bags</SelectItem>
                <SelectItem value="Box">Box</SelectItem>
                <SelectItem value="Jar">Jar</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={product.location || ""}
              onChange={(e) =>
                onChange({ ...product, location: e.target.value })
              }
              placeholder="Storage location"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="purchaseDate">Purchase Date</Label>
            <Input
              id="purchaseDate"
              type="date"
              value={product.purchaseDate || ""}
              onChange={(e) =>
                onChange({ ...product, purchaseDate: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="expiredDate">Expiry Date</Label>
            <Input
              id="expiredDate"
              type="date"
              value={product.expiredDate || ""}
              onChange={(e) =>
                onChange({ ...product, expiredDate: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="cost">Cost ($)</Label>
            <Input
              id="cost"
              type="number"
              step="0.01"
              value={product.cost || 0}
              onChange={(e) =>
                onChange({ ...product, cost: parseFloat(e.target.value) || 0 })
              }
              placeholder="Product cost"
            />
          </div>

          <div>
            <Label htmlFor="inStock">In Stock</Label>
            <Input
              id="inStock"
              type="number"
              value={product.inStock || 0}
              onChange={(e) =>
                onChange({ ...product, inStock: parseInt(e.target.value) || 0 })
              }
              placeholder="Current stock"
            />
          </div>

          <div>
            <Label htmlFor="extStock">Extended Stock</Label>
            <Input
              id="extStock"
              type="number"
              value={product.extStock || 0}
              onChange={(e) =>
                onChange({
                  ...product,
                  extStock: parseInt(e.target.value) || 0,
                })
              }
              placeholder="Extended stock"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label htmlFor="levelA">Level A</Label>
              <Input
                id="levelA"
                type="number"
                value={product.levelA || 0}
                onChange={(e) =>
                  onChange({
                    ...product,
                    levelA: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="Level A"
              />
            </div>
            <div>
              <Label htmlFor="levelB">Level B</Label>
              <Input
                id="levelB"
                type="number"
                value={product.levelB || 0}
                onChange={(e) =>
                  onChange({
                    ...product,
                    levelB: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="Level B"
              />
            </div>
            <div>
              <Label htmlFor="levelC">Level C</Label>
              <Input
                id="levelC"
                type="number"
                value={product.levelC || 0}
                onChange={(e) =>
                  onChange({
                    ...product,
                    levelC: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="Level C"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={product.status || "instock"}
              onValueChange={(value) =>
                onChange({ ...product, status: value as Product["status"] })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instock">In Stock</SelectItem>
                <SelectItem value="lowstock">Low Stock</SelectItem>
                <SelectItem value="outofstock">Out of Stock</SelectItem>
                <SelectItem value="discontinued">Discontinued</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={product.category || ""}
              onValueChange={(value) =>
                onChange({ ...product, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="supplements">Supplements</SelectItem>
                <SelectItem value="teas">Herbal Teas</SelectItem>
                <SelectItem value="tinctures">Tinctures</SelectItem>
                <SelectItem value="oils">Essential Oils</SelectItem>
                <SelectItem value="powders">Powders</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-4">
        <div>
          <Label htmlFor="doc1Link">Document 1 Link</Label>
          <Input
            id="doc1Link"
            value={product.doc1Link || ""}
            onChange={(e) => onChange({ ...product, doc1Link: e.target.value })}
            placeholder="https://example.com/document1"
          />
        </div>

        <div>
          <Label htmlFor="doc2Link">Document 2 Link</Label>
          <Input
            id="doc2Link"
            value={product.doc2Link || ""}
            onChange={(e) => onChange({ ...product, doc2Link: e.target.value })}
            placeholder="https://example.com/document2"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={product.description || ""}
            onChange={(e) =>
              onChange({ ...product, description: e.target.value })
            }
            placeholder="Product description"
            rows={3}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          {isEditing ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </div>
  );
};

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void; // Changed to string for Firebase document ID
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
}

const ProductTable = ({
  products,
  onEdit,
  onDelete,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
}: ProductTableProps) => {
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesStatus =
        selectedStatus === "all" || product.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchTerm, selectedCategory, selectedStatus]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-2 md:space-y-0">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search by SKU or Item Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          <Button variant="outline" size="sm">
            <Search className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex space-x-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="supplements">Supplements</SelectItem>
              <SelectItem value="teas">Herbal Teas</SelectItem>
              <SelectItem value="tinctures">Tinctures</SelectItem>
              <SelectItem value="oils">Essential Oils</SelectItem>
              <SelectItem value="powders">Powders</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="instock">In Stock</SelectItem>
              <SelectItem value="lowstock">Low Stock</SelectItem>
              <SelectItem value="outofstock">Out of Stock</SelectItem>
              <SelectItem value="discontinued">Discontinued</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">SKU</th>
              <th className="px-4 py-2">Item Name</th>
              <th className="px-4 py-2">Manufacturer</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">In Stock</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Expiry</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{product.sku}</td>
                <td className="px-4 py-2">{product.itemName}</td>
                <td className="px-4 py-2">{product.mfgName}</td>
                <td className="px-4 py-2 capitalize">{product.category}</td>
                <td className="px-4 py-2">{product.inStock}</td>
                <td className="px-4 py-2">
                  <Badge
                    variant={
                      product.status === "instock"
                        ? "default"
                        : product.status === "lowstock"
                        ? "secondary"
                        : product.status === "outofstock"
                        ? "destructive"
                        : "outline"
                    }
                  >
                    {product.status}
                  </Badge>
                </td>
                <td className="px-4 py-2">{product.expiredDate}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(product)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(product.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  {product.doc1Link && (
                    <Button size="sm" variant="outline" asChild>
                      <a
                        href={product.doc1Link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Document 1"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  {product.doc2Link && (
                    <Button size="sm" variant="outline" asChild>
                      <a
                        href={product.doc2Link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Document 2"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const InventoryManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // New state for edit dialog
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    sku: "",
    altNum: "",
    mfgName: "",
    itemName: "",
    unit: 0,
    type: "",
    packType: "",
    location: "",
    purchaseDate: "",
    expiredDate: "",
    cost: 0,
    inStock: 0,
    extStock: 0,
    levelA: 0,
    levelB: 0,
    levelC: 0,
    status: "instock",
    doc1Link: "",
    doc2Link: "",
    category: "supplements",
    description: "",
  });

  const { toast } = useToast();

  const resetNewProduct = () => {
    setNewProduct({
      sku: "",
      altNum: "",
      mfgName: "",
      itemName: "",
      unit: 0,
      type: "",
      packType: "",
      location: "",
      purchaseDate: "",
      expiredDate: "",
      cost: 0,
      inStock: 0,
      extStock: 0,
      levelA: 0,
      levelB: 0,
      levelC: 0,
      status: "instock",
      doc1Link: "",
      doc2Link: "",
      category: "supplements",
      description: "",
    });
  };

  const getAllProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, "id">),
      }));
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleAddOrUpdateProduct = async (productData: Partial<Product>) => {
    const isEditing = !!productData.id;
    const actionType = isEditing ? "Updating" : "Saving";
    const successMessage = isEditing
      ? "Product updated successfully!"
      : "Product saved successfully!";
    const errorMessage = isEditing
      ? "Failed to update product!"
      : "Failed to save product!";

    const loadingToast = toast({
      title: `${actionType} product...`,
      description: "Please wait.",
      variant: "default",
      duration: 99999, // Keep toast open until action is complete
    });

    try {
      if (isEditing && productData.id) {
        // Update existing product
        const { id, ...dataToUpdate } = productData;
        await updateDoc(doc(db, "products", id), {
          ...dataToUpdate,
          daysRemain: productData.expiredDate
            ? calculateDaysRemaining(productData.expiredDate)
            : 0,
        });
      } else {
        // Add new product
        const productToCreate: Omit<Product, "id"> = {
          sku: productData.sku?.trim() || "",
          altNum: productData.altNum || "",
          mfgName: productData.mfgName?.trim() || "",
          itemName: productData.itemName?.trim() || "",
          unit: productData.unit || 0,
          type: productData.type || "",
          packType: productData.packType || "",
          location: productData.location || "",
          purchaseDate: productData.purchaseDate || "",
          expiredDate: productData.expiredDate || "",
          cost: productData.cost || 0,
          inStock: productData.inStock || 0,
          extStock: productData.extStock || 0,
          daysRemain: productData.expiredDate
            ? calculateDaysRemaining(productData.expiredDate)
            : 0,
          levelA: productData.levelA || 0,
          levelB: productData.levelB || 0,
          levelC: productData.levelC || 0,
          status: (productData.status as Product["status"]) || "instock",
          doc1Link: productData.doc1Link || "",
          doc2Link: productData.doc2Link || "",
          category: productData.category || "supplements",
          description: productData.description || "",
          image: "/placeholder.svg",
        };
        await addDoc(collection(db, "products"), productToCreate);
      }

      await getAllProducts(); // Refresh the product list from Firebase
      setIsCreateDialogOpen(false);
      setIsEditDialogOpen(false);
      setEditingProduct(null);
      resetNewProduct();

      toast({
        title: successMessage,
        description: `${productData.itemName} has been successfully ${
          isEditing ? "updated" : "added"
        }.`,
        variant: "default",
        duration: 2000,
      });
    } catch (error) {
      console.error(`Error ${actionType.toLowerCase()} product:`, error);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    const loadingToast = toast({
      title: "Deleting product...",
      description: "Please wait.",
      variant: "default",
      duration: 99999,
    });

    try {
      await deleteDoc(doc(db, "products", productId));
      setProducts((prev) => prev.filter((p) => p.id !== productId));

      toast({
        title: "Product Deleted",
        description: "Product deleted successfully!",
        variant: "default",
        duration: 2000,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Failed to delete product.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleEditProductClick = (product: Product) => {
    setEditingProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditingProduct(null);
    setIsEditDialogOpen(false);
  };

  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
    resetNewProduct();
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <InventoryStats products={products} />

      {/* Main Content */}
      <Tabs defaultValue="inventory" className="w-full">
        <TabsList>
          <TabsTrigger value="inventory">Inventory Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics & Reports</TabsTrigger>
          <TabsTrigger value="alerts">Stock Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Product Inventory</CardTitle>
                  <CardDescription>
                    Manage your herbal medicine inventory with comprehensive
                    tracking
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Dialog
                    open={isCreateDialogOpen}
                    onOpenChange={setIsCreateDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button onClick={() => setIsCreateDialogOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Product
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <ProductForm
                        product={newProduct}
                        onChange={setNewProduct}
                        onSave={handleAddOrUpdateProduct}
                        onCancel={handleCloseCreateDialog}
                        isEditing={false}
                      />
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Import
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <ProductTable
                products={products}
                onEdit={handleEditProductClick}
                onDelete={handleDeleteProduct}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analytics & Reports</CardTitle>
              <CardDescription>
                Coming soon: detailed analytics and reporting tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                Analytics and reports will be available in a future update.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Stock Alerts</CardTitle>
              <CardDescription>
                Monitor low stock and out of stock items
              </CardDescription>
            </CardHeader>
            <CardContent>
              {products.filter(
                (p) => p.status === "lowstock" || p.status === "outofstock"
              ).length === 0 ? (
                <p className="text-gray-500">No stock alerts at this time.</p>
              ) : (
                <div className="space-y-4">
                  {products
                    .filter(
                      (p) =>
                        p.status === "lowstock" || p.status === "outofstock"
                    )
                    .map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center space-x-4 p-3 border rounded-md"
                      >
                        {product.status === "lowstock" && (
                          <AlertTriangle className="w-6 h-6 text-yellow-500" />
                        )}
                        {product.status === "outofstock" && (
                          <XCircle className="w-6 h-6 text-red-500" />
                        )}
                        <div>
                          <p className="font-semibold">{product.itemName}</p>
                          <p className="text-sm text-gray-600">
                            Status:{" "}
                            <Badge
                              variant={
                                product.status === "lowstock"
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {product.status}
                            </Badge>{" "}
                            - In Stock: {product.inStock}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          {editingProduct && (
            <ProductForm
              product={editingProduct}
              onChange={(updatedProduct) =>
                setEditingProduct((prev) => ({ ...prev!, ...updatedProduct }))
              }
              onSave={handleAddOrUpdateProduct}
              onCancel={handleCloseEditDialog}
              isEditing={true}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryManagement;
