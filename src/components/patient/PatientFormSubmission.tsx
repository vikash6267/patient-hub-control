import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FormStructure, FormBuilderField } from "@/types/forms";
import {
  doc,
  updateDoc,
  arrayUnion,
  collection,
  addDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

interface PatientFormSubmissionProps {
  patientId: string;
  assignedForm: FormStructure & {
    assignedDate: string;
    assignedStatus: string;
  };
  onFormSubmitted: () => void;
}

const PatientFormSubmission: React.FC<PatientFormSubmissionProps> = ({
  patientId,
  assignedForm,
  onFormSubmitted,
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const validateForm = () => {
    const requiredFields = assignedForm.fields.filter(
      (field) => field.required
    );
    const missingFields = requiredFields.filter(
      (field) => !formData[field.id] || formData[field.id] === ""
    );
    return missingFields;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const missingFields = validateForm();
    if (missingFields.length > 0) {
      toast({
        title: "Required Fields Missing",
        description: `Please fill in: ${missingFields
          .map((f) => f.label)
          .join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Get patient details from auth collection
      const patientDocRef = doc(db, "auth", patientId);
      const patientDoc = await getDoc(patientDocRef);
      const patientData = patientDoc.data();

      // Create form response object
      const formResponse = {
        formId: assignedForm.id,
        formName: assignedForm.name,
        responses: formData,
        submittedAt: new Date().toISOString(),
        submittedDate: new Date().toISOString().split("T")[0],
        status: "completed",
      };

      // Update patient's assigned forms to mark as completed
      const updatedAssignedForms =
        patientData?.assignedForms?.map((form: any) =>
          form.id === assignedForm.id
            ? {
                ...form,
                assignedStatus: "completed",
                completedAt: new Date().toISOString(),
              }
            : form
        ) || [];

      // Store form response in patient's auth document under forms field
      const currentForms = patientData?.forms || [];
      const updatedForms = [...currentForms, formResponse];

      // Update patient record in auth schema with form response
      await updateDoc(patientDocRef, {
        assignedForms: updatedAssignedForms,
        forms: updatedForms,
      });

      // Also save to separate formResponses collection for admin tracking
      const formResponseForAdmin = {
        ...formResponse,
        patientId: patientId,
        patientName: patientData?.firstName || patientData?.name || "Unknown",
        patientEmail: patientData?.email || "",
      };

      await addDoc(collection(db, "formResponses"), formResponseForAdmin);

      // Update the main form document to track responses
      const formDocRef = doc(db, "forms", assignedForm.id);
      await updateDoc(formDocRef, {
        responses: arrayUnion({
          patientId: patientId,
          patientName: patientData?.firstName || patientData?.name || "Unknown",
          submittedAt: new Date().toISOString(),
          responseId: Date.now().toString(),
        }),
      });

      toast({
        title: "Form Submitted Successfully",
        description: `Your response to "${assignedForm.name}" has been recorded.`,
        variant: "default",
      });

      onFormSubmitted();
      setIsExpanded(false);
      setFormData({});
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Failed",
        description: "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FormBuilderField) => {
    const value = formData[field.id] || "";

    switch (field.type) {
      case "text":
      case "email":
      case "phone":
      case "url":
      case "password":
        return (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
          />
        );

      case "number":
        return (
          <Input
            type="number"
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
          />
        );

      case "textarea":
        return (
          <Textarea
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
            rows={4}
          />
        );

      case "select":
        return (
          <Select
            value={value}
            onValueChange={(newValue) => handleFieldChange(field.id, newValue)}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={field.placeholder || "Select an option"}
              />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "radio":
        return (
          <RadioGroup
            value={value}
            onValueChange={(newValue) => handleFieldChange(field.id, newValue)}
          >
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={`${field.id}-${option.value}`}
                />
                <Label htmlFor={`${field.id}-${option.value}`}>
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.id}
              checked={!!value}
              onCheckedChange={(checked) =>
                handleFieldChange(field.id, checked)
              }
            />
            <Label htmlFor={field.id} className="text-sm">
              {field.label}
            </Label>
          </div>
        );

      case "date":
        return (
          <Input
            type="date"
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
          />
        );

      case "time":
        return (
          <Input
            type="time"
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
          />
        );

      default:
        return (
          <Input
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
          />
        );
    }
  };

  if (assignedForm.assignedStatus === "completed") {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-green-800">
                {assignedForm.name}
              </h3>
              <p className="text-sm text-green-600"> Completed</p>
            </div>
            <div className="text-xs text-green-600">Submitted successfully</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{assignedForm.name}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              {assignedForm.description}
            </p>
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
              <span>Assigned: {assignedForm.assignedDate}</span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
                {assignedForm.assignedStatus}
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            disabled={isSubmitting}
          >
            {isExpanded ? "Collapse" : "Fill Form"}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {assignedForm.fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id} className="text-sm font-medium">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </Label>
                {field.helpText && (
                  <p className="text-xs text-gray-500">{field.helpText}</p>
                )}
                {field.type !== "checkbox" && renderField(field)}
                {field.type === "checkbox" && renderField(field)}
              </div>
            ))}

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? "Submitting..." : "Submit Form"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsExpanded(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      )}
    </Card>
  );
};

export default PatientFormSubmission;
