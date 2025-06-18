import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { FileText, Upload, Download, Send, Eye, Folder, FolderOpen, Package, Plus, Users, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Extend the input element type to include webkitdirectory
declare module 'react' {
  interface InputHTMLAttributes<T> {
    webkitdirectory?: string;
  }
}

const DocumentCenter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [selectedProtocol, setSelectedProtocol] = useState<any>(null);
  const [isUploadFolderOpen, setIsUploadFolderOpen] = useState(false);
  const [isSendToPatientOpen, setIsSendToPatientOpen] = useState(false);
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);
  const { toast } = useToast();

  const documents = [
    {
      id: "1",
      name: "Herbal Medicine Guidelines.pdf",
      type: "guideline",
      size: "2.4 MB",
      uploadDate: "2024-05-20",
      category: "Guidelines",
      sharedWith: 15,
      content: "This document contains comprehensive guidelines for herbal medicine practices, including dosage recommendations, contraindications, and best practices for patient care."
    },
    {
      id: "2",
      name: "Treatment Plan - Sarah Johnson.pdf",
      type: "treatment",
      size: "1.2 MB",
      uploadDate: "2024-05-18",
      category: "Treatment Plans",
      sharedWith: 1,
      content: "Personalized treatment plan for Sarah Johnson including herbal remedies, lifestyle recommendations, and follow-up schedule."
    },
    {
      id: "3",
      name: "Prescription - Chamomile Tea.pdf",
      type: "prescription",
      size: "0.8 MB",
      uploadDate: "2024-05-15",
      category: "Prescriptions",
      sharedWith: 1,
      content: "Prescription for chamomile tea blend: 2 tsp dried chamomile flowers, steep in hot water for 5-10 minutes. Take twice daily for anxiety relief."
    },
    {
      id: "4",
      name: "Lab Results - Blood Panel.pdf",
      type: "lab",
      size: "1.5 MB",
      uploadDate: "2024-05-10",
      category: "Lab Results",
      sharedWith: 1,
      content: "Blood panel results showing vitamin D deficiency and elevated inflammatory markers. Recommendations include vitamin D supplementation and anti-inflammatory herbs."
    }
  ];

  const diseaseLibrary = [
    {
      id: "d1",
      name: "Diabetes Management Protocol",
      category: "Endocrine",
      products: ["Bitter Melon Extract", "Cinnamon Capsules", "Chromium Supplement"],
      description: "Comprehensive protocol for managing Type 2 diabetes with natural supplements",
      prevalence: "High",
      protocol: {
        overview: "This protocol addresses Type 2 diabetes through natural blood sugar regulation and insulin sensitivity improvement.",
        dosage: "Bitter Melon Extract: 500mg twice daily before meals\nCinnamon Capsules: 250mg daily with breakfast\nChromium Supplement: 200mcg daily",
        duration: "3-6 months initial treatment, ongoing maintenance",
        contraindications: "Do not use with insulin without medical supervision. Monitor blood glucose levels regularly.",
        expectedResults: "Blood glucose reduction of 10-20% within 8-12 weeks",
        lifestyle: "Low glycemic diet, regular exercise, stress management"
      }
    },
    {
      id: "d2",
      name: "Anxiety & Stress Relief",
      category: "Mental Health",
      products: ["Ashwagandha", "Passionflower", "Magnesium Complex"],
      description: "Natural approach to managing anxiety and chronic stress",
      prevalence: "Very High",
      protocol: {
        overview: "Comprehensive stress management protocol using adaptogenic herbs and calming minerals.",
        dosage: "Ashwagandha: 300mg twice daily\nPassionflower: 250mg before bed\nMagnesium Complex: 400mg daily",
        duration: "4-8 weeks for initial effects, 3-6 months for full benefits",
        contraindications: "Avoid during pregnancy. May interact with sedative medications.",
        expectedResults: "Reduced anxiety symptoms within 2-4 weeks, improved sleep quality",
        lifestyle: "Regular sleep schedule, meditation, reduced caffeine intake"
      }
    },
    {
      id: "d3",
      name: "Digestive Health Support",
      category: "Gastrointestinal",
      products: ["Probiotics", "Digestive Enzymes", "Slippery Elm"],
      description: "Supporting optimal digestive function and gut health",
      prevalence: "High",
      protocol: {
        overview: "Multi-targeted approach to restore digestive balance and reduce inflammation.",
        dosage: "Probiotics: 50 billion CFU daily\nDigestive Enzymes: 1-2 capsules before meals\nSlippery Elm: 1 tsp powder in water twice daily",
        duration: "2-3 months minimum, ongoing as needed",
        contraindications: "Start probiotics slowly to avoid digestive upset. Consult doctor if symptoms persist.",
        expectedResults: "Improved digestion within 1-2 weeks, reduced bloating and discomfort",
        lifestyle: "Eliminate trigger foods, eat slowly, stay hydrated"
      }
    }
  ];

  const productCombos = [
    {
      id: "c1",
      name: "Immune Support Bundle",
      products: ["Vitamin C", "Zinc", "Elderberry", "Echinacea"],
      condition: "Cold & Flu Prevention",
      price: "$89.99",
      savings: "$15.00"
    },
    {
      id: "c2",
      name: "Sleep Enhancement Pack",
      products: ["Melatonin", "Valerian Root", "Magnesium", "L-Theanine"],
      condition: "Sleep Disorders",
      price: "$67.99",
      savings: "$12.00"
    },
    {
      id: "c3",
      name: "Heart Health Combo",
      products: ["Omega-3", "CoQ10", "Hawthorn Berry", "Garlic Extract"],
      condition: "Cardiovascular Support",
      price: "$124.99",
      savings: "$25.00"
    }
  ];

  const patients = [
    { id: "p1", name: "Sarah Johnson", email: "sarah.j@email.com" },
    { id: "p2", name: "Michael Chen", email: "m.chen@email.com" },
    { id: "p3", name: "Emily Davis", email: "e.davis@email.com" },
    { id: "p4", name: "Robert Wilson", email: "r.wilson@email.com" }
  ];

  const prescriptionTemplates = [
    {
      id: "1",
      name: "Stress Relief Protocol",
      herbs: ["Ashwagandha", "Chamomile", "Lavender"],
      usage: "Take twice daily with meals"
    },
    {
      id: "2",
      name: "Digestive Support",
      herbs: ["Ginger", "Peppermint", "Fennel"],
      usage: "Take 30 minutes before meals"
    },
    {
      id: "3",
      name: "Sleep Support",
      herbs: ["Valerian", "Passionflower", "Lemon Balm"],
      usage: "Take 1 hour before bedtime"
    }
  ];

  const handleUploadDocument = () => {
    toast({
      title: "Document Uploaded",
      description: "Document has been uploaded successfully.",
    });
  };

  const handleUploadFolder = () => {
    toast({
      title: "Folder Uploaded",
      description: "Entire folder has been uploaded successfully.",
    });
    setIsUploadFolderOpen(false);
  };

  const handleSendDocument = (docName: string) => {
    toast({
      title: "Document Sent",
      description: `${docName} has been sent to the patient.`,
    });
  };

  const handleSendToSelectedPatients = () => {
    toast({
      title: "Documents Sent",
      description: `Documents sent to ${selectedPatients.length} selected patients.`,
    });
    setIsSendToPatientOpen(false);
    setSelectedPatients([]);
  };

  const handleGeneratePrescription = (templateName: string) => {
    toast({
      title: "Prescription Generated",
      description: `${templateName} prescription has been generated.`,
    });
  };

  const handleViewDocument = (doc: any) => {
    setSelectedDocument(doc);
  };

  const handleViewProtocol = (disease: any) => {
    setSelectedProtocol(disease);
  };

  const handlePatientSelection = (patientId: string, checked: boolean) => {
    if (checked) {
      setSelectedPatients([...selectedPatients, patientId]);
    } else {
      setSelectedPatients(selectedPatients.filter(id => id !== patientId));
    }
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Document Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disease Library</CardTitle>
            <Heart className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{diseaseLibrary.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Product Combos</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{productCombos.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prescriptions</CardTitle>
            <FileText className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {documents.filter(d => d.type === 'prescription').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shared Documents</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {documents.reduce((sum, doc) => sum + doc.sharedWith, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="documents" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="documents">Document Library</TabsTrigger>
          <TabsTrigger value="disease">Disease Library</TabsTrigger>
          <TabsTrigger value="combos">Product Combos</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="upload">Upload & Share</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Document Library</CardTitle>
                  <CardDescription>Manage all patient documents and medical records</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Dialog open={isUploadFolderOpen} onOpenChange={setIsUploadFolderOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <FolderOpen className="w-4 h-4 mr-2" />
                        Upload Folder
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upload Entire Folder</DialogTitle>
                        <DialogDescription>
                          Upload multiple documents at once by selecting a folder
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-sm text-gray-600 mb-4">
                            Select a folder to upload all its contents
                          </p>
                          <input
                            type="file"
                            webkitdirectory=""
                            multiple
                            className="hidden"
                            id="folder-upload"
                          />
                          <Label htmlFor="folder-upload">
                            <Button variant="outline" asChild>
                              <span>Choose Folder</span>
                            </Button>
                          </Label>
                        </div>
                        <Button onClick={handleUploadFolder} className="w-full">
                          Upload Folder
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Document
                  </Button>
                  <Dialog open={isSendToPatientOpen} onOpenChange={setIsSendToPatientOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Send className="w-4 h-4 mr-2" />
                        Send to Patients
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Send Documents to Patients</DialogTitle>
                        <DialogDescription>
                          Select patients to send documents to
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="max-h-48 overflow-y-auto space-y-2">
                          {patients.map((patient) => (
                            <div key={patient.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={patient.id}
                                checked={selectedPatients.includes(patient.id)}
                                onCheckedChange={(checked) => 
                                  handlePatientSelection(patient.id, checked as boolean)
                                }
                              />
                              <Label htmlFor={patient.id} className="text-sm">
                                {patient.name} ({patient.email})
                              </Label>
                            </div>
                          ))}
                        </div>
                        <Textarea placeholder="Add a message for the patients..." />
                        <Button 
                          onClick={handleSendToSelectedPatients} 
                          className="w-full"
                          disabled={selectedPatients.length === 0}
                        >
                          Send to {selectedPatients.length} Patient(s)
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Search */}
              <div className="relative mb-6">
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Documents List */}
              <div className="space-y-3">
                {filteredDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Folder className="w-8 h-8 text-blue-500" />
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{doc.category}</span>
                          <span>{doc.size}</span>
                          <span>{doc.uploadDate}</span>
                          <Badge variant="outline">{doc.sharedWith} shared</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => handleViewDocument(doc)}>
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{selectedDocument?.name || doc.name}</DialogTitle>
                            <DialogDescription>
                              Document preview - {selectedDocument?.category || doc.category} | {selectedDocument?.size || doc.size}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium">Upload Date:</span>
                                <p>{selectedDocument?.uploadDate || doc.uploadDate}</p>
                              </div>
                              <div>
                                <span className="font-medium">Shared with:</span>
                                <p>{selectedDocument?.sharedWith || doc.sharedWith} users</p>
                              </div>
                            </div>
                            
                            <div className="border-t pt-4">
                              <h4 className="font-medium mb-3">Document Content:</h4>
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm leading-relaxed">
                                  {selectedDocument?.content || doc.content}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex justify-end space-x-2 pt-4 border-t">
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-1" />
                                Download
                              </Button>
                              <Button size="sm" onClick={() => handleSendDocument(selectedDocument?.name || doc.name)}>
                                <Send className="w-4 h-4 mr-1" />
                                Send to Patient
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSendDocument(doc.name)}
                      >
                        <Send className="w-4 h-4 mr-1" />
                        Send
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disease" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Disease Library</CardTitle>
                  <CardDescription>Comprehensive disease protocols and treatment suggestions</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Disease Protocol
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {diseaseLibrary.map((disease) => (
                  <Card key={disease.id} className="border">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{disease.name}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline">{disease.category}</Badge>
                            <Badge variant={disease.prevalence === "Very High" ? "destructive" : disease.prevalence === "High" ? "default" : "secondary"}>
                              {disease.prevalence} Prevalence
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => handleViewProtocol(disease)}>
                                View Protocol
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>{disease.name}</DialogTitle>
                                <DialogDescription>
                                  {disease.category} • {disease.prevalence} Prevalence
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-6">
                                <div>
                                  <h4 className="font-semibold mb-2">Overview</h4>
                                  <p className="text-sm text-gray-600">{disease.protocol.overview}</p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                    <h4 className="font-semibold mb-2">Recommended Products</h4>
                                    <div className="space-y-1">
                                      {disease.products.map((product, index) => (
                                        <Badge key={index} variant="secondary" className="text-xs mr-1 mb-1">
                                          {product}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-semibold mb-2">Treatment Duration</h4>
                                    <p className="text-sm text-gray-600">{disease.protocol.duration}</p>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-2">Dosage Instructions</h4>
                                  <div className="bg-gray-50 p-4 rounded-lg">
                                    <pre className="text-sm whitespace-pre-wrap">{disease.protocol.dosage}</pre>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-2">Expected Results</h4>
                                  <p className="text-sm text-gray-600">{disease.protocol.expectedResults}</p>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-2">Lifestyle Recommendations</h4>
                                  <p className="text-sm text-gray-600">{disease.protocol.lifestyle}</p>
                                </div>

                                <div className="bg-yellow-50 p-4 rounded-lg">
                                  <h4 className="font-semibold mb-2 text-yellow-800">Contraindications & Warnings</h4>
                                  <p className="text-sm text-yellow-700">{disease.protocol.contraindications}</p>
                                </div>

                                <div className="flex justify-end space-x-2 pt-4 border-t">
                                  <Button variant="outline" size="sm">
                                    <Download className="w-4 h-4 mr-1" />
                                    Export Protocol
                                  </Button>
                                  <Button size="sm">
                                    <Send className="w-4 h-4 mr-1" />
                                    Send to Patient
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button size="sm">
                            <Send className="w-4 h-4 mr-1" />
                            Send to Patient
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">{disease.description}</p>
                      <div>
                        <span className="text-sm font-medium">Recommended Products: </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {disease.products.map((product, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {product}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="combos" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Product Combo Suggestions</CardTitle>
                  <CardDescription>Curated product combinations for specific conditions</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Combo
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {productCombos.map((combo) => (
                  <Card key={combo.id} className="border">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{combo.name}</CardTitle>
                          <p className="text-sm text-gray-600">{combo.condition}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">{combo.price}</div>
                          <div className="text-sm text-gray-500">Save {combo.savings}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium">Included Products: </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {combo.products.map((product, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {product}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button size="sm">
                            <Send className="w-4 h-4 mr-1" />
                            Recommend to Patient
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Prescription Templates</CardTitle>
              <CardDescription>Generate prescriptions using pre-built templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {prescriptionTemplates.map((template) => (
                  <Card key={template.id} className="border">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleGeneratePrescription(template.name)}
                        >
                          Generate
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium">Herbs: </span>
                          <span className="text-sm">{template.herbs.join(", ")}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Usage: </span>
                          <span className="text-sm">{template.usage}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Prescriptions</CardTitle>
              <CardDescription>View recently generated prescriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Stress Relief Protocol - Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Generated on 2024-05-20</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Send</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Digestive Support - Michael Chen</p>
                    <p className="text-sm text-gray-500">Generated on 2024-05-18</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Send</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload & Share Documents</CardTitle>
              <CardDescription>Upload documents and share them with patients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload Documents</h3>
                <p className="text-gray-500 mb-4">
                  Drag and drop files here, or click to select files
                </p>
                <div className="flex gap-2 justify-center">
                  <Button onClick={handleUploadDocument}>
                    Choose Files
                  </Button>
                  <Button variant="outline" onClick={() => setIsUploadFolderOpen(true)}>
                    <FolderOpen className="w-4 h-4 mr-2" />
                    Upload Folder
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Document Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="treatment">Treatment Plans</SelectItem>
                      <SelectItem value="prescription">Prescriptions</SelectItem>
                      <SelectItem value="lab">Lab Results</SelectItem>
                      <SelectItem value="guideline">Guidelines</SelectItem>
                      <SelectItem value="disease">Disease Library</SelectItem>
                      <SelectItem value="combo">Product Combos</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Share With</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipients" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="specific">Select Patient</SelectItem>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="michael">Michael Chen</SelectItem>
                      <SelectItem value="emily">Emily Davis</SelectItem>
                      <SelectItem value="all">All Patients</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Additional Notes</Label>
                <Textarea 
                  rows={3}
                  placeholder="Add any notes about this document..."
                />
              </div>

              <Button className="w-full">
                Upload and Share Document
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentCenter;
