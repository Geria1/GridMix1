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
        <div className="space-y-8">
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
                    I started out as a <strong>Chemical Engineer</strong>, then went on to earn an <strong>MSc in Sustainable Energy & Entrepreneurship</strong> at the University of Nottingham. That mix of science and business gave me a real appreciation for both sides of the energy transition — how it works technically, and how it scales in the real world.
                  </p>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    I currently work in the <strong>UK renewable energy sector</strong>, where I've had a front-row seat to how fast things are changing. From Solar farms breaking generation records to new storage technologies reshaping how the grid stays balanced — it's an exciting, evolving space that impacts all of us.
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
                    GridMix started as a mix of curiosity and frustration — curiosity about how our electricity system really works, and frustration at how difficult it was to find clear, accessible data about it.
                  </p>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    I wanted to make energy data not just available — but understandable and useful. Whether you're a policymaker tracking renewable progress, a researcher exploring energy trends, or just someone who wants to know when the grid is at its cleanest, GridMix is an attempt to make it possible.
                  </p>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    At its core, GridMix is about making the invisible visible — turning raw data into insights you can actually use to make smarter, greener decisions.
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
                  To give everyone — not just experts — a clear window into how the UK's energy grid is evolving toward net-zero. The aim is simple: take something complex and make it meaningful, visual, and actionable.
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
                  When I'm not buried in energy models or datasets, you'll probably find me listening to <strong>audiobooks</strong> or <strong>podcasts</strong> about tech, business, or the future of energy. And lately, I've been spending my evenings at the driving range, still trying to get that perfect golf swing (it's definitely a work in progress).
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
      </div>
    </div>
  );
}