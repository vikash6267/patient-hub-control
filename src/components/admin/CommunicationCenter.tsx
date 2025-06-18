
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Send, Mail, Phone, Users, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CommunicationCenter = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [recipient, setRecipient] = useState("");
  const { toast } = useToast();

  const messageTemplates = [
    {
      id: "appointment-reminder",
      name: "Appointment Reminder",
      content: "Dear {patient_name}, this is a reminder that you have an appointment scheduled for {date} at {time}. Please arrive 15 minutes early. If you need to reschedule, please call us at least 24 hours in advance."
    },
    {
      id: "prescription-ready",
      name: "Prescription Ready",
      content: "Hello {patient_name}, your herbal prescription is ready for pickup. Our pharmacy is open Monday-Friday 9AM-6PM and Saturday 9AM-2PM. Please bring a valid ID when collecting your order."
    },
    {
      id: "follow-up",
      name: "Follow-up Care",
      content: "Hi {patient_name}, I hope you're feeling better after your recent visit. Please let me know how you're responding to the treatment plan. If you have any concerns or questions, don't hesitate to reach out."
    },
    {
      id: "wellness-tip",
      name: "Wellness Tip",
      content: "Weekly Wellness Tip: {tip_content}. Remember, small daily habits can lead to significant improvements in your overall health. Stay consistent with your herbal regimen for best results."
    }
  ];

  const recentMessages = [
    {
      id: "1",
      patient: "Sarah Johnson",
      type: "email",
      subject: "Appointment Reminder",
      timestamp: "2 hours ago",
      status: "sent"
    },
    {
      id: "2",
      patient: "Michael Chen",
      type: "sms",
      subject: "Prescription Ready",
      timestamp: "4 hours ago",
      status: "delivered"
    },
    {
      id: "3",
      patient: "Emily Davis",
      type: "email",
      subject: "Follow-up Care",
      timestamp: "1 day ago",
      status: "read"
    }
  ];

  const handleSendMessage = () => {
    if (!recipient || !messageContent) {
      toast({
        title: "Error",
        description: "Please select a recipient and enter message content.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Message Sent",
      description: `Message sent successfully to ${recipient}.`,
    });

    setMessageContent("");
    setRecipient("");
    setSelectedTemplate("");
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = messageTemplates.find(t => t.id === templateId);
    if (template) {
      setMessageContent(template.content);
      setSelectedTemplate(templateId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Communication Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Sent Today</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email Open Rate</CardTitle>
            <Mail className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">78%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SMS Delivery Rate</CardTitle>
            <Phone className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">95%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Conversations</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">12</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="compose" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="compose">Compose Message</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="history">Message History</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Send Message</CardTitle>
              <CardDescription>Send emails or SMS to patients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Recipient</label>
                  <Select value={recipient} onValueChange={setRecipient}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a patient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah.johnson@email.com">Sarah Johnson</SelectItem>
                      <SelectItem value="michael.chen@email.com">Michael Chen</SelectItem>
                      <SelectItem value="emily.davis@email.com">Emily Davis</SelectItem>
                      <SelectItem value="all-patients">All Patients</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Message Type</label>
                  <Select defaultValue="email">
                    <SelectTrigger>
                      <SelectValue placeholder="Select message type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="both">Both Email & SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Use Template</label>
                <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {messageTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Subject (for emails)</label>
                <Input placeholder="Enter email subject" />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Message Content</label>
                <Textarea
                  placeholder="Type your message here..."
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  rows={6}
                />
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Use {"{patient_name}"}, {"{date}"}, {"{time}"} for personalization
                </div>
                <Button onClick={handleSendMessage}>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Message Templates</CardTitle>
              <CardDescription>Pre-written templates for common communications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {messageTemplates.map((template) => (
                  <Card key={template.id} className="border">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <Button variant="outline" size="sm" onClick={() => handleTemplateSelect(template.id)}>
                          Use Template
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{template.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>View sent messages and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div key={message.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {message.type === 'email' ? (
                          <Mail className="w-4 h-4 text-blue-500" />
                        ) : (
                          <Phone className="w-4 h-4 text-green-500" />
                        )}
                        <span className="font-medium">{message.patient}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{message.subject}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{message.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={
                      message.status === 'sent' ? 'secondary' :
                      message.status === 'delivered' ? 'default' : 'outline'
                    }>
                      {message.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunicationCenter;
