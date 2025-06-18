
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface LoadingStateProps {
  count?: number;
  type?: "products" | "product-detail";
}

const LoadingState = ({ count = 8, type = "products" }: LoadingStateProps) => {
  if (type === "product-detail") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb skeleton */}
          <Skeleton className="h-6 w-64 mb-6" />
          
          {/* Back button skeleton */}
          <Skeleton className="h-10 w-32 mb-6" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image skeleton */}
            <div className="space-y-4">
              <Skeleton className="aspect-square w-full rounded-xl" />
            </div>
            
            {/* Product info skeleton */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-full" />
              </div>
              
              <div className="flex items-center space-x-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-20" />
              </div>
              
              <div className="space-y-2">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-6 w-24" />
              </div>
              
              <div className="flex space-x-4">
                <Skeleton className="h-12 flex-1" />
                <Skeleton className="h-12 w-12" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="border-0 shadow-md bg-white rounded-xl overflow-hidden">
          <CardHeader className="pb-4">
            <Skeleton className="aspect-square w-full rounded-lg mb-4" />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-5 w-16" />
                </div>
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LoadingState;
