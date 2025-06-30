import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import profileImage from "@assets/IMG_0090_1751238030881.jpeg";

export default function AboutMe() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section with Profile */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Profile Image - Left Column */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <img 
                  src={profileImage} 
                  alt="John Igwebuike - GridMix Creator"
                  className="w-64 h-64 rounded-full object-cover shadow-2xl border-8 border-white dark:border-gray-700"
                />
                <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-700">
                  <span className="text-white font-bold text-xl">⚡</span>
                </div>
              </div>
            </div>
            
            {/* Introduction Text - Right Columns */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Hey, I'm John Igwebuike
              </h1>
              <p className="text-2xl text-gray-600 dark:text-gray-300 mb-6 font-light">
                The mind behind GridMix
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                <Badge variant="secondary" className="px-4 py-2 text-sm">Chemical Engineer</Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">Sustainable Energy MSc</Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">Energy Sector Professional</Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
                Passionate about clean energy, open data, and building tools that make complex energy systems 
                accessible to everyone. GridMix is my way of democratizing access to real-time UK energy insights.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Professional Journey */}
            <Card className="border-gray-200 dark:border-gray-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">🎓</span>
                  </div>
                  My Professional Journey
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    I trained as a <strong>Chemical Engineer</strong> and went on to earn an <strong>MSc in Sustainable Energy & Entrepreneurship</strong> at the University of Nottingham. This academic foundation gave me a deep understanding of both the technical and business aspects of the energy transition.
                  </p>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    Currently working in the <strong>UK renewable energy sector</strong>, I've witnessed firsthand how rapidly our energy landscape is evolving. From wind farms generating record amounts of clean electricity to innovative storage solutions transforming grid stability, these changes are reshaping how we think about energy every single day.
                  </p>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    I also have a strong interest in <strong>property entrepreneurship</strong>, which has taught me valuable lessons about making complex markets more transparent and accessible—lessons I've applied directly to GridMix's design and user experience.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Vision & Mission */}
            <Card className="border-gray-200 dark:border-gray-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">🎯</span>
                  </div>
                  The Vision Behind GridMix
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    GridMix emerged from my curiosity about <strong>climate policy</strong>, <strong>renewable energy science</strong>, 
                    and a firm belief that everyone should have easy access to real-time, transparent insights into how our energy grid is changing.
                  </p>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      "To make energy data not just accessible — but understandable and actionable. Whether you're a policy maker tracking renewable progress, a researcher analyzing trends, or simply someone curious about where your electricity comes from."
                    </p>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    GridMix is my way of helping others explore and make sense of the energy transition happening all around us. 
                    Every chart, every data point, every insight is designed to make the invisible visible.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Vision & Goal */}
            <Card className="border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  My Goal with GridMix
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  To make energy data not just accessible — but understandable and actionable. 
                  Whether you're a policy maker tracking renewable progress, a researcher analyzing trends, 
                  or simply someone curious about where your electricity comes from, GridMix aims to provide 
                  clear, real-time insights into the UK's journey toward net-zero.
                </p>
              </CardContent>
            </Card>

            {/* Personal Touch */}
            <Card className="border-gray-200 dark:border-gray-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">🏌️</span>
                  </div>
                  Beyond the Data
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Outside of work, I'm usually listening to <strong>audiobooks</strong> or <strong>podcasts</strong>—there's always something new to learn about technology, business, or the energy sector. And while I'm still getting the hang of it, you'll often find me at the driving range in the evenings, working on my golf swing.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl mb-2">📚</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Audiobooks</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl mb-2">🎧</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Podcasts</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl mb-2">⛳</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Golf</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl mb-2">📊</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Open Data</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="border-gray-200 dark:border-gray-700 shadow-lg bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">💬</span>
                  </div>
                  Get In Touch
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  I'd love to hear your thoughts on GridMix, suggestions for improvements, or ideas for new features. 
                  Feel free to reach out if you have questions about the data, want to collaborate, or just want to chat about the energy transition.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg">
                    📧 hello@gridmix.co.uk
                  </Button>
                  <a href="https://gridmix.co.uk" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 px-6 py-3 text-lg">
                      View Dashboard →
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
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

            {/* Interests */}
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
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="outline" className="block text-center">Audiobooks</Badge>
                  <Badge variant="outline" className="block text-center">Podcasts</Badge>
                  <Badge variant="outline" className="block text-center">Golf</Badge>
                  <Badge variant="outline" className="block text-center">Open Data</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                  GridMix at a Glance
                </CardTitle>
              </CardHeader>
              <CardContent>
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
      </div>
    </div>
  );
}