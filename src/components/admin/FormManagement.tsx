import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  FileText,
  Plus,
  Send,
  Eye,
  Edit,
  Users,
  BarChart3,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormBuilder from "./FormBuilder"; // Assuming FormBuilder defines FormStructure
import FormPreview from "./FormPreview";
import PatientFormResponses from "./PatientFormResponses";
// Make sure this import points to the correct path for SendFormToPatientsDialog
import SendFormToPatientsDialog, {
  FormStructure,
} from "./SendFormToPatientsDialog";

// Firebase imports
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";

const FormManagement = () => {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [isSendToPatientsDialogOpen, setIsSendToPatientsDialogOpen] =
    useState(false);
  const [selectedForm, setSelectedForm] = useState<FormStructure | null>(null);
  // formToSend now holds the complete FormStructure object
  const [formToSend, setFormToSend] = useState<FormStructure | null>(null);
  const [previewForm, setPreviewForm] = useState<FormStructure | null>(null);
  const [activeTab, setActiveTab] = useState("forms");

  const [forms, setForms] = useState<FormStructure[]>([]);
  const [loadingForms, setLoadingForms] = useState(true);
  const [errorForms, setErrorForms] = useState<string | null>(null);

  const formsCollectionRef = collection(db, "forms");

  useEffect(() => {
    const q = query(formsCollectionRef, orderBy("created", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedForms: FormStructure[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<FormStructure, "id">),
          // Ensure assignTo is an array, even if empty or missing in Firebase
          assignTo: (doc.data().assignTo as string[] | undefined) || [],
        }));
        setForms(fetchedForms);
        setLoadingForms(false);
      },
      (error) => {
        console.error("Error fetching forms:", error);
        setErrorForms("Failed to load forms. Please try again.");
        setLoadingForms(false);
        toast({
          title: "Error",
          description: "Failed to load forms from Firebase.",
          variant: "destructive",
        });
      }
    );

    return () => unsubscribe();
  }, []);

  const handleCreateForm = () => {
    setSelectedForm(null);
    setIsCreateDialogOpen(true);
  };

  const handleEditForm = (form: FormStructure) => {
    setSelectedForm(form);
    setIsCreateDialogOpen(true);
  };

  const handleSaveForm = async (formData: FormStructure) => {
    try {
      if (selectedForm) {
        const formDocRef = doc(db, "forms", selectedForm.id);
        await updateDoc(formDocRef, {
          ...formData,
          lastModified: new Date().toISOString().split("T")[0],
          // Important: Preserve existing assignTo when editing, or reset if desired
          assignTo: formData.assignTo || selectedForm.assignTo || [],
        });
        toast({
          title: "Form Updated",
          description: `${formData.name} has been updated successfully.`,
        });
      } else {
        const newFormData = {
          ...formData,
          created: new Date().toISOString().split("T")[0],
          lastModified: new Date().toISOString().split("T")[0],
          assignTo: formData.assignTo || [], // Initialize assignTo as an empty array for new forms
        };
        await addDoc(formsCollectionRef, newFormData);
        toast({
          title: "Form Created",
          description: `${formData.name} has been created successfully.`,
        });
      }
      setIsCreateDialogOpen(false);
      setSelectedForm(null);
    } catch (error) {
      console.error("Error saving form:", error);
      toast({
        title: "Error",
        description: "Failed to save form to Firebase. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePreviewForm = (form: FormStructure) => {
    setPreviewForm(form);
    setIsPreviewDialogOpen(true);
  };

  // Corrected handleSendForm to pass the entire form object
  const handleSendForm = (form: FormStructure) => {
    setFormToSend(form); // Set the entire form object
    setIsSendToPatientsDialogOpen(true);
  };

  const getFormResponses = (formId: string) => {
    // This part remains mock for now, but in a real app,
    // you'd query a 'formResponses' collection for the count.
    // Replace with actual logic to count responses for a given formId.
    const responseCounts = {
      "1": 45,
      "2": 128,
      "3": 89,
      "4": 0,
    };
    return responseCounts[formId as keyof typeof responseCounts] || 0;
  };

  if (loadingForms) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading forms...</p>
      </div>
    );
  }

  if (errorForms) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        <p>{errorForms}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Form Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Forms</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{forms.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Forms</CardTitle>
            <FileText className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {forms.filter((f) => f.status === "active").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Responses
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {forms.reduce((sum, form) => sum + getFormResponses(form.id), 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completion Rate
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            {/* This is a static value, you'd calculate it based on real data */}
            <div className="text-2xl font-bold text-purple-600">87%</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="forms">Forms Management</TabsTrigger>
          <TabsTrigger value="responses">Form Responses</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="forms" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Form Management</CardTitle>
                  <CardDescription>
                    Create and manage patient forms with advanced field types
                  </CardDescription>
                </div>
                <Button onClick={handleCreateForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Form
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {forms.length === 0 ? (
                  <p className="text-center text-muted-foreground">
                    No forms created yet. Click "Create New Form" to get
                    started!
                  </p>
                ) : (
                  forms.map((form) => (
                    <div key={form.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{form.name}</h3>
                          <p className="text-sm text-gray-600">
                            {form.description}
                          </p>
                        </div>
                        <Badge
                          variant={
                            form.status === "active" ? "default" : "outline"
                          }
                        >
                          {form.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                        <div>
                          <span className="text-gray-500">Fields:</span>
                          <p className="font-medium">
                            {form.fields?.length || 0}
                          </p>{" "}
                          {/* Added optional chaining and default */}
                        </div>
                        <div>
                          <span className="text-gray-500">Responses:</span>
                          <p className="font-medium">
                            {getFormResponses(form.id)}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Created:</span>
                          <p className="font-medium">{form.created}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Last Modified:</span>
                          <p className="font-medium">{form.lastModified}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Assigned To:</span>
                          <p className="font-medium">
                            {form.assignTo?.length || 0} patients
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePreviewForm(form)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Preview
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditForm(form)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSendForm(form)} // Corrected: Pass the entire form object
                          disabled={form.status === "draft"}
                        >
                          <Send className="w-4 h-4 mr-1" />
                          Send to Patients
                        </Button>
                        <Button variant="outline" size="sm">
                          View Responses ({getFormResponses(form.id)})
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="responses">
          <Card>
            <CardHeader>
              <CardTitle>Form Responses</CardTitle>
              <CardDescription>
                View and manage all patient form submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PatientFormResponses />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Form Templates</CardTitle>
              <CardDescription>
                Quick start with pre-built form templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border cursor-pointer hover:bg-gray-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="lg">Patient Intake</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Comprehensive intake form for new patients including
                      medical history and current symptoms.
                    </p>
                    <Button variant="outline" className="w-full">
                      Use Template
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border cursor-pointer hover:bg-gray-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="lg">Symptom Tracker</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Daily symptom tracking form for monitoring patient
                      progress over time.
                    </p>
                    <Button variant="outline" className="w-full">
                      Use Template
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border cursor-pointer hover:bg-gray-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="lg">Consent Form</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Treatment consent and privacy agreement form for herbal
                      medicine practices.
                    </p>
                    <Button variant="outline" className="w-full">
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create/Edit Form Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedForm ? `Edit ${selectedForm.name}` : "Create New Form"}
            </DialogTitle>
            <DialogDescription>
              {selectedForm
                ? "Modify the form settings and fields below."
                : "Create a new form with advanced field types and validation."}
            </DialogDescription>
          </DialogHeader>
          <FormBuilder
            form={selectedForm || undefined}
            onSave={handleSaveForm}
            onPreview={(form) => {
              setPreviewForm(form);
              setIsPreviewDialogOpen(true);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Preview Form Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {previewForm && (
            <FormPreview
              form={previewForm}
              onClose={() => setIsPreviewDialogOpen(false)}
              patientId="current_patient" // This might need to be a real patient ID for actual preview functionality
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Send to Patients Dialog */}
      {formToSend && ( // Only render if a form is selected to send
        <SendFormToPatientsDialog
          isOpen={isSendToPatientsDialogOpen}
          onClose={() => setIsSendToPatientsDialogOpen(false)}
          form={formToSend} // Corrected: Pass the entire formToSend object
        />
      )}
    </div>
  );
};

export default FormManagement;
