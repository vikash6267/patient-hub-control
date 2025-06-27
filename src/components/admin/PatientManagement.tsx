import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  UserPlus,
  Search,
  Edit,
  Send,
  FileText,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Activity,
  Heart,
  Users,
  TrendingUp,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PatientFormResponses from "./PatientFormResponses";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  updateDoc,
  getDoc, // Import getDoc here
} from "firebase/firestore";
import { auth, db } from "@/firebase";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";

import EditPatientDialog from "./EditPatientDialog";
import CommunicationPanel from "@/pages/CommunicationPanel";

interface Patient {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
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

const PatientManagement = () => {
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "active" | "inactive" | "all"
  >("all");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isEditPatientOpen, setIsEditPatientOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast: shadcnToast } = useToast();

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const authCollectionRef = collection(db, "auth");
        const q = query(authCollectionRef, where("role", "==", "patient"));
        const querySnapshot = await getDocs(q);

        const fetchedPatients: Patient[] = [];
        for (const authDoc of querySnapshot.docs) {
          const authData = authDoc.data();
          const patientId = authDoc.id; // This is the UID

          // **Crucial: Fetch the corresponding document from the 'patients' collection**
          const patientDocRef = doc(db, "auth", patientId);
          const patientDocSnap = await getDoc(patientDocRef); // Use getDoc

          if (patientDocSnap.exists()) {
            const patientData = patientDocSnap.data();
            fetchedPatients.push({
              id: patientId,
              firstName: patientData.firstName || authData.firstName || "",
              lastName: patientData.lastName || authData.lastName || "",
              name: `${patientData.firstName || authData.firstName || ""} ${
                patientData.lastName || authData.lastName || ""
              }`.trim(),
              email: patientData.email || authData.email || "",
              phone: patientData.phone || "",
              address: patientData.address || "",
              dob: patientData.dob || "",
              gender: patientData.gender || "other",
              medicalHistory: patientData.medicalHistory || "",
              allergies: patientData.allergies || "",
              status: patientData.status || "active",
              lastVisit: patientData.lastVisit || "",
              activityLevel: patientData.activityLevel || "low",
              heartRate: patientData.heartRate || 0,
              bloodPressure: patientData.bloodPressure || "",
              totalPatients: patientData.totalPatients || 0,
              weeklyTrends: patientData.weeklyTrends || 0,
            } as Patient);
          } else {
            console.warn(
              `Patient details not found in 'patients' collection for user ID: ${patientId}. This user may need to be re-registered or their patient record created manually.`
            );
          }
        }
        setPatients(fetchedPatients);
      } catch (error) {
        console.error("Error fetching patients: ", error);
        shadcnToast({
          title: "Error",
          description: "Failed to load patient data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleRegisterPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToastId = toast.loading("Please wait...");
    setLoading(true);

    try {
      // Input Validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.update(loadingToastId, {
          render: "Please enter a valid email address.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        return;
      }

      if (password.length < 6) {
        toast.update(loadingToastId, {
          render: "Password should be at least 6 characters.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        return;
      }

      // Check if email already exists in 'auth' collection to prevent duplicate user creation
      const q = query(collection(db, "auth"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        toast.update(loadingToastId, {
          render: "User already registered with this email.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        return;
      }

      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // 1. Create document in 'auth' collection
      await setDoc(doc(db, "auth", user.uid), {
        firstName,
        lastName,
        email,
        role: "patient",
        uid: user.uid,
        createdAt: new Date().toISOString(),
      });

      // 2. Create document in 'patients' collection with detailed info
      const newPatient: Patient = {
        id: user.uid, // Use the Firebase Auth UID as the document ID for consistency
        firstName: firstName,
        lastName: lastName,
        name: `${firstName} ${lastName}`, // Derived name for display purposes
        email: email,
        phone: "",
        address: "",
        dob: "",
        gender: "other",
        medicalHistory: "",
        allergies: "",
        status: "active",
        lastVisit: new Date().toISOString().split("T")[0],
        activityLevel: "low",
        heartRate: 0,
        bloodPressure: "",
        totalPatients: 0,
        weeklyTrends: 0,
      };

      await setDoc(doc(db, "patients", user.uid), newPatient); // Store full patient details

      // Update local state after successful creation
      setPatients((prev) => [...prev, newPatient]);

      toast.update(loadingToastId, {
        render: "Patient created successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      // Clear form and close dialog
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setIsAddPatientOpen(false);
    } catch (err: any) {
      console.error("Firebase Error during registration:", err);
      let errorMessage = "Registration failed. Please try again.";

      if (err.code === "auth/invalid-email") {
        errorMessage = "The email address is not valid.";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "The password is too weak (min 6 characters).";
      } else if (err.code === "auth/email-already-in-use") {
        errorMessage = "This email is already in use by another account.";
      } else {
        errorMessage = err.message || "An unexpected error occurred.";
      }

      toast.update(loadingToastId, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const openEditDialog = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditPatientOpen(true);
  };

  const handlePatientUpdate = (updatedPatient: Patient) => {
    setPatients((prevPatients) =>
      prevPatients.map((p) => (p.id === updatedPatient.id ? updatedPatient : p))
    );
    setSelectedPatient(null);
    setIsEditPatientOpen(false);
  };

  const filteredPatients = patients.filter((patient) => {
    const searchRegex = new RegExp(searchQuery, "i");
    const searchMatch =
      searchRegex.test(patient.name) || // Still search by combined name
      searchRegex.test(patient.email) ||
      searchRegex.test(patient.phone);

    const statusMatch =
      filterStatus === "all" || patient.status === filterStatus;

    return searchMatch && statusMatch;
  });

  const PatientDetailsDialog = ({ patient }: { patient: Patient }) => (
    <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Patient Details - {patient.name}</DialogTitle>
        <DialogDescription>
          Comprehensive patient information and medical history
        </DialogDescription>
      </DialogHeader>

      <Tabs defaultValue="overview" className="mt-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="medical">Medical History</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="ring">RingCentral</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium">Personal Information</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Full Name:</span>{" "}
                  {patient.firstName} {patient.lastName}
                </p>
                <p>
                  <span className="font-medium">Date of Birth:</span>{" "}
                  {patient.dob}
                </p>
                <p>
                  <span className="font-medium">Gender:</span> {patient.gender}
                </p>
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {patient.address}
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-medium">Contact Information</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Phone:</span> {patient.phone}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {patient.email}
                </p>
              </div>
            </div>
          </div>
          <div className="border-t pt-4">
            <h4 className="font-medium">Vitals</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <p>
                <span className="font-medium">Heart Rate:</span>{" "}
                {patient.heartRate} bpm
              </p>
              <p>
                <span className="font-medium">Blood Pressure:</span>{" "}
                {patient.bloodPressure}
              </p>
              <p>
                <span className="font-medium">Activity Level:</span>{" "}
                {patient.activityLevel}
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="medical" className="space-y-4">
          <div>
            <h4 className="font-medium">Medical History</h4>
            <p className="text-sm text-gray-600">{patient.medicalHistory}</p>
          </div>
          <div>
            <h4 className="font-medium">Allergies</h4>
            <p className="text-sm text-gray-600">
              {patient.allergies || "None"}
            </p>
          </div>
        </TabsContent>

        <TabsContent value="forms" className="space-y-4">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Patient Forms</h3>
              <Button>
                <Send className="w-4 h-4 mr-2" />
                Send New Form
              </Button>
            </div>

            <PatientFormResponses patientId={patient.id} />
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <div>
            <h4 className="font-medium">Upcoming Appointments</h4>
            <p className="text-sm text-gray-600">
              No upcoming appointments scheduled.
            </p>
          </div>
          <div>
            <h4 className="font-medium">Past Appointments</h4>
            <p className="text-sm text-gray-600">
              No past appointments recorded.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <div>
            <h4 className="font-medium">Patient Notes</h4>
            <p className="text-sm text-gray-600">
              No notes recorded for this patient.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="ring" className="space-y-4">
          <div>
            <CommunicationPanel patient={patient} />
          </div>
        </TabsContent>
      </Tabs>
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Patients
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patients.length}</div>
            <p className="text-sm text-muted-foreground">
              Total patient records found
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Patients
            </CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {patients.filter((patient) => patient.status === "active").length}
            </div>
            <p className="text-sm text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Heart Rate Avg.
            </CardTitle>
            <Heart className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {patients.length > 0
                ? (
                    patients.reduce(
                      (sum, patient) => sum + patient.heartRate,
                      0
                    ) / patients.length
                  ).toFixed(0)
                : 0}
            </div>
            <p className="text-sm text-muted-foreground">
              Average heart rate of displayed patients
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Trends</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {patients.reduce((sum, patient) => sum + patient.weeklyTrends, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Total weekly trends</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Patient Management</CardTitle>
              <CardDescription>
                Manage patient records, appointments, and medical history
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Send className="w-4 h-4 mr-2" />
                Send Forms
              </Button>
              <Button onClick={() => setIsAddPatientOpen(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Add Patient
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Input
              type="text"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select
              value={filterStatus}
              onValueChange={(value) =>
                setFilterStatus(value as "active" | "inactive" | "all")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {loading ? (
              <p>Loading patients...</p>
            ) : filteredPatients.length === 0 ? (
              <p>No patients found.</p>
            ) : (
              filteredPatients.map((patient) => (
                <Card key={patient.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        {/* Display firstName and lastName */}
                        <h3 className="text-lg font-semibold">
                          {patient.firstName} {patient.lastName}
                        </h3>
                        <p className="text-sm text-gray-500">{patient.email}</p>
                        <p className="text-sm text-gray-500">{patient.phone}</p>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <p className="text-sm text-gray-500">
                            {patient.address}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <FileText className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <PatientDetailsDialog patient={patient} />
                        </Dialog>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(patient)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          Schedule
                        </Button>
                        <Button variant="outline" size="sm">
                          <Send className="w-4 h-4 mr-1" />
                          Send Form
                        </Button>
                      </div>
                      <Badge
                        variant={
                          patient.status === "active" ? "default" : "secondary"
                        }
                      >
                        {patient.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isAddPatientOpen} onOpenChange={setIsAddPatientOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add Patient</Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Patient</DialogTitle>
            <DialogDescription>
              Fill in the information below to add a new patient to the system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                First Name
              </Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Last Name
              </Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <Button onClick={handleRegisterPatient} disabled={loading}>
            {loading ? "Adding Patient..." : "Add Patient"}
          </Button>
        </DialogContent>
      </Dialog>

      {selectedPatient && (
        <EditPatientDialog
          patient={selectedPatient}
          isOpen={isEditPatientOpen}
          onClose={() => setIsEditPatientOpen(false)}
          onUpdate={handlePatientUpdate}
        />
      )}
    </div>
  );
};

export default PatientManagement;
