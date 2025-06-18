import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ShoppingCart, User } from "lucide-react";
import PatientFormSubmission from "@/components/patient/PatientFormSubmission";
import PatientOrderCreation from "@/components/patient/PatientOrderCreation";
import { FormStructure, FormBuilderField } from "@/types/forms";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// Import Firebase and Firestore
import { db } from "../firebase"; // Adjust this path to your firebase.ts/firebase.js file
import { doc, getDoc } from "firebase/firestore";

interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
}

const Patients = () => {
  const user = useSelector((state: RootState) => state.auth?.user ?? null);
  const [patientProfile, setPatientProfile] = useState<UserProfile | null>(
    null
  );
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [errorProfile, setErrorProfile] = useState<string | null>(null);

  const currentPatientId = user?.uid;

  useEffect(() => {
    const fetchPatientProfile = async () => {
      if (!currentPatientId) {
        console.log("No user ID available to fetch profile.");
        setLoadingProfile(false);
        setErrorProfile("No user ID available to fetch profile.");
        return;
      }

      setLoadingProfile(true);
      setErrorProfile(null);
      try {
        const userDocRef = doc(db, "auth", currentPatientId);
        const userDocSnap = await getDoc(userDocRef);

        console.log("Fetched document snapshot:", userDocSnap);

        if (userDocSnap.exists()) {
          const profileData = {
            uid: userDocSnap.id,
            ...(userDocSnap.data() as Omit<UserProfile, "uid">),
          };
          console.log("User profile data:", profileData);
          setPatientProfile(profileData);
        } else {
          console.log("User profile not found.");
          setErrorProfile("User profile not found.");
          setPatientProfile(null);
        }
      } catch (error) {
        console.error("Error fetching patient profile:", error);
        setErrorProfile("Failed to load profile. Please try again.");
        setPatientProfile(null);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchPatientProfile();
  }, [currentPatientId]);

  const [assignedForms] = useState<
    (FormStructure & {
      assignedDate: string;
      assignedStatus: string;
    })[]
  >([
    {
      id: "form_1",
      name: "Health Assessment Form",
      description: "Complete health assessment questionnaire",
      fields: [
        {
          id: "name",
          type: "text" as const,
          label: "Full Name",
          required: true,
          placeholder: "Enter your full name",
        },
        {
          id: "age",
          type: "text" as const,
          label: "Age",
          required: true,
          placeholder: "Enter your age",
        },
        {
          id: "symptoms",
          type: "textarea" as const,
          label: "Current Symptoms",
          required: true,
          placeholder: "Describe your current symptoms",
        },
        {
          id: "medication",
          type: "select" as const,
          label: "Current Medications",
          required: false,
          options: [
            { value: "none", label: "None" },
            { value: "prescribed", label: "Prescribed Medications" },
            { value: "supplements", label: "Supplements Only" },
          ],
        },
        {
          id: "exercise",
          type: "radio" as const,
          label: "Exercise Frequency",
          required: false,
          options: [
            { value: "daily", label: "Daily" },
            { value: "weekly", label: "Weekly" },
            { value: "rarely", label: "Rarely" },
            { value: "never", label: "Never" },
          ],
        },
        {
          id: "consent",
          type: "checkbox" as const,
          label: "I consent to treatment",
          required: true,
        },
      ] as FormBuilderField[],
      status: "active" as const,
      created: "2024-01-15",
      lastModified: "2024-01-15",
      assignedDate: "2024-01-20",
      assignedStatus: "pending",
    },
  ]);

  const handleFormSubmitted = () => {
    console.log("Form submitted successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Patient Portal
          </h1>
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
                {patientProfile?.assignedForms?.length > 0 ? (
                  <div className="space-y-6">
                    {patientProfile?.assignedForms.map((form) => (
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
                  {loadingProfile ? (
                    <div className="text-center py-8 text-gray-500">
                      Loading profile...
                    </div>
                  ) : errorProfile ? (
                    <div className="text-center py-8 text-red-500">
                      {errorProfile}
                    </div>
                  ) : patientProfile ? (
                    <div className="space-y-2">
                      <p>
                        <strong>Name:</strong>{" "}
                        {patientProfile.displayName || "N/A"}
                      </p>
                      <p>
                        <strong>Email:</strong> {patientProfile.email || "N/A"}
                      </p>
                      {/* Add other profile fields here */}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No profile data available.
                    </div>
                  )}
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
