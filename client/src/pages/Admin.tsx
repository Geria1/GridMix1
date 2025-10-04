import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useAdminMode } from "@/hooks/useAdminMode";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Shield } from "lucide-react";

export default function Admin() {
  const { isAdmin } = useAdminMode();

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Card className="border-gray-200 dark:border-gray-700">
            <CardContent className="p-12 text-center">
              <Shield className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Access Restricted
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                This page is only accessible to administrators.
              </p>
              <Link href="/">
                <Button>Return to Dashboard</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            System information and technical details
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Technical Stack */}
          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                Tools & Technologies
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Built on Replit with the help of AI assistance, using live data from official UK energy APIs.
              </p>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Platform</div>
                  <Badge variant="outline">Replit</Badge>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Data Sources</div>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">Elexon BMRS API</Badge>
                    <Badge variant="outline" className="text-xs">Carbon Intensity API</Badge>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Frontend</div>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">React</Badge>
                    <Badge variant="outline" className="text-xs">TypeScript</Badge>
                    <Badge variant="outline" className="text-xs">Tailwind CSS</Badge>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Charts</div>
                  <Badge variant="outline" className="text-xs">Recharts</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Background */}
          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                Professional Background
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-2">
                <Badge variant="secondary" className="block text-center">Chemical Engineering</Badge>
                <Badge variant="secondary" className="block text-center">Sustainable Energy MSc</Badge>
                <Badge variant="secondary" className="block text-center">Renewable Energy Sector</Badge>
                <Badge variant="secondary" className="block text-center">Property Entrepreneurship</Badge>
                <Badge variant="secondary" className="block text-center">Climate Policy</Badge>
                <Badge variant="secondary" className="block text-center">Energy Science</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Personal Interests */}
          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                Personal Interests
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-2">
                <Badge variant="outline" className="block text-center">Audiobooks</Badge>
                <Badge variant="outline" className="block text-center">Podcasts</Badge>
                <Badge variant="outline" className="block text-center">Golf</Badge>
                <Badge variant="outline" className="block text-center">Open Data</Badge>
              </div>
            </CardContent>
          </Card>

          {/* GridMix at a Glance */}
          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                GridMix at a Glance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Launch Date:</span>
                  <span className="font-medium text-gray-900 dark:text-white">June 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Data Updates:</span>
                  <span className="font-medium text-gray-900 dark:text-white">Every 5 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Coverage:</span>
                  <span className="font-medium text-gray-900 dark:text-white">GB Grid</span>
                </div>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                  <Link href="/">
                    <Button variant="ghost" size="sm" className="w-full text-blue-600 dark:text-blue-400">
                      View Dashboard →
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
