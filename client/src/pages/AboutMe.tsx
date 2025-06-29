import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import profileImage from "@assets/IMG_0090_1751238030881.jpeg";

export default function AboutMe() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            About Me
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            The person behind GridMix
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-gray-200 dark:border-gray-700">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-shrink-0">
                    <img 
                      src={profileImage} 
                      alt="John Igwebuike - GridMix Creator"
                      className="w-48 h-48 rounded-xl object-cover shadow-lg border-4 border-white dark:border-gray-700"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Hey, I'm John Igwebuike.
                    </h2>
                    
                    <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        I trained as a Chemical Engineer and went on to earn an MSc in Sustainable Energy & Entrepreneurship at the University of Nottingham.
                      </p>
                      
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        I'm passionate about clean energy, open data, and building tools that make complex systems easier to understand. GridMix came out of my curiosity for climate policy, renewable energy science, and a belief that everyone should have easy access to real-time, transparent insights into how the energy grid is changing—because those changes shape the way we use and think about energy every day.
                      </p>
                      
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        I work in the UK renewable energy sector and also have a strong interest in property entrepreneurship. Through my day-to-day work, I've seen how quickly the energy landscape is evolving, and I wanted to create something that helps make that shift more visible and relatable. GridMix is my way of helping others explore and make sense of the energy transition happening all around us.
                      </p>
                      
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        Outside of work, I'm usually listening to audiobooks or podcasts—and while I'm still getting the hang of it, you'll often find me at the driving range in the evenings, working on my golf swing.
                      </p>
                    </div>
                  </div>
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
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  To make energy data not just accessible — but understandable and actionable. 
                  Whether you're a policy maker tracking renewable progress, a researcher analyzing trends, 
                  or simply someone curious about where your electricity comes from, GridMix aims to provide 
                  clear, real-time insights into the UK's journey toward net-zero.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  Get In Touch
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  I'd love to hear your thoughts on GridMix, suggestions for improvements, or ideas for new features. 
                  Feel free to reach out if you have questions about the data, want to collaborate, or just want to chat about the energy transition.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Email: hello@gridmix.co.uk
                </Button>
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
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
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
              <CardContent>
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
                    <Button variant="ghost" size="sm" className="w-full text-blue-600 dark:text-blue-400">
                      View Dashboard →
                    </Button>
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