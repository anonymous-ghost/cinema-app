import { Card, CardContent } from "@/components/ui/MovieCard";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex gap-2 justify-center">
            <AlertCircle className="h-8 w-8" />
            <h1 className="text-2xl font-bold text-white">404 / Page Not Found</h1>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
