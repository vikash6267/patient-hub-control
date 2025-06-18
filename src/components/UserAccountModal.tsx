import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Lock, Heart, Package, Settings } from "lucide-react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { setUser } from "@/redux/authSlice";
import { useDispatch } from "react-redux";
interface UserAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "register" | "account";
}

const UserAccountModal = ({
  isOpen,
  onClose,
  mode: initialMode,
}: UserAccountModalProps) => {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const isLoggedIn = false;
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    memberSince: "January 2024",
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading("Logging in...");
    setLoading(true);

    try {
      const q = query(collection(db, "auth"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.update(loadingToast, {
          render: "User not found. Please register.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        return;
      }

      // Authenticate using Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      // Fetch Firestore user data
      const userDoc = await getDoc(doc(db, "auth", firebaseUser.uid));
      const user = userDoc.data();

      if (!user) {
        toast.update(loadingToast, {
          render: "User data not found.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        return;
      }

      // ✅ Save user to Redux
      dispatch(setUser(user));

      toast.update(loadingToast, {
        render: "Login successful!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setEmail("");
      setPassword("");
      onClose();
    } catch (err) {
      console.log(err);
      toast.update(loadingToast, {
        render: err.message || "Login failed.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading("Please wait...");
    setLoading(true);

    try {
      const q = query(collection(db, "auth"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast.update(loadingToast, {
          render: "User already registered with this email.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        return; // ✅ skip rest
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "auth", user.uid), {
        firstName,
        lastName,
        email,
        role: "user",
        uid: user.uid,
        createdAt: new Date(),
      });

      toast.update(loadingToast, {
        render: "Signup successful!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      onClose(); // ✅ move inside success block
    } catch (err) {
      console.log(err);
      toast.update(loadingToast, {
        render: err.message || "Signup failed.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false); // ✅ this will always run
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
  };

  const switchMode = (newMode: "login" | "register") => {
    setMode(newMode);
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        {mode === "account" && isLoggedIn ? (
          // Account Dashboard
          <div>
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>My Account</span>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 mt-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">
                  Member since {user.memberSince}
                </p>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Package className="w-4 h-4" />
                  <span>Orders</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Heart className="w-4 h-4" />
                  <span>Wishlist</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Support</span>
                </Button>
              </div>

              <Button variant="outline" className="w-full" onClick={onClose}>
                Sign Out
              </Button>
            </div>
          </div>
        ) : (
          // Login/Register Forms
          <Tabs
            value={mode}
            onValueChange={(value) => setMode(value as "login" | "register")}
          >
            <DialogHeader>
              <DialogTitle>Welcome to Nutra Herb USA</DialogTitle>
              <DialogDescription>
                Sign in to your account or create a new one to get started
              </DialogDescription>
            </DialogHeader>

            <TabsList className="grid w-full grid-cols-2 mt-6">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Create Account</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Sign In
                </Button>
                <Button
                  type="button"
                  variant="link"
                  className="w-full text-green-600"
                >
                  Forgot your password?
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="border-green-200 focus:border-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="border-green-200 focus:border-green-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserAccountModal;
