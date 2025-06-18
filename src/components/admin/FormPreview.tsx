
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { FormStructure } from "./FormBuilder";

interface FormPreviewProps {
  form: FormStructure;
  onClose: () => void;
  patientId?: string;
}

const FormPreview = ({ form, onClose, patientId }: FormPreviewProps) => {
  const { toast } = useToast();
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (fieldId: string, value: any) => {
    setFormValues({ ...formValues, [fieldId]: value });
    if (errors[fieldId]) {
      setErrors({ ...errors, [fieldId]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    form.fields.forEach(field => {
      const value = formValues[field.id];
      
      if (field.required && (!value || (typeof value === 'string' && !value.trim()))) {
        newErrors[field.id] = `${field.label} is required`;
      }

      if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.id] = 'Please enter a valid email address';
        }
      }

      if (field.type === 'phone' && value) {
        const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
        if (!phoneRegex.test(value)) {
          newErrors[field.id] = 'Please enter a valid phone number';
        }
      }

      if (field.type === 'number' && value) {
        if (isNaN(Number(value))) {
          newErrors[field.id] = 'Please enter a valid number';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors and try again.",
        variant: "destructive"
      });
      return;
    }

    // Simulate saving to patient profile
    const formResponse = {
      formId: form.id,
      formName: form.name,
      patientId: patientId || 'current_patient',
      responses: formValues,
      submittedAt: new Date().toISOString(),
      status: 'completed'
    };

    console.log('Form Response:', formResponse);

    toast({
      title: "Form Submitted",
      description: `${form.name} has been submitted and saved to patient profile.`,
    });

    // Reset form
    setFormValues({});
    setErrors({});
  };

  const renderField = (field: any) => {
    const fieldError = errors[field.id];

    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              value={formValues[field.id] || ''}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              className={fieldError ? 'border-red-500' : ''}
            />
            {fieldError && <p className="text-sm text-red-500">{fieldError}</p>}
          </div>
        );

      case 'number':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={field.id}
              type="number"
              placeholder={field.placeholder}
              value={formValues[field.id] || ''}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              className={fieldError ? 'border-red-500' : ''}
            />
            {fieldError && <p className="text-sm text-red-500">{fieldError}</p>}
          </div>
        );

      case 'date':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={field.id}
              type="date"
              value={formValues[field.id] || ''}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              className={fieldError ? 'border-red-500' : ''}
            />
            {fieldError && <p className="text-sm text-red-500">{fieldError}</p>}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Textarea
              id={field.id}
              placeholder={field.placeholder}
              value={formValues[field.id] || ''}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              rows={4}
              className={fieldError ? 'border-red-500' : ''}
            />
            {fieldError && <p className="text-sm text-red-500">{fieldError}</p>}
          </div>
        );

      case 'select':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Select
              value={formValues[field.id] || ''}
              onValueChange={(value) => handleInputChange(field.id, value)}
            >
              <SelectTrigger className={fieldError ? 'border-red-500' : ''}>
                <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option: string, index: number) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldError && <p className="text-sm text-red-500">{fieldError}</p>}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.id} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={field.id}
                checked={formValues[field.id] || false}
                onCheckedChange={(checked) => handleInputChange(field.id, checked)}
              />
              <Label htmlFor={field.id}>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
            </div>
            {fieldError && <p className="text-sm text-red-500">{fieldError}</p>}
          </div>
        );

      case 'radio':
        return (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <RadioGroup
              value={formValues[field.id] || ''}
              onValueChange={(value) => handleInputChange(field.id, value)}
              className={fieldError ? 'border border-red-500 rounded p-2' : ''}
            >
              {field.options?.map((option: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${field.id}_${index}`} />
                  <Label htmlFor={`${field.id}_${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
            {fieldError && <p className="text-sm text-red-500">{fieldError}</p>}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{form.name}</CardTitle>
            {form.description && (
              <p className="text-sm text-gray-600 mt-1">{form.description}</p>
            )}
          </div>
          <Button variant="outline" onClick={onClose}>
            Close Preview
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {form.fields.map(renderField)}
          
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Submit Form
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormPreview;
