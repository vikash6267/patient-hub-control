
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Phone, PhoneCall, MessageSquare, Users, Settings, PhoneIncoming, PhoneOutgoing } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RingCentralIntegration = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isConnected, setIsConnected] = useState(false);
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

  const handleConnect = () => {
    setIsConnected(true);
    toast({
      title: "RingCentral Connected",
      description: "Successfully connected to RingCentral API",
    });
  };

  const handleMakeCall = (phone: string) => {
    toast({
      title: "Initiating Call",
      description: `Calling ${phone}...`,
    });
  };

  const handleSendMessage = (phone: string) => {
    toast({
      title: "Message Sent",
      description: `SMS sent to ${phone}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                RingCentral Integration
              </CardTitle>
              <CardDescription>
                Manage phone calls, SMS, and communication from your admin panel
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
                <Input placeholder="Client ID" />
                <Input placeholder="Client Secret" type="password" />
              </div>
              <Button onClick={handleConnect} className="w-full">
                Connect to RingCentral
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
                      <p className="text-sm text-gray-600">Messages</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                    <MessageSquare className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Missed Calls</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                    <PhoneIncoming className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Call Duration</p>
                      <p className="text-2xl font-bold">2.5h</p>
                    </div>
                    <PhoneOutgoing className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {isConnected && (
        <Tabs defaultValue="calls" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="calls">Call Logs</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
          </TabsList>

          <TabsContent value="calls">
            <Card>
              <CardHeader>
                <CardTitle>Recent Calls</CardTitle>
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
                                  onClick={() => handleSendMessage(call.phone)}
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
                <CardTitle>SMS Messages</CardTitle>
                <CardDescription>Send and receive SMS messages</CardDescription>
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

          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle>Contact Management</CardTitle>
                <CardDescription>Manage your RingCentral contacts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Contact management coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default RingCentralIntegration;
