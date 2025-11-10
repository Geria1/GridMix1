import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { GraduationCap, Target, HandIcon, Mail, BookOpen, Headphones, Flag, BarChart3, Settings, Briefcase, Zap, Lightbulb } from "lucide-react";
import profileImage from "@assets/IMG_0090_1751238030881.jpeg";

export default function AboutMe() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 mesh-gradient">
      {/* Modern Hero Section with Profile */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-600 to-emerald-600 dark:from-blue-900 dark:via-cyan-900 dark:to-emerald-900">
        {/* Animated background orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Profile Image - Left Column */}
            <div className="flex justify-center lg:justify-start fade-in">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
                <img
                  src={profileImage}
                  alt="John Igwebuike - GridMix Creator"
                  className="relative w-72 h-72 rounded-full object-cover shadow-2xl border-8 border-white/50 backdrop-blur-xl transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center border-4 border-white/50 backdrop-blur-xl shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  <Zap className="w-10 h-10 text-white" fill="white" />
                </div>
              </div>
            </div>

            {/* Introduction Text - Right Columns */}
            <div className="lg:col-span-2 text-center lg:text-left space-y-6 slide-up">
              <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 mb-4 scale-in">
                <span className="text-sm font-semibold text-white flex items-center gap-2">
                  <HandIcon className="w-4 h-4" />
                  Meet the Creator
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                John Igwebuike
              </h1>
              <p className="text-2xl md:text-3xl text-white/90 mb-6 font-light">
                The mind behind GridMix
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                <Badge className="bg-white/20 backdrop-blur-xl border border-white/30 text-white hover:bg-white/30 transition-all duration-300 hover:scale-105 px-4 py-2 text-sm">
                  Chemical Engineer
                </Badge>
                <Badge className="bg-white/20 backdrop-blur-xl border border-white/30 text-white hover:bg-white/30 transition-all duration-300 hover:scale-105 px-4 py-2 text-sm">
                  Sustainable Energy MSc
                </Badge>
                <Badge className="bg-white/20 backdrop-blur-xl border border-white/30 text-white hover:bg-white/30 transition-all duration-300 hover:scale-105 px-4 py-2 text-sm">
                  Energy Sector Professional
                </Badge>
              </div>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
                Passionate about clean energy, open data, and building tools that make complex energy systems accessible to everyone. GridMix is my way of democratizing access to real-time UK energy insights.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8 fade-in">
            {/* Professional Journey */}
            <Card className="bento-card hover:-translate-y-2 overflow-hidden">
              <div className="relative bg-gradient-to-br from-blue-600/10 via-cyan-600/10 to-emerald-600/10 dark:from-blue-600/20 dark:via-cyan-600/20 dark:to-emerald-600/20 p-8 border-b border-white/20 dark:border-gray-700/30">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
                <CardTitle className="relative text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <GraduationCap className="w-7 h-7 text-white" />
                  </div>
                  My Professional Journey
                </CardTitle>
              </div>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    I started out as a <strong className="text-blue-600 dark:text-blue-400">Chemical Engineer</strong>, then went on to earn an <strong className="text-cyan-600 dark:text-cyan-400">MSc in Sustainable Energy & Entrepreneurship</strong> at the University of Nottingham. That mix of science and business gave me a real appreciation for both sides of the energy transition — how it works technically, and how it scales in the real world.
                  </p>

                  <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    I currently work in the <strong className="text-emerald-600 dark:text-emerald-400">UK renewable energy sector</strong>, where I've had a front-row seat to how fast things are changing. From Solar farms breaking generation records to new storage technologies reshaping how the grid stays balanced — it's an exciting, evolving space that impacts all of us.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Vision & Mission */}
            <Card className="bento-card hover:-translate-y-2 overflow-hidden">
              <div className="relative bg-gradient-to-br from-emerald-600/10 via-green-600/10 to-cyan-600/10 dark:from-emerald-600/20 dark:via-green-600/20 dark:to-cyan-600/20 p-8 border-b border-white/20 dark:border-gray-700/30">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-full blur-3xl"></div>
                <CardTitle className="relative text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  The Vision Behind GridMix
                </CardTitle>
              </div>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    GridMix started as a mix of curiosity and frustration — curiosity about how our electricity system really works, and frustration at how difficult it was to find clear, accessible data about it.
                  </p>

                  <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    I wanted to make energy data not just available — but <strong className="text-emerald-600 dark:text-emerald-400">understandable and useful</strong>. Whether you're a policymaker tracking renewable progress, a researcher exploring energy trends, or just someone who wants to know when the grid is at its cleanest, GridMix is an attempt to make it possible.
                  </p>

                  <div className="bg-gradient-to-br from-blue-50/80 to-emerald-50/80 dark:from-blue-950/40 dark:to-emerald-950/40 p-8 rounded-3xl border border-blue-200/50 dark:border-blue-800/30 backdrop-blur-xl shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                        <Lightbulb className="w-6 h-6 text-white" fill="white" />
                      </div>
                      <p className="text-base font-medium text-gray-800 dark:text-gray-200 leading-relaxed italic">
                        "At its core, GridMix is about making the invisible visible — turning raw data into insights you can actually use to make smarter, greener decisions."
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* My Goal with GridMix */}
            <Card className="bento-card hover:-translate-y-2 overflow-hidden">
              <div className="relative bg-gradient-to-br from-purple-600/10 via-indigo-600/10 to-blue-600/10 dark:from-purple-600/20 dark:via-indigo-600/20 dark:to-blue-600/20 p-8 border-b border-white/20 dark:border-gray-700/30">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-full blur-3xl"></div>
                <CardTitle className="relative text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  My Goal with GridMix
                </CardTitle>
              </div>
              <CardContent className="p-8">
                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  To give everyone — not just experts — a clear window into how the UK's energy grid is evolving toward net-zero. The aim is simple: take something complex and make it meaningful, visual, and actionable.
                </p>
              </CardContent>
            </Card>

            {/* Personal Touch */}
            <Card className="bento-card hover:-translate-y-2 overflow-hidden">
              <div className="relative bg-gradient-to-br from-orange-600/10 via-amber-600/10 to-yellow-600/10 dark:from-orange-600/20 dark:via-amber-600/20 dark:to-yellow-600/20 p-8 border-b border-white/20 dark:border-gray-700/30">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-full blur-3xl"></div>
                <CardTitle className="relative text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Flag className="w-7 h-7 text-white" />
                  </div>
                  Beyond the Data
                </CardTitle>
              </div>
              <CardContent className="p-8">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  When I'm not buried in energy models or datasets, you'll probably find me listening to <strong className="text-orange-600 dark:text-orange-400">audiobooks</strong> or <strong className="text-amber-600 dark:text-amber-400">podcasts</strong> about tech, business, or the future of energy. And lately, I've been spending my evenings at the driving range, still trying to get that perfect golf swing (it's definitely a work in progress).
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-5 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 rounded-2xl backdrop-blur-xl border border-blue-200/50 dark:border-blue-700/30 hover:scale-105 transition-transform duration-300 hover:shadow-lg">
                    <div className="flex justify-center mb-3">
                      <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">Audiobooks</div>
                  </div>
                  <div className="text-center p-5 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 rounded-2xl backdrop-blur-xl border border-purple-200/50 dark:border-purple-700/30 hover:scale-105 transition-transform duration-300 hover:shadow-lg">
                    <div className="flex justify-center mb-3">
                      <Headphones className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">Podcasts</div>
                  </div>
                  <div className="text-center p-5 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/20 rounded-2xl backdrop-blur-xl border border-emerald-200/50 dark:border-emerald-700/30 hover:scale-105 transition-transform duration-300 hover:shadow-lg">
                    <div className="flex justify-center mb-3">
                      <Flag className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">Golf</div>
                  </div>
                  <div className="text-center p-5 bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/30 dark:to-cyan-800/20 rounded-2xl backdrop-blur-xl border border-cyan-200/50 dark:border-cyan-700/30 hover:scale-105 transition-transform duration-300 hover:shadow-lg">
                    <div className="flex justify-center mb-3">
                      <BarChart3 className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">Open Data</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="bento-card hover:-translate-y-2 overflow-hidden">
              <div className="relative bg-gradient-to-br from-blue-600/10 via-cyan-600/10 to-emerald-600/10 dark:from-blue-600/20 dark:via-cyan-600/20 dark:to-emerald-600/20 p-8 border-b border-white/20 dark:border-gray-700/30">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
                <CardTitle className="relative text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  Get In Touch
                </CardTitle>
              </div>
              <CardContent className="p-8">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  I'd love to hear your thoughts on GridMix, suggestions for improvements, or ideas for new features.
                  Feel free to reach out if you have questions about the data, want to collaborate, or just want to chat about the energy transition.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-6 text-lg rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl flex items-center justify-center gap-2">
                    <Mail className="w-5 h-5" />
                    hello@gridmix.co.uk
                  </Button>
                  <a href="https://gridmix.co.uk" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button className="w-full bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-700/40 px-8 py-6 text-lg rounded-2xl font-semibold transition-all duration-300 hover:scale-105">
                      View Dashboard →
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 slide-up">
            <div className="sticky top-24 space-y-6">
              {/* Technical Stack */}
              <Card className="bento-card overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
                <CardHeader className="relative">
                  <CardTitle className="text-xl font-bold gradient-text-energy flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Tools & Technologies
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 relative">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    Full-stack application built with modern technologies and AI assistance, using live data from official UK energy APIs.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Backend</div>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 text-green-700 dark:text-green-300 border-0 text-xs hover:scale-105 transition-transform">Node.js</Badge>
                        <Badge className="bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-900/40 dark:to-slate-900/40 text-gray-700 dark:text-gray-300 border-0 text-xs hover:scale-105 transition-transform">Express</Badge>
                        <Badge className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-700 dark:text-blue-300 border-0 text-xs hover:scale-105 transition-transform">TypeScript</Badge>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Database</div>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-gradient-to-r from-blue-100 to-sky-100 dark:from-blue-900/40 dark:to-sky-900/40 text-blue-700 dark:text-blue-300 border-0 text-xs hover:scale-105 transition-transform">PostgreSQL</Badge>
                        <Badge className="bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40 text-emerald-700 dark:text-emerald-300 border-0 text-xs hover:scale-105 transition-transform">Drizzle ORM</Badge>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Data Sources</div>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 text-blue-700 dark:text-blue-300 border-0 text-xs hover:scale-105 transition-transform">Elexon Insights API</Badge>
                        <Badge className="bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/40 dark:to-green-900/40 text-emerald-700 dark:text-emerald-300 border-0 text-xs hover:scale-105 transition-transform">Carbon Intensity API</Badge>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Frontend</div>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-gradient-to-r from-cyan-100 to-sky-100 dark:from-cyan-900/40 dark:to-sky-900/40 text-cyan-700 dark:text-cyan-300 border-0 text-xs hover:scale-105 transition-transform">React</Badge>
                        <Badge className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-700 dark:text-blue-300 border-0 text-xs hover:scale-105 transition-transform">TypeScript</Badge>
                        <Badge className="bg-gradient-to-r from-teal-100 to-cyan-100 dark:from-teal-900/40 dark:to-cyan-900/40 text-teal-700 dark:text-teal-300 border-0 text-xs hover:scale-105 transition-transform">Tailwind CSS</Badge>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Charts</div>
                      <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 text-purple-700 dark:text-purple-300 border-0 text-xs hover:scale-105 transition-transform">Recharts</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Professional Background */}
              <Card className="bento-card overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 rounded-full blur-2xl"></div>
                <CardHeader className="relative">
                  <CardTitle className="text-xl font-bold gradient-text-energy flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Professional Background
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 relative">
                  <div className="space-y-3">
                    <Badge className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/30 hover:scale-105 transition-all duration-300 block text-center py-2">Chemical Engineering</Badge>
                    <Badge className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-700/30 hover:scale-105 transition-all duration-300 block text-center py-2">Sustainable Energy MSc</Badge>
                    <Badge className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 text-teal-700 dark:text-teal-300 border border-teal-200/50 dark:border-teal-700/30 hover:scale-105 transition-all duration-300 block text-center py-2">Renewable Energy Sector</Badge>
                    <Badge className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-700/30 hover:scale-105 transition-all duration-300 block text-center py-2">Property Entrepreneurship</Badge>
                    <Badge className="bg-gradient-to-r from-cyan-50 to-sky-50 dark:from-cyan-900/30 dark:to-sky-900/30 text-cyan-700 dark:text-cyan-300 border border-cyan-200/50 dark:border-cyan-700/30 hover:scale-105 transition-all duration-300 block text-center py-2">Climate Policy</Badge>
                    <Badge className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 border border-green-200/50 dark:border-green-700/30 hover:scale-105 transition-all duration-300 block text-center py-2">Energy Science</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* GridMix at a Glance */}
              <Card className="bento-card overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-full blur-2xl"></div>
                <CardHeader className="relative">
                  <CardTitle className="text-xl font-bold gradient-text-energy flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    GridMix at a Glance
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 relative">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Launch Date</span>
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">June 2025</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Data Updates</span>
                      <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Every 5 min</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Coverage</span>
                      <span className="text-sm font-bold text-orange-600 dark:text-orange-400">GB Grid</span>
                    </div>
                    <Link href="/">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white mt-4 rounded-2xl py-6 font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                        View Dashboard →
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}