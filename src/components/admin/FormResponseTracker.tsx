
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

interface FormResponse {
  id: string;
  formId: string;
  formName: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  responses: Record<string, any>;
  submittedAt: string;
  submittedDate: string;
  status: string;
}

interface FormResponseTrackerProps {
  formId: string;
  formName: string;
}

const FormResponseTracker: React.FC<FormResponseTrackerProps> = ({
  formId,
  formName,
}) => {
  const [responses, setResponses] = useState<FormResponse[]>([]);
  const [selectedResponse, setSelectedResponse] = useState<FormResponse | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "formResponses"),
      where("formId", "==", formId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedResponses: FormResponse[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data() as Omit<FormResponse, "id">
      }));
      setResponses(fetchedResponses);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [formId]);

  const handleViewResponse = (response: FormResponse) => {
    setSelectedResponse(response);
    setIsViewDialogOpen(true);
  };

  const exportToCSV = () => {
    if (responses.length === 0) return;

    const headers = ["Patient Name", "Patient Email", "Submitted Date", "Status"];
    const firstResponse = responses[0];
    const responseKeys = Object.keys(firstResponse.responses);
    headers.push(...responseKeys);

    const csvContent = [
      headers.join(","),
      ...responses.map(response => [
        response.patientName,
        response.patientEmail,
        response.submittedDate,
        response.status,
        ...responseKeys.map(key => response.responses[key] || "")
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formName}_responses.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div className="text-center py-4">Loading responses...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Form Responses
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              {responses.length} responses for "{formName}"
            </p>
          </div>
          {responses.length > 0 && (
            <Button variant="outline" size="sm" onClick={exportToCSV}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {responses.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No responses received yet.
          </p>
        ) : (
          <div className="space-y-3">
            {responses.map((response) => (
              <div key={response.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{response.patientName}</h4>
                    <p className="text-sm text-gray-600">{response.patientEmail}</p>
                    <p className="text-xs text-gray-500">
                      Submitted: {response.submittedDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="bg-green-100 text-green-700">
                      {response.status}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewResponse(response)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* View Response Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Form Response Details</DialogTitle>
            <DialogDescription>
              Response from {selectedResponse?.patientName} • {selectedResponse?.submittedDate}
            </DialogDescription>
          </DialogHeader>
          
          {selectedResponse && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-gray-600">Patient Name</label>
                  <p className="font-medium">{selectedResponse.patientName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="font-medium">{selectedResponse.patientEmail}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Submitted Date</label>
                  <p className="font-medium">{selectedResponse.submittedDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <Badge variant="default" className="bg-green-100 text-green-700">
                    {selectedResponse.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Form Responses</h3>
                {Object.entries(selectedResponse.responses).map(([key, value]) => (
                  <div key={key} className="border-b pb-2">
                    <label className="text-sm font-medium text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <p className="mt-1">{String(value)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default FormResponseTracker;
