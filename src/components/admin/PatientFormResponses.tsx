
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface FormResponse {
  id: string;
  formId: string;
  formName: string;
  patientId: string;
  patientName: string;
  responses: Record<string, any>;
  submittedAt: string;
  status: 'completed' | 'partial';
}

interface PatientFormResponsesProps {
  patientId?: string;
}

const PatientFormResponses = ({ patientId }: PatientFormResponsesProps) => {
  // Sample data - in real app this would come from a database
  const [responses] = useState<FormResponse[]>([
    {
      id: "resp_1",
      formId: "1",
      formName: "Patient Intake Form",
      patientId: "pat_1",
      patientName: "John Doe",
      responses: {
        "field_name": "John Doe",
        "field_email": "john@example.com",
        "field_symptoms": "Chronic fatigue, digestive issues",
        "field_medications": "None currently"
      },
      submittedAt: "2024-01-08T10:30:00Z",
      status: "completed"
    },
    {
      id: "resp_2",
      formId: "2",
      formName: "Health Assessment Questionnaire",
      patientId: "pat_1",
      patientName: "John Doe",
      responses: {
        "field_energy_level": "Low",
        "field_sleep_quality": "Poor",
        "field_stress_level": "High",
        "field_exercise": "2-3 times per week"
      },
      submittedAt: "2024-01-05T14:15:00Z",
      status: "completed"
    },
    {
      id: "resp_3",
      formId: "4",
      formName: "Symptom Tracking Form",
      patientId: "pat_2",
      patientName: "Jane Smith",
      responses: {
        "field_date": "2024-01-03",
        "field_pain_level": "6",
        "field_mood": "Anxious",
        "field_notes": "Headache in the morning"
      },
      submittedAt: "2024-01-03T09:00:00Z",
      status: "completed"
    }
  ]);

  const filteredResponses = patientId 
    ? responses.filter(r => r.patientId === patientId)
    : responses;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const ResponseDetailDialog = ({ response }: { response: FormResponse }) => (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{response.formName} - {response.patientName}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Submitted:</span>
            <p>{formatDate(response.submittedAt)}</p>
          </div>
          <div>
            <span className="font-medium">Status:</span>
            <Badge variant={response.status === 'completed' ? 'default' : 'secondary'} className="ml-2">
              {response.status}
            </Badge>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Form Responses:</h4>
          <div className="space-y-3">
            {Object.entries(response.responses).map(([key, value]) => (
              <div key={key} className="grid grid-cols-3 gap-2">
                <span className="font-medium text-gray-600 capitalize">
                  {key.replace('field_', '').replace('_', ' ')}:
                </span>
                <span className="col-span-2">
                  {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          {patientId ? 'Patient Form Responses' : 'All Form Responses'}
        </h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredResponses.map((response) => (
          <Card key={response.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium">{response.formName}</h4>
                    <Badge variant={response.status === 'completed' ? 'default' : 'secondary'}>
                      {response.status}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">Patient:</span> {response.patientName}</p>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(response.submittedAt)}</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <span className="text-sm font-medium">Quick Preview:</span>
                    <div className="text-sm text-gray-600 mt-1">
                      {Object.entries(response.responses).slice(0, 2).map(([key, value]) => (
                        <span key={key} className="block">
                          {key.replace('field_', '').replace('_', ' ')}: {String(value).substring(0, 50)}
                          {String(value).length > 50 && '...'}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </DialogTrigger>
                    <ResponseDetailDialog response={response} />
                  </Dialog>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredResponses.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No form responses found.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PatientFormResponses;
