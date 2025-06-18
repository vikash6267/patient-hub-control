
export interface FormBuilderField {
  id: string;
  type:
    | "text"
    | "number"
    | "email"
    | "phone"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio"
    | "date"
    | "time"
    | "datetime"
    | "file"
    | "url"
    | "password"
    | "range"
    | "rating"
    | "signature"
    | "location"
    | "multi-select"
    | "switch"
    | "color";
  label: string;
  placeholder?: string;
  required: boolean;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    customMessage?: string;
    fileTypes?: string[];
    maxFileSize?: number;
  };
  conditional?: {
    dependsOn?: string;
    showWhen?: string;
    operator?:
      | "equals"
      | "not-equals"
      | "contains"
      | "greater-than"
      | "less-than";
  };
  styling?: {
    width?: "full" | "half" | "third" | "quarter";
    columns?: number;
    inline?: boolean;
  };
  helpText?: string;
  defaultValue?: any;
}

export interface FormStructure {
  id: string;
  name: string;
  description: string;
  fields: FormBuilderField[];
  status: "draft" | "active" | "archived";
  created: string;
  lastModified: string;
  assignTo?: string[];
}
