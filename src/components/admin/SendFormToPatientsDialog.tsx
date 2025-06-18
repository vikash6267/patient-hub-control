import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  collection,
  query,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  where,
} from "firebase/firestore";
import { db } from "../../firebase"; // Ensure this path is correct
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// --- Type Definitions ---
interface FormBuilderField {
  id: string;
  type: string;
  label: string;
  options?: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
}

export interface FormStructure {
  id: string;
  name: string;
  description: string;
  fields: FormBuilderField[];
  status: "draft" | "active" | "archived";
  created: string;
  lastModified: string;
  assignTo?: string[]; // Array to store patient IDs
}

/**
 * Note: For Firestore, undefined values are automatically ignored during writes (setDoc, updateDoc).
 * This function might not be strictly necessary if its only purpose is to prepare data for Firestore,
 * as Firestore handles undefined fields by omitting them.
 * Keep it if you have other specific reasons for removing undefined properties.
 */
function removeUndefined(obj: any): any {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => removeUndefined(item));
  }

  const newObj: { [key: string]: any } = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value !== undefined) {
        newObj[key] = removeUndefined(value);
      }
    }
  }
  return newObj;
}

interface Patient {
  id: string;
  firstName: string; // Added firstName to match filtering logic
  name: string; // Keeping 'name' if it's also present or used elsewhere
  email: string;
  role: string;
  assignedForms?: (FormStructure & {
    assignedDate: string;
    assignedStatus: string;
  })[];
}

interface SendFormToPatientsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  form: FormStructure;
}

const SendFormToPatientsDialog: React.FC<SendFormToPatientsDialogProps> = ({
  isOpen,
  onClose,
  form,
}) => {
  const { toast } = useToast();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientIds, setSelectedPatientIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const authCollectionRef = collection(db, "auth");
        const q = query(authCollectionRef, where("role", "==", "patient"));

        const querySnapshot = await getDocs(q);
        const fetchedPatients: Patient[] = querySnapshot.docs.map((doc) => {
          const data = doc.data() as Omit<Patient, "id">;
          // Ensure firstName is available, fallback to 'name' or empty string if not directly present
          return {
            id: doc.id,
            firstName: data.firstName || data.name || "", // Fallback
            ...data,
          };
        });
        setPatients(fetchedPatients);
      } catch (error) {
        console.error("Error fetching patients:", error);
        toast({
          title: "Error",
          description: "Failed to load patient list.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchPatients();
      // Optionally pre-select patients if the form already has them assigned
      setSelectedPatientIds(form.assignTo || []);
    } else {
      // Reset state when dialog closes
      setSelectedPatientIds([]);
      setSearchTerm("");
    }
  }, [isOpen, toast, form.assignTo]); // Added form.assignTo to dependencies for pre-selection

  const handleCheckboxChange = (patientId: string, isChecked: boolean) => {
    setSelectedPatientIds((prev) =>
      isChecked ? [...prev, patientId] : prev.filter((id) => id !== patientId)
    );
  };

  const handleSend = async () => {
    if (selectedPatientIds.length === 0) {
      toast({
        title: "No Patients Selected",
        description: "Please select at least one patient to send the form to.",
        variant: "warning",
      });
      return;
    }

    setLoading(true);
    try {
      const formToAssign = removeUndefined({
        ...form,
        // Make sure 'id' is explicitly set from the form object, as 'removeUndefined' might alter it if it finds undefined fields
        id: form.id,
        assignedDate: new Date().toISOString().split("T")[0],
        assignedStatus: "pending",
      });

      console.log("Form object to assign to patient:", formToAssign);

      // --- 1. Update each selected patient's document in the 'auth' collection ---
      const updatePatientPromises = selectedPatientIds.map((patientId) => {
        const patientDocRef = doc(db, "auth", patientId);
        return updateDoc(patientDocRef, {
          assignedForms: arrayUnion(formToAssign),
        });
      });

      // --- 2. Update the form document in the 'forms' collection with assigned patient IDs ---
      const formDocRef = doc(db, "forms", form.id);
      const updateFormPromise = updateDoc(formDocRef, {
        assignTo: arrayUnion(...selectedPatientIds), // Use arrayUnion with spread operator to add multiple IDs
      });

      await Promise.all([...updatePatientPromises, updateFormPromise]);

      toast({
        title: "Form Sent!",
        description: `${form.name} has been successfully assigned to ${selectedPatientIds.length} patient(s).`,
      });
      onClose();
    } catch (error) {
      console.error("Error sending form to patients:", error);
      toast({
        title: "Error",
        description: "Failed to send form to patients. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send "{form.name}" to Patients</DialogTitle>
          <DialogDescription>
            Select the patients you want to send this form to. The complete form
            structure will be embedded in their record.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Search patients by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          {loading ? (
            <div className="text-center text-muted-foreground">
              Loading patients...
            </div>
          ) : filteredPatients.length === 0 && searchTerm === "" ? (
            <div className="text-center text-muted-foreground">
              No patients found in the database with the role 'patient'.
            </div>
          ) : filteredPatients.length === 0 && searchTerm !== "" ? (
            <div className="text-center text-muted-foreground">
              No patients match your search.
            </div>
          ) : (
            <div className="max-h-60 overflow-y-auto pr-2">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center space-x-2 mb-2"
                >
                  <Checkbox
                    id={`patient-${patient.id}`}
                    checked={selectedPatientIds.includes(patient.id)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(patient.id, checked === true)
                    }
                  />
                  <Label
                    htmlFor={`patient-${patient.id}`}
                    className="flex-1 cursor-pointer"
                  >
                    <p className="font-medium">{patient.firstName}</p>
                    <p className="text-sm text-muted-foreground">
                      {patient.email}
                    </p>
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={loading}>
            {loading
              ? "Sending..."
              : `Send to ${selectedPatientIds.length} patient(s)`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SendFormToPatientsDialog;
