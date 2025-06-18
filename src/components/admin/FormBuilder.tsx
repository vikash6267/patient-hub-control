import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Plus,
  Trash2,
  Eye,
  Save,
  ArrowUp,
  ArrowDown,
  Settings,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { FormBuilderField, FormStructure } from "@/types/forms";

interface FormBuilderProps {
  form?: FormStructure;
  onSave: (form: FormStructure) => void;
  onPreview: (form: FormStructure) => void;
}

const FormBuilder = ({ form, onSave, onPreview }: FormBuilderProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<FormStructure>>(
    form || {
      name: "",
      description: "",
      fields: [],
      status: "draft",
    }
  );
  const [selectedFieldIndex, setSelectedFieldIndex] = useState<number | null>(
    null
  );
  const [isAdvancedDialogOpen, setIsAdvancedDialogOpen] = useState(false);

  const fieldTypes = [
    { value: "text", label: "Text Input", category: "Basic" },
    { value: "number", label: "Number Input", category: "Basic" },
    { value: "email", label: "Email Input", category: "Basic" },
    { value: "phone", label: "Phone Input", category: "Basic" },
    { value: "password", label: "Password Input", category: "Basic" },
    { value: "url", label: "URL Input", category: "Basic" },
    { value: "textarea", label: "Text Area", category: "Basic" },
    { value: "select", label: "Dropdown", category: "Choice" },
    { value: "multi-select", label: "Multi-Select", category: "Choice" },
    { value: "checkbox", label: "Checkbox", category: "Choice" },
    { value: "radio", label: "Radio Buttons", category: "Choice" },
    { value: "switch", label: "Toggle Switch", category: "Choice" },
    { value: "date", label: "Date Picker", category: "Date/Time" },
    { value: "time", label: "Time Picker", category: "Date/Time" },
    { value: "datetime", label: "Date & Time", category: "Date/Time" },
    { value: "range", label: "Range Slider", category: "Advanced" },
    { value: "rating", label: "Star Rating", category: "Advanced" },
    { value: "file", label: "File Upload", category: "Advanced" },
    { value: "signature", label: "Digital Signature", category: "Advanced" },
    { value: "location", label: "Location Picker", category: "Advanced" },
    { value: "color", label: "Color Picker", category: "Advanced" },
  ];

  const addField = () => {
    const newField: FormBuilderField = {
      id: `field_${Date.now()}`,
      type: "text",
      label: "New Field",
      required: false,
      styling: { width: "full" },
      validation: {},
      options: [],
    };

    setFormData({
      ...formData,
      fields: [...(formData.fields || []), newField],
    });
  };

  const updateField = (index: number, updates: Partial<FormBuilderField>) => {
    const updatedFields = [...(formData.fields || [])];
    updatedFields[index] = { ...updatedFields[index], ...updates };
    setFormData({ ...formData, fields: updatedFields });
  };

  const removeField = (index: number) => {
    const updatedFields = [...(formData.fields || [])];
    updatedFields.splice(index, 1);
    setFormData({ ...formData, fields: updatedFields });
  };

  const openAdvancedSettings = (index: number) => {
    setSelectedFieldIndex(index);
    setIsAdvancedDialogOpen(true);
  };

  const updateAdvancedSettings = (updates: Partial<FormBuilderField>) => {
    if (selectedFieldIndex !== null) {
      updateField(selectedFieldIndex, updates);
    }
  };

  const moveField = (index: number, direction: "up" | "down") => {
    const fields = [...(formData.fields || [])];
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < fields.length) {
      [fields[index], fields[newIndex]] = [fields[newIndex], fields[index]];
      setFormData({ ...formData, fields });
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.fields?.length) {
      toast({
        title: "Validation Error",
        description: "Please provide a form name and at least one field.",
        variant: "destructive",
      });
      return;
    }

    const formToSave: FormStructure = {
      id: form?.id || `form_${Date.now()}`,
      name: formData.name!,
      description: formData.description || "",
      fields: formData.fields!,
      status: formData.status as "draft" | "active" | "archived",
      created: form?.created || new Date().toISOString().split("T")[0],
      lastModified: new Date().toISOString().split("T")[0],
      assignTo: form?.assignTo || [],
    };

    onSave(formToSave);
    toast({
      title: "Form Saved",
      description: `${formData.name} has been saved successfully.`,
    });
  };

  const handlePreview = () => {
    if (!formData.name || !formData.fields?.length) {
      toast({
        title: "Preview Error",
        description:
          "Please provide a form name and at least one field to preview.",
        variant: "destructive",
      });
      return;
    }

    const formToPreview: FormStructure = {
      id: form?.id || `preview_${Date.now()}`,
      name: formData.name!,
      description: formData.description || "",
      fields: formData.fields!,
      status: formData.status as "draft" | "active" | "archived",
      created: form?.created || new Date().toISOString().split("T")[0],
      lastModified: new Date().toISOString().split("T")[0],
      assignTo: form?.assignTo || [],
    };

    onPreview(formToPreview);
  };

  const renderFieldPreview = (field: FormBuilderField) => {
    switch (field.type) {
      case "range":
        return (
          <div className="space-y-2">
            <Label>{field.label}</Label>
            <Slider
              defaultValue={[field.defaultValue || 50]}
              max={field.validation?.max || 100}
              min={field.validation?.min || 0}
              step={1}
              className="w-full"
            />
          </div>
        );
      case "rating":
        return (
          <div className="space-y-2">
            <Label>{field.label}</Label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className="text-2xl text-gray-300 cursor-pointer hover:text-yellow-400"
                >
                  ⭐
                </span>
              ))}
            </div>
          </div>
        );
      case "switch":
        return (
          <div className="flex items-center space-x-2">
            <Switch />
            <Label>{field.label}</Label>
          </div>
        );
      case "multi-select":
        return (
          <div className="space-y-2">
            <Label>{field.label}</Label>
            <div className="border rounded p-2 min-h-[80px] bg-gray-50">
              <p className="text-sm text-gray-500">Multi-select dropdown</p>
            </div>
          </div>
        );
      case "file":
        return (
          <div className="space-y-2">
            <Label>{field.label}</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500">Click to upload files</p>
            </div>
          </div>
        );
      case "signature":
        return (
          <div className="space-y-2">
            <Label>{field.label}</Label>
            <div className="border rounded h-32 bg-gray-50 flex items-center justify-center">
              <p className="text-sm text-gray-500">Signature pad</p>
            </div>
          </div>
        );
      case "location":
        return (
          <div className="space-y-2">
            <Label>{field.label}</Label>
            <div className="border rounded h-32 bg-gray-100 flex items-center justify-center">
              <p className="text-sm text-gray-500">Map location picker</p>
            </div>
          </div>
        );
      case "color":
        return (
          <div className="space-y-2">
            <Label>{field.label}</Label>
            <div className="flex space-x-2">
              <input type="color" className="w-12 h-10 rounded border" />
              <Input placeholder="#000000" className="flex-1" />
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-2">
            <Label>{field.label}</Label>
            <Input
              placeholder={
                field.placeholder || `Enter ${field.label.toLowerCase()}`
              }
            />
          </div>
        );
    }
  };

  const getFieldCategories = () => {
    const categories: Record<string, typeof fieldTypes> = {};
    fieldTypes.forEach((type) => {
      if (!categories[type.category]) {
        categories[type.category] = [];
      }
      categories[type.category].push(type);
    });
    return categories;
  };

  return (
    <div className="space-y-6">
      {/* Form Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Form Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="formName">Form Name</Label>
            <Input
              id="formName"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter form name"
            />
          </div>
          <div>
            <Label htmlFor="formDescription">Description</Label>
            <Textarea
              id="formDescription"
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter form description"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="formStatus">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  status: value as "draft" | "active" | "archived",
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Form Fields */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Form Fields</CardTitle>
            <Button onClick={addField}>
              <Plus className="w-4 h-4 mr-2" />
              Add Field
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.fields?.map((field, index) => (
            <Card key={field.id} className="p-4">
              <div className="space-y-4">
                {/* Basic Field Settings */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Field Type</Label>
                    <Select
                      value={field.type}
                      onValueChange={(value) =>
                        updateField(index, { type: value as FormBuilderField["type"] })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(getFieldCategories()).map(
                          ([category, types]) => (
                            <div key={category}>
                              <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase">
                                {category}
                              </div>
                              {types.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </div>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Label</Label>
                    <Input
                      value={field.label}
                      onChange={(e) =>
                        updateField(index, { label: e.target.value })
                      }
                      placeholder="Field label"
                    />
                  </div>
                  <div>
                    <Label>Placeholder</Label>
                    <Input
                      value={field.placeholder || ""}
                      onChange={(e) =>
                        updateField(index, { placeholder: e.target.value })
                      }
                      placeholder="Placeholder text"
                    />
                  </div>
                </div>

                {/* Field Options */}
                {(field.type === "select" ||
                  field.type === "radio" ||
                  field.type === "multi-select") && (
                  <div>
                    <Label>Options (one per line)</Label>
                    <Textarea
                      value={field.options?.map(opt => typeof opt === 'string' ? opt : opt.label).join("\n") || ""}
                      onChange={(e) => {
                        const optionTexts = e.target.value.split("\n").filter((o) => o.trim());
                        const options = optionTexts.map(text => ({ value: text.toLowerCase().replace(/\s+/g, '_'), label: text }));
                        updateField(index, { options });
                      }}
                      placeholder="Option 1&#10;Option 2&#10;Option 3"
                      rows={3}
                    />
                  </div>
                )}

                {/* Field Preview */}
                <div className="border rounded p-4 bg-gray-50">
                  <div className="text-sm font-medium mb-2 text-gray-600">
                    Preview:
                  </div>
                  {renderFieldPreview(field)}
                </div>

                {/* Field Status and Settings */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.required}
                        onCheckedChange={(checked) =>
                          updateField(index, { required: !!checked })
                        }
                      />
                      <Label>Required</Label>
                    </div>
                    {field.validation &&
                      Object.keys(field.validation).length > 0 && (
                        <Badge variant="outline">Has Validation</Badge>
                      )}
                    {field.conditional && (
                      <Badge variant="outline">Conditional</Badge>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openAdvancedSettings(index)}
                    >
                      <Settings className="w-4 h-4 mr-1" />
                      Advanced
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => moveField(index, "up")}
                      disabled={index === 0}
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => moveField(index, "down")}
                      disabled={index === (formData.fields?.length || 1) - 1}
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeField(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {!formData.fields?.length && (
            <div className="text-center py-8 text-gray-500">
              No fields added yet. Click "Add Field" to get started.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={handlePreview}>
          <Eye className="w-4 h-4 mr-2" />
          Preview Form
        </Button>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Form
        </Button>
      </div>

      {/* Advanced Settings Dialog */}
      <Dialog
        open={isAdvancedDialogOpen}
        onOpenChange={setIsAdvancedDialogOpen}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Advanced Field Settings</DialogTitle>
          </DialogHeader>
          {selectedFieldIndex !== null &&
            formData.fields?.[selectedFieldIndex] && (
              <div className="space-y-6">
                {/* Validation Rules */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Validation Rules</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Min Length</Label>
                      <Input
                        type="number"
                        value={
                          formData.fields[selectedFieldIndex].validation
                            ?.minLength || ""
                        }
                        onChange={(e) =>
                          updateAdvancedSettings({
                            validation: {
                              ...formData.fields![selectedFieldIndex]
                                .validation,
                              minLength: parseInt(e.target.value) || undefined,
                            },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>Max Length</Label>
                      <Input
                        type="number"
                        value={
                          formData.fields[selectedFieldIndex].validation
                            ?.maxLength || ""
                        }
                        onChange={(e) =>
                          updateAdvancedSettings({
                            validation: {
                              ...formData.fields![selectedFieldIndex]
                                .validation,
                              maxLength: parseInt(e.target.value) || undefined,
                            },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>Pattern (Regex)</Label>
                      <Input
                        value={
                          formData.fields[selectedFieldIndex].validation
                            ?.pattern || ""
                        }
                        onChange={(e) =>
                          updateAdvancedSettings({
                            validation: {
                              ...formData.fields![selectedFieldIndex]
                                .validation,
                              pattern: e.target.value,
                            },
                          })
                        }
                        placeholder="e.g., ^[A-Za-z]+$"
                      />
                    </div>
                    <div>
                      <Label>Custom Error Message</Label>
                      <Input
                        value={
                          formData.fields[selectedFieldIndex].validation
                            ?.customMessage || ""
                        }
                        onChange={(e) =>
                          updateAdvancedSettings({
                            validation: {
                              ...formData.fields![selectedFieldIndex]
                                .validation,
                              customMessage: e.target.value,
                            },
                          })
                        }
                        placeholder="Custom validation message"
                      />
                    </div>
                  </div>
                </div>

                {/* Styling Options */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Field Styling</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Field Width</Label>
                      <Select
                        value={
                          formData.fields[selectedFieldIndex].styling?.width ||
                          "full"
                        }
                        onValueChange={(value) =>
                          updateAdvancedSettings({
                            styling: {
                              ...formData.fields![selectedFieldIndex].styling,
                              width: value as
                                | "full"
                                | "half"
                                | "third"
                                | "quarter",
                            },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">Full Width</SelectItem>
                          <SelectItem value="half">Half Width</SelectItem>
                          <SelectItem value="third">Third Width</SelectItem>
                          <SelectItem value="quarter">Quarter Width</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Help Text</Label>
                      <Input
                        value={
                          formData.fields[selectedFieldIndex].helpText || ""
                        }
                        onChange={(e) =>
                          updateAdvancedSettings({ helpText: e.target.value })
                        }
                        placeholder="Help text for users"
                      />
                    </div>
                  </div>
                </div>

                {/* Conditional Logic */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Conditional Logic</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Depends On Field</Label>
                      <Select
                        value={
                          formData.fields[selectedFieldIndex].conditional
                            ?.dependsOn || ""
                        }
                        onValueChange={(value) =>
                          updateAdvancedSettings({
                            conditional: {
                              ...formData.fields![selectedFieldIndex]
                                .conditional,
                              dependsOn: value,
                            },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select field" />
                        </SelectTrigger>
                        <SelectContent>
                          {formData.fields
                            ?.filter((_, i) => i !== selectedFieldIndex)
                            .map((field) => (
                              <SelectItem key={field.id} value={field.id}>
                                {field.label}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Condition</Label>
                      <Select
                        value={
                          formData.fields[selectedFieldIndex].conditional
                            ?.operator || "equals"
                        }
                        onValueChange={(value) =>
                          updateAdvancedSettings({
                            conditional: {
                              ...formData.fields![selectedFieldIndex]
                                .conditional,
                              operator: value as
                                | "equals"
                                | "not-equals"
                                | "contains"
                                | "greater-than"
                                | "less-than",
                            },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="equals">Equals</SelectItem>
                          <SelectItem value="not-equals">Not Equals</SelectItem>
                          <SelectItem value="contains">Contains</SelectItem>
                          <SelectItem value="greater-than">
                            Greater Than
                          </SelectItem>
                          <SelectItem value="less-than">Less Than</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Show When Value</Label>
                      <Input
                        value={
                          formData.fields[selectedFieldIndex].conditional
                            ?.showWhen || ""
                        }
                        onChange={(e) =>
                          updateAdvancedSettings({
                            conditional: {
                              ...formData.fields![selectedFieldIndex]
                                .conditional,
                              showWhen: e.target.value,
                            },
                          })
                        }
                        placeholder="Value to compare"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => setIsAdvancedDialogOpen(false)}>
                    Close
                  </Button>
                </div>
              </div>
            )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormBuilder;
