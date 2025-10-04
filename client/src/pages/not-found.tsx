import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50/60 via-white to-red-50/40 dark:from-gray-900 dark:via-gray-850 dark:to-gray-900">
      <Card className="w-full max-w-md mx-4 shadow-xl border-gray-200/60 dark:border-gray-700/60">
        <CardContent className="p-8 md:p-10">
          <div className="flex flex-col items-center text-center space-y-5">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl flex items-center justify-center shadow-lg">
              <AlertCircle className="h-12 w-12 text-white" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                404 Page Not Found
              </h1>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
                Oops! The page you're looking for doesn't exist.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
