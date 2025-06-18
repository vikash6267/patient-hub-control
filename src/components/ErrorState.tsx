
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

const ErrorState = ({ 
  title = "Something went wrong", 
  message = "We encountered an error while loading the content. Please try again.",
  onRetry,
  showRetry = true 
}: ErrorStateProps) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="max-w-md w-full mx-4">
        <CardContent className="pt-6 text-center">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-6">{message}</p>
          {showRetry && onRetry && (
            <Button onClick={onRetry} className="bg-green-600 hover:bg-green-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorState;
