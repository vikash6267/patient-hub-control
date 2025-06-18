
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download, FileSpreadsheet, AlertCircle } from "lucide-react";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters."),
  category: z.string().min(2, "Category must be at least 2 characters."),
  price: z.number().min(0, "Price must be positive"),
  stock: z.number().min(0, "Stock must be positive"),
  batch: z.string().min(1, "Batch number is required"),
  vendor: z.string().min(1, "Vendor is required"),
  expiryDate: z.string(),
  minStockLevel: z.number().min(1, "Minimum stock level is required"),
});

type Product = z.infer<typeof productSchema> & { id: string };

interface ProductUploadDialogProps {
  onProductsUploaded: (products: Product[]) => void;
}

const ProductUploadDialog = ({ onProductsUploaded }: ProductUploadDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({});
  const [step, setStep] = useState<'upload' | 'map' | 'preview'>('upload');
  const [previewData, setPreviewData] = useState<Product[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const { toast } = useToast();

  const requiredFields = ['name', 'category', 'price', 'stock', 'batch', 'vendor', 'expiryDate', 'minStockLevel'];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const rows = text.split('\n').map(row => row.split(',').map(cell => cell.trim()));
      setCsvData(rows);
      setStep('map');
    };
    reader.readAsText(uploadedFile);
  };

  const downloadTemplate = () => {
    const template = [
      'Product Name,Category,Price,Stock,Batch Number,Vendor,Expiry Date,Min Stock Level',
      'Herbal Tea Blend,Tea,15.99,50,Batch001,VendorA,2025-12-31,20',
      'Lavender Essential Oil,Essential Oils,9.99,30,Batch002,VendorB,2025-08-15,10'
    ].join('\n');

    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product_upload_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleMapping = () => {
    if (csvData.length < 2) return;

    const newErrors: string[] = [];
    const mappedProducts: Product[] = [];

    // Skip header row
    for (let i = 1; i < csvData.length; i++) {
      const row = csvData[i];
      if (row.length === 0 || row.every(cell => !cell)) continue;

      try {
        const productData: any = {};
        
        requiredFields.forEach(field => {
          const columnIndex = parseInt(columnMapping[field]);
          if (!isNaN(columnIndex) && row[columnIndex]) {
            let value: any = row[columnIndex];
            
            // Convert numeric fields
            if (field === 'price' || field === 'stock' || field === 'minStockLevel') {
              value = parseFloat(value);
            }
            
            productData[field] = value;
          }
        });

        // Validate the product data
        const validatedProduct = productSchema.parse(productData);
        mappedProducts.push({
          id: String(Date.now() + i),
          ...validatedProduct
        });
      } catch (error) {
        newErrors.push(`Row ${i + 1}: ${error instanceof z.ZodError ? error.errors.map(e => e.message).join(', ') : 'Invalid data'}`);
      }
    }

    setErrors(newErrors);
    setPreviewData(mappedProducts);
    setStep('preview');
  };

  const handleImport = () => {
    onProductsUploaded(previewData);
    toast({
      title: "Success!",
      description: `${previewData.length} products imported successfully.`,
    });
    setIsOpen(false);
    resetDialog();
  };

  const resetDialog = () => {
    setFile(null);
    setCsvData([]);
    setColumnMapping({});
    setStep('upload');
    setPreviewData([]);
    setErrors([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetDialog();
    }}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="w-4 h-4 mr-2" />
          Bulk Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Bulk Product Upload</DialogTitle>
          <DialogDescription>
            Upload multiple products at once using a CSV file
          </DialogDescription>
        </DialogHeader>

        {step === 'upload' && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upload CSV File</CardTitle>
                <CardDescription>
                  Choose a CSV file containing your product data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="file-upload">Select File</Label>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".csv,.txt"
                    onChange={handleFileUpload}
                    className="mt-1"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FileSpreadsheet className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-blue-800">Don't have a template?</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={downloadTemplate}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'map' && csvData.length > 0 && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Map Columns</CardTitle>
                <CardDescription>
                  Map your CSV columns to product fields
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {requiredFields.map(field => (
                    <div key={field}>
                      <Label>{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}</Label>
                      <Select value={columnMapping[field]} onValueChange={(value) => 
                        setColumnMapping(prev => ({ ...prev, [field]: value }))
                      }>
                        <SelectTrigger>
                          <SelectValue placeholder="Select column" />
                        </SelectTrigger>
                        <SelectContent>
                          {csvData[0]?.map((header, index) => (
                            <SelectItem key={index} value={index.toString()}>
                              Column {index + 1}: {header}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setStep('upload')}>
                Back
              </Button>
              <Button onClick={handleMapping}>
                Preview Import
              </Button>
            </DialogFooter>
          </div>
        )}

        {step === 'preview' && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Import Preview</CardTitle>
                <CardDescription>
                  Review the products before importing ({previewData.length} products found)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {errors.length > 0 && (
                  <div className="mb-4 p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-red-800">Errors found:</span>
                    </div>
                    <ul className="text-sm text-red-700 space-y-1">
                      {errors.slice(0, 5).map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                      {errors.length > 5 && <li>... and {errors.length - 5} more errors</li>}
                    </ul>
                  </div>
                )}

                <div className="max-h-64 overflow-auto border rounded">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Vendor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {previewData.slice(0, 10).map((product, index) => (
                        <TableRow key={index}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>${product.price}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>{product.vendor}</TableCell>
                        </TableRow>
                      ))}
                      {previewData.length > 10 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-gray-500">
                            ... and {previewData.length - 10} more products
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setStep('map')}>
                Back
              </Button>
              <Button 
                onClick={handleImport}
                disabled={previewData.length === 0}
              >
                Import {previewData.length} Products
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductUploadDialog;
