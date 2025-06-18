
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ShoppingCart, User } from "lucide-react";
import PatientFormSubmission from "@/components/patient/PatientFormSubmission";
import PatientOrderCreation from "@/components/patient/PatientOrderCreation";

const Patients = () => {
  const currentPatientId = "patient_123";
  
  const [assignedForms] = useState([
    {
      id: "form_1",
      name: "Health Assessment Form",
      description: "Complete health assessment questionnaire",
      fields: [
        {
          id: "name",
          type: "text",
          label: "Full Name",
          required: true,
          placeholder: "Enter your full name"
        },
        {
          id: "age",
          type: "text",
          label: "Age",
          required: true,
          placeholder: "Enter your age"
        },
        {
          id: "symptoms",
          type: "textarea",
          label: "Current Symptoms",
          required: true,
          placeholder: "Describe your current symptoms"
        },
        {
          id: "medication",
          type: "select",
          label: "Current Medications",
          options: [
            { value: "none", label: "None" },
            { value: "prescribed", label: "Prescribed Medications" },
            { value: "supplements", label: "Supplements Only" }
          ]
        },
        {
          id: "exercise",
          type: "radio",
          label: "Exercise Frequency",
          options: [
            { value: "daily", label: "Daily" },
            { value: "weekly", label: "Weekly" },
            { value: "rarely", label: "Rarely" },
            { value: "never", label: "Never" }
          ]
        },
        {
          id: "consent",
          type: "checkbox",
          label: "I consent to treatment",
          required: true
        }
      ],
      status: "active" as const,
      created: "2024-01-15",
      lastModified: "2024-01-15",
      assignedDate: "2024-01-20",
      assignedStatus: "pending"
    }
  ]);

  const handleFormSubmitted = () => {
    console.log("Form submitted successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Portal</h1>
          <p className="text-gray-600">Manage your health forms and orders</p>
        </div>

        <Tabs defaultValue="forms" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="forms" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Health Forms
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Create Order
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="forms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Assigned Health Forms</CardTitle>
                <p className="text-sm text-gray-600">
                  Complete the forms assigned by your healthcare provider
                </p>
              </CardHeader>
              <CardContent>
                {assignedForms.length > 0 ? (
                  <div className="space-y-6">
                    {assignedForms.map((form) => (
                      <PatientFormSubmission
                        key={form.id}
                        patientId={currentPatientId}
                        assignedForm={form}
                        onFormSubmitted={handleFormSubmitted}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    No forms assigned at this time.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <PatientOrderCreation patientId={currentPatientId} />
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Personal Information</h3>
                    <p className="text-sm text-gray-600">
                      Update your personal information and medical history
                    </p>
                  </div>
                  <div className="text-center py-8 text-gray-500">
                    Profile management coming soon...
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Patients;
