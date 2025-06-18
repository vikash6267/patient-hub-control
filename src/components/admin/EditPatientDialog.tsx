// components/EditPatientDialog.tsx
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

// Extend the Patient interface here to include firstName and lastName
interface Patient {
  id: string;
  name: string; // This will be derived from firstName and lastName for display
  firstName: string; // Add firstName
  lastName: string; // Add lastName
  email: string;
  phone: string;
  address: string;
  dob: string;
  gender: "male" | "female" | "other";
  medicalHistory: string;
  allergies: string;
  status: "active" | "inactive";
  lastVisit: string;
  activityLevel: "low" | "moderate" | "high";
  heartRate: number;
  bloodPressure: string;
  totalPatients: number;
  weeklyTrends: number;
}

interface EditPatientDialogProps {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedPatient: Patient) => void;
}

const EditPatientDialog: React.FC<EditPatientDialogProps> = ({
  patient,
  isOpen,
  onClose,
  onUpdate,
}) => {
  // Initialize with an object containing all patient properties, including firstName and lastName
  const [formData, setFormData] = useState<Patient | null>(patient);
  const [loading, setLoading] = useState(false);

  // Update form data when the patient prop changes
  useEffect(() => {
    // Only set formData if patient is not null, otherwise keep it null
    setFormData(patient);
  }, [patient]);

  // If patient prop is null, don't render anything
  if (!patient || !formData) {
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => (prevData ? { ...prevData, [id]: value } : null));
  };

  const handleSelectChange = (id: keyof Patient) => (value: string) => {
    setFormData((prevData) => (prevData ? { ...prevData, [id]: value } : null));
  };

  const handleSave = async () => {
    if (!formData) return;

    const loadingToast = toast.loading("Updating patient...");
    setLoading(true);

    try {
      // Prepare the data to be sent to Firestore
      // The 'id' field is used for the document reference, not as a field within the document.
      const updatedDataForFirestore = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`, // Ensure 'name' is updated consistently
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        dob: formData.dob,
        gender: formData.gender,
        medicalHistory: formData.medicalHistory,
        allergies: formData.allergies,
        status: formData.status,
        lastVisit: formData.lastVisit,
        activityLevel: formData.activityLevel,
        heartRate: formData.heartRate,
        bloodPressure: formData.bloodPressure,
        // totalPatients and weeklyTrends are likely derived or updated elsewhere,
        // so we typically don't send them directly from an edit form unless they are editable fields.
        // If they *are* editable, make sure they are included in your form inputs and formData state.
        // For now, assuming they are not directly editable here.
      };

      // --- CRUCIAL CHANGE: Update the 'auth' collection directly ---
      await updateDoc(doc(db, "auth", patient.id), updatedDataForFirestore);

      toast.update(loadingToast, {
        render: `${updatedDataForFirestore.name} updated successfully!`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      // Update the local state in PatientManagement by passing the full updated formData
      // The 'name' field needs to be consistent with what PatientManagement expects.
      onUpdate({
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`,
      });
      onClose(); // Close the dialog
    } catch (error: any) {
      console.error("Error updating patient: ", error);
      toast.update(loadingToast, {
        render: `Failed to update patient: ${
          error.message || "An unknown error occurred."
        }`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Patient: {patient.name}</DialogTitle>
          <DialogDescription>
            Update the details for {patient.name}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {/* Use firstName and lastName inputs */}
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={formData.gender}
              onValueChange={handleSelectChange("gender")}
            >
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 col-span-1 md:col-span-2">
            <Label htmlFor="medicalHistory">Medical History</Label>
            <Textarea
              id="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2 col-span-1 md:col-span-2">
            <Label htmlFor="allergies">Allergies</Label>
            <Textarea
              id="allergies"
              value={formData.allergies}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={handleSelectChange("status")}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastVisit">Last Visit</Label>
            <Input
              id="lastVisit"
              type="date"
              value={formData.lastVisit}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="activityLevel">Activity Level</Label>
            <Select
              value={formData.activityLevel}
              onValueChange={handleSelectChange("activityLevel")}
            >
              <SelectTrigger id="activityLevel">
                <SelectValue placeholder="Select Activity Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
            <Input
              id="heartRate"
              type="number"
              value={formData.heartRate}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bloodPressure">Blood Pressure</Label>
            <Input
              id="bloodPressure"
              value={formData.bloodPressure}
              onChange={handleChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPatientDialog;
