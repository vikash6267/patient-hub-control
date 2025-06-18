
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bell, Mail, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StockAlertProps {
  productId: number;
  productName: string;
  isInStock: boolean;
}

const StockAlert = ({ productId, productName, isInStock }: StockAlertProps) => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const alerts = localStorage.getItem("stockAlerts");
    if (alerts) {
      const alertList = JSON.parse(alerts);
      setIsSubscribed(alertList.some((alert: any) => alert.productId === productId));
    }
  }, [productId]);

  const handleSubscribe = () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }

    const alerts = localStorage.getItem("stockAlerts");
    const alertList = alerts ? JSON.parse(alerts) : [];
    
    const newAlert = {
      productId,
      productName,
      email,
      subscribedAt: new Date().toISOString()
    };

    alertList.push(newAlert);
    localStorage.setItem("stockAlerts", JSON.stringify(alertList));
    setIsSubscribed(true);

    toast({
      title: "Stock Alert Set!",
      description: `We'll email you at ${email} when ${productName} is back in stock.`
    });
  };

  const handleUnsubscribe = () => {
    const alerts = localStorage.getItem("stockAlerts");
    if (alerts) {
      const alertList = JSON.parse(alerts);
      const filtered = alertList.filter((alert: any) => alert.productId !== productId);
      localStorage.setItem("stockAlerts", JSON.stringify(filtered));
      setIsSubscribed(false);

      toast({
        title: "Alert Removed",
        description: "Stock alert has been removed."
      });
    }
  };

  if (isInStock) return null;

  return (
    <Card className="border-amber-200 bg-amber-50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-amber-900 flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Get Notified When Back in Stock
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isSubscribed ? (
          <div className="space-y-4">
            <p className="text-sm text-amber-800">
              Enter your email to be notified when this product is available again.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-amber-200 focus:border-amber-500"
              />
              <Button
                onClick={handleSubscribe}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                <Mail className="w-4 h-4 mr-2" />
                Notify Me
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center text-amber-800">
              <Bell className="w-4 h-4 mr-2" />
              <span className="text-sm">You'll be notified when this item is back in stock.</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleUnsubscribe}
              className="text-amber-700 hover:text-amber-800"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StockAlert;
