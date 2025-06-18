
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "react-toastify";
import { collection, doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { FormStructure } from "../admin/SendFormToPatientsDialog";

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
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submissionData = {
        formId: assignedForm.id,
        formName: assignedForm.name,
        patientId: patientId,
        responses: formData,
        submittedAt: new Date().toISOString(),
        status: 'completed'
      };

      // Store form response in patient document
      const patientDocRef = doc(db, "auth", patientId);
      await updateDoc(patientDocRef, {
        formResponses: arrayUnion(submissionData)
      });

      // Store in global form responses collection
      const formResponsesRef = collection(db, "formResponses");
      await updateDoc(doc(formResponsesRef, `${patientId}_${assignedForm.id}_${Date.now()}`), submissionData);

      toast.success("Form submitted successfully!");
      onFormSubmitted();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: any) => {
    switch (field.type) {
      case 'text':
        return (
          <Input
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
      
      case 'textarea':
        return (
          <Textarea
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
      
      case 'select':
        return (
          <Select
            value={formData[field.id] || ''}
            onValueChange={(value) => handleInputChange(field.id, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: any) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'radio':
        return (
          <RadioGroup
            value={formData[field.id] || ''}
            onValueChange={(value) => handleInputChange(field.id, value)}
          >
            {field.options?.map((option: any) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={formData[field.id] || false}
              onCheckedChange={(checked) => handleInputChange(field.id, checked)}
            />
            <Label>{field.label}</Label>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{assignedForm.name}</CardTitle>
        <p className="text-sm text-gray-600">{assignedForm.description}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {assignedForm.fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              {renderField(field)}
            </div>
          ))}
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Submitting..." : "Submit Form"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PatientFormSubmission;
