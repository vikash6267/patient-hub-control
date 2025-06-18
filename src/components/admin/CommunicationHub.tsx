
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Phone, PhoneCall, MessageSquare, Users, Settings, PhoneIncoming, PhoneOutgoing, Send, Mail, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CommunicationHub = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [recipient, setRecipient] = useState("");
  const { toast } = useToast();

  const callLogs = [
    {
      id: "1",
      type: "incoming",
      contact: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      duration: "5:32",
      timestamp: "2024-05-20 14:30",
      status: "completed"
    },
    {
      id: "2",
      type: "outgoing",
      contact: "Green Valley Pharmacy",
      phone: "+1 (555) 987-6543",
      duration: "12:45",
      timestamp: "2024-05-20 13:15",
      status: "completed"
    },
    {
      id: "3",
      type: "missed",
      contact: "Unknown",
      phone: "+1 (555) 456-7890",
      duration: "0:00",
      timestamp: "2024-05-20 12:00",
      status: "missed"
    }
  ];

  const messages = [
    {
      id: "1",
      contact: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      message: "Hi, I wanted to check on my order status",
      timestamp: "2024-05-20 15:45",
      direction: "incoming"
    },
    {
      id: "2",
      contact: "Mike Chen",
      phone: "+1 (555) 234-5678",
      message: "Thank you for the quick delivery!",
      timestamp: "2024-05-20 14:20",
      direction: "incoming"
    }
  ];

  const messageTemplates = [
    {
      id: "appointment-reminder",
      name: "Appointment Reminder",
      content: "Dear {patient_name}, this is a reminder that you have an appointment scheduled for {date} at {time}. Please arrive 15 minutes early."
    },
    {
      id: "prescription-ready",
      name: "Prescription Ready",
      content: "Hello {patient_name}, your herbal prescription is ready for pickup. Our pharmacy is open Monday-Friday 9AM-6PM."
    }
  ];

  const handleConnect = () => {
    setIsConnected(true);
    toast({
      title: "Communication System Connected",
      description: "Successfully connected to phone and messaging services",
    });
  };

  const handleMakeCall = (phone: string) => {
    toast({
      title: "Initiating Call",
      description: `Calling ${phone}...`,
    });
  };

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
      {/* Connection Status */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Communication Hub
              </CardTitle>
              <CardDescription>
                Manage phone calls, SMS, and email communication from one place
              </CardDescription>
            </div>
            <Badge variant={isConnected ? "default" : "secondary"}>
              {isConnected ? "Connected" : "Disconnected"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {!isConnected ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Phone Service API Key" />
                <Input placeholder="Email Service API Key" type="password" />
              </div>
              <Button onClick={handleConnect} className="w-full">
                Connect Communication Services
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Today's Calls</p>
                      <p className="text-2xl font-bold">23</p>
                    </div>
                    <PhoneCall className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Messages Sent</p>
                      <p className="text-2xl font-bold">45</p>
                    </div>
                    <MessageSquare className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Emails Sent</p>
                      <p className="text-2xl font-bold">67</p>
                    </div>
                    <Mail className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Response Rate</p>
                      <p className="text-2xl font-bold">89%</p>
                    </div>
                    <Users className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {isConnected && (
        <Tabs defaultValue="compose" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="compose">Compose</TabsTrigger>
            <TabsTrigger value="calls">Phone Calls</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="compose" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Send Message</CardTitle>
                <CardDescription>Send emails, SMS, or make calls to patients</CardDescription>
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
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Communication Type</label>
                    <Select defaultValue="email">
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="call">Phone Call</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Template</label>
                  <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a template (optional)" />
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

          <TabsContent value="calls">
            <Card>
              <CardHeader>
                <CardTitle>Phone Call History</CardTitle>
                <CardDescription>View and manage your call history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="Search calls..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Type</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {callLogs.map((call) => (
                          <TableRow key={call.id}>
                            <TableCell>
                              {call.type === 'incoming' && <PhoneIncoming className="w-4 h-4 text-green-500" />}
                              {call.type === 'outgoing' && <PhoneOutgoing className="w-4 h-4 text-blue-500" />}
                              {call.type === 'missed' && <PhoneIncoming className="w-4 h-4 text-red-500" />}
                            </TableCell>
                            <TableCell className="font-medium">{call.contact}</TableCell>
                            <TableCell>{call.phone}</TableCell>
                            <TableCell>{call.duration}</TableCell>
                            <TableCell>{call.timestamp}</TableCell>
                            <TableCell>
                              <Badge variant={
                                call.status === 'completed' ? 'default' : 
                                call.status === 'missed' ? 'destructive' : 'secondary'
                              }>
                                {call.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleMakeCall(call.phone)}
                                >
                                  <PhoneCall className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={handleSendMessage}
                                >
                                  <MessageSquare className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>View sent and received messages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{message.contact}</h3>
                          <p className="text-sm text-gray-600">{message.phone}</p>
                        </div>
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                      </div>
                      <p className="text-sm">{message.message}</p>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm">Reply</Button>
                        <Button variant="outline" size="sm">
                          <PhoneCall className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates">
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
        </Tabs>
      )}
    </div>
  );
};

export default CommunicationHub;
