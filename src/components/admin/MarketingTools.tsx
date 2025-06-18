
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Megaphone, Mail, Users, TrendingUp, Calendar, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MarketingTools = () => {
  const [campaignName, setCampaignName] = useState("");
  const [campaignContent, setCampaignContent] = useState("");
  const { toast } = useToast();

  const campaigns = [
    {
      id: "1",
      name: "Spring Wellness Campaign",
      type: "email",
      status: "active",
      recipients: 850,
      openRate: "24%",
      clickRate: "8%",
      sentDate: "2024-05-15"
    },
    {
      id: "2",
      name: "New Product Launch - Stress Relief",
      type: "email",
      status: "completed",
      recipients: 1200,
      openRate: "32%",
      clickRate: "12%",
      sentDate: "2024-05-10"
    },
    {
      id: "3",
      name: "Monthly Newsletter",
      type: "email",
      status: "draft",
      recipients: 0,
      openRate: "0%",
      clickRate: "0%",
      sentDate: ""
    }
  ];

  const handleCreateCampaign = () => {
    if (!campaignName || !campaignContent) {
      toast({
        title: "Error",
        description: "Please enter campaign name and content.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Campaign Created",
      description: `Campaign "${campaignName}" has been created successfully.`,
    });

    setCampaignName("");
    setCampaignContent("");
  };

  return (
    <div className="space-y-6">
      {/* Marketing Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">1,247</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Open Rate</CardTitle>
            <Mail className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">28%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">10%</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="create">Create Campaign</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="segments">Segments</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create Marketing Campaign</CardTitle>
              <CardDescription>Design and launch targeted marketing campaigns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Campaign Name</label>
                  <Input
                    placeholder="Enter campaign name"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Campaign Type</label>
                  <Select defaultValue="email">
                    <SelectTrigger>
                      <SelectValue placeholder="Select campaign type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email Campaign</SelectItem>
                      <SelectItem value="sms">SMS Campaign</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="newsletter">Newsletter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Target Audience</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience segment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Patients</SelectItem>
                      <SelectItem value="active">Active Patients</SelectItem>
                      <SelectItem value="inactive">Inactive Patients</SelectItem>
                      <SelectItem value="new">New Patients</SelectItem>
                      <SelectItem value="custom">Custom Segment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Schedule</label>
                  <Select defaultValue="now">
                    <SelectTrigger>
                      <SelectValue placeholder="When to send" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="now">Send Now</SelectItem>
                      <SelectItem value="schedule">Schedule for Later</SelectItem>
                      <SelectItem value="recurring">Recurring Campaign</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Subject Line</label>
                <Input placeholder="Enter email subject line" />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Campaign Content</label>
                <Textarea
                  placeholder="Enter your campaign content here..."
                  value={campaignContent}
                  onChange={(e) => setCampaignContent(e.target.value)}
                  rows={8}
                />
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Use personalization tags: {"{name}"}, {"{email}"}, {"{last_visit}"}
                </div>
                <div className="space-x-2">
                  <Button variant="outline">Save Draft</Button>
                  <Button onClick={handleCreateCampaign}>
                    Launch Campaign
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Marketing Campaigns</CardTitle>
              <CardDescription>View and manage your marketing campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">{campaign.name}</h3>
                        <p className="text-sm text-gray-600">
                          {campaign.type.charAt(0).toUpperCase() + campaign.type.slice(1)} Campaign
                        </p>
                      </div>
                      <Badge variant={
                        campaign.status === 'active' ? 'default' :
                        campaign.status === 'completed' ? 'secondary' : 'outline'
                      }>
                        {campaign.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Recipients:</span>
                        <p className="font-medium">{campaign.recipients}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Open Rate:</span>
                        <p className="font-medium">{campaign.openRate}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Click Rate:</span>
                        <p className="font-medium">{campaign.clickRate}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Sent Date:</span>
                        <p className="font-medium">{campaign.sentDate || 'Not sent'}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">Edit</Button>
                      {campaign.status === 'draft' && (
                        <Button variant="default" size="sm">Launch</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audience Segments</CardTitle>
              <CardDescription>Create and manage patient segments for targeted campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Target className="w-5 h-5 text-blue-500" />
                        <Badge>425 patients</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-semibold mb-2">Active Patients</h3>
                      <p className="text-sm text-gray-600">Patients with visits in the last 3 months</p>
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Target className="w-5 h-5 text-green-500" />
                        <Badge>156 patients</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-semibold mb-2">New Patients</h3>
                      <p className="text-sm text-gray-600">Patients registered in the last 30 days</p>
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Target className="w-5 h-5 text-orange-500" />
                        <Badge>230 patients</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-semibold mb-2">Inactive Patients</h3>
                      <p className="text-sm text-gray-600">Patients with no visits in 6+ months</p>
                    </CardContent>
                  </Card>
                </div>

                <Button className="w-full">
                  Create New Segment
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Marketing Analytics</CardTitle>
              <CardDescription>Track the performance of your marketing efforts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border">
                    <CardHeader>
                      <CardTitle className="text-lg">Email Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Total Emails Sent</span>
                          <span className="font-semibold">2,450</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Average Open Rate</span>
                          <span className="font-semibold text-green-600">28%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Average Click Rate</span>
                          <span className="font-semibold text-blue-600">10%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Unsubscribe Rate</span>
                          <span className="font-semibold text-red-600">1.2%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardHeader>
                      <CardTitle className="text-lg">Campaign ROI</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Total Campaign Cost</span>
                          <span className="font-semibold">$450</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Revenue Generated</span>
                          <span className="font-semibold text-green-600">$3,200</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Return on Investment</span>
                          <span className="font-semibold text-green-600">611%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cost per Acquisition</span>
                          <span className="font-semibold">$18</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border">
                  <CardHeader>
                    <CardTitle className="text-lg">Top Performing Campaigns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>New Product Launch - Stress Relief</span>
                        <Badge variant="default">32% open rate</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Spring Wellness Campaign</span>
                        <Badge variant="secondary">24% open rate</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Holiday Special Offers</span>
                        <Badge variant="outline">19% open rate</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketingTools;
