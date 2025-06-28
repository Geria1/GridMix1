import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Blog() {
  const featuredPosts = [
    {
      title: "How Wind Became the UK's Top Power Source This Winter",
      excerpt: "Exploring the factors behind wind energy's dominance in the UK electricity mix during winter 2024-2025.",
      date: "December 15, 2024",
      tags: ["Wind", "Trends"],
      readTime: "5 min read"
    },
    {
      title: "Behind the Numbers: Understanding BMRS API Data",
      excerpt: "A deep dive into how the UK's electricity market data is collected, processed, and made available through official APIs.",
      date: "November 28, 2024",
      tags: ["Data", "Technical"],
      readTime: "8 min read"
    },
    {
      title: "The Role of Onshore Wind in Wales' 2030 Goals",
      excerpt: "Analyzing Wales' renewable energy targets and the contribution of onshore wind farms to national decarbonization.",
      date: "November 10, 2024",
      tags: ["Wind", "Policy", "Wales"],
      readTime: "6 min read"
    }
  ];

  const tags = ["Wind", "Solar", "Policy", "Data", "Trends", "Nuclear", "Gas", "Regional"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            GridMix Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Insights, updates, and analysis from the UK energy system
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Posts */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Posts</h2>
              <div className="space-y-6">
                {featuredPosts.map((post, index) => (
                  <Card key={index} className="border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {post.title}
                          </CardTitle>
                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                            <span>{post.date}</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
                          Read more →
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Coming Soon */}
            <Card className="border-gray-200 dark:border-gray-700">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  More Articles Coming Soon
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We're working on bringing you more insights about the UK's energy transition, 
                  data analysis techniques, and policy developments.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input 
                    placeholder="Enter your email" 
                    className="flex-1"
                  />
                  <Button>
                    Subscribe for Updates
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Newsletter Signup */}
            <Card className="border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                  Stay Updated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Get notified when we publish new articles about UK energy trends and analysis.
                </p>
                <div className="space-y-3">
                  <Input placeholder="Your email address" />
                  <Button className="w-full">
                    Sign up for updates
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tag Filters */}
            <Card className="border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                  Browse by Topic
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Energy Stats */}
            <Card className="border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Wind Share Today:</span>
                    <span className="font-medium text-gray-900 dark:text-white">~60%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Renewable Share:</span>
                    <span className="font-medium text-gray-900 dark:text-white">~67%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Grid Demand:</span>
                    <span className="font-medium text-gray-900 dark:text-white">29.8 GW</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                    <Button variant="ghost" size="sm" className="w-full text-blue-600 dark:text-blue-400">
                      View Live Dashboard →
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