import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Map, TrendingUp, Database, CheckCircle2, Activity, Shield } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 mesh-gradient">
      {/* Modern Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-600 to-emerald-600 dark:from-blue-900 dark:via-cyan-900 dark:to-emerald-900">
        {/* Animated background orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28">
          <div className="text-center space-y-6">
            <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 mb-4 scale-in">
              <span className="text-sm font-semibold text-white flex items-center gap-2 justify-center">
                <Zap className="w-4 h-4" />
                Real-Time UK Energy Data
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 fade-in">
              About GridMix
            </h1>

            <p className="text-2xl md:text-3xl text-white/90 max-w-3xl mx-auto slide-up">
              Powering Transparency in the UK Energy Transition
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
        {/* Main Description */}
        <Card className="bento-card hover:-translate-y-2 overflow-hidden fade-in">
          <div className="relative bg-gradient-to-br from-blue-600/10 via-cyan-600/10 to-emerald-600/10 dark:from-blue-600/20 dark:via-cyan-600/20 dark:to-emerald-600/20 p-8">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                GridMix is your live window into the UK's evolving electricity system. Built to track the real-time and historical performance of the national grid, GridMix offers a clear, dynamic view of how electricity is generated, consumed, and decarbonised.
              </p>

              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                From giant wind farms off the Scottish coast to solar panels soaking up sun in the south, GridMix breaks down how each energy source keeps the lights on — every hour, every season. Whether you're diving deep into policy, exploring for research, backing clean tech, or just want to understand where your power comes from, GridMix helps you follow the UK's net zero journey with ease.
              </p>
            </div>
          </div>
        </Card>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Projects Across the UK */}
          <Card className="bento-card hover:-translate-y-2 overflow-hidden">
            <div className="relative bg-gradient-to-br from-emerald-600/10 via-green-600/10 to-teal-600/10 dark:from-emerald-600/20 dark:via-green-600/20 dark:to-teal-600/20 p-6 border-b border-white/20 dark:border-gray-700/30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-full blur-3xl"></div>
              <CardTitle className="relative text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Map className="w-6 h-6 text-white" />
                </div>
                Projects Across the UK
              </CardTitle>
            </div>
            <CardContent className="p-6">
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                The Projects page features an interactive map of renewable energy developments across the UK. Sourced from the official Renewable Energy Planning Database (REPD), it shows you where solar, wind, and battery storage projects are located, their operational status, and live output when available.
              </p>
            </CardContent>
          </Card>

          {/* Carbon Intensity Forecasts */}
          <Card className="bento-card hover:-translate-y-2 overflow-hidden">
            <div className="relative bg-gradient-to-br from-purple-600/10 via-indigo-600/10 to-blue-600/10 dark:from-purple-600/20 dark:via-indigo-600/20 dark:to-blue-600/20 p-6 border-b border-white/20 dark:border-gray-700/30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-full blur-3xl"></div>
              <CardTitle className="relative text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                Carbon Intensity Forecasts
              </CardTitle>
            </div>
            <CardContent className="p-6">
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                Visit the Forecast page to view projected carbon intensity levels across the UK. These forecasts help you anticipate when the grid will be cleanest — so you can time your usage, plan grid-friendly activities, or simply stay informed.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Data Sources */}
        <Card className="bento-card hover:-translate-y-2 overflow-hidden">
          <div className="relative bg-gradient-to-br from-cyan-600/10 via-blue-600/10 to-indigo-600/10 dark:from-cyan-600/20 dark:via-blue-600/20 dark:to-indigo-600/20 p-8 border-b border-white/20 dark:border-gray-700/30">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
            <CardTitle className="relative text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Database className="w-6 h-6 text-white" />
              </div>
              Where the Data Comes From — and Why It Matters
            </CardTitle>
          </div>
          <CardContent className="p-8">
            <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              GridMix is powered by official, transparent datasets. Our core live data is sourced from Elexon's Balancing Mechanism Reporting Service (BMRS) — the UK's central platform for real-time electricity market information.
            </p>

            <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              We process and visualise this data to show:
            </p>

            <ul className="space-y-4">
              <li className="flex items-start group">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-base text-gray-700 dark:text-gray-300 pt-0.5">
                  How much electricity is generated by each source (wind, gas, nuclear, etc.)
                </span>
              </li>
              <li className="flex items-start group">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-base text-gray-700 dark:text-gray-300 pt-0.5">
                  When and where production patterns shift
                </span>
              </li>
              <li className="flex items-start group">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-base text-gray-700 dark:text-gray-300 pt-0.5">
                  Carbon intensity trends by region and time
                </span>
              </li>
              <li className="flex items-start group">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-base text-gray-700 dark:text-gray-300 pt-0.5">
                  Long-term movements in the UK energy mix
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Technical Notes & Data Sources */}
        <Card className="bento-card hover:-translate-y-2 overflow-hidden">
          <div className="relative bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-pink-600/10 dark:from-indigo-600/20 dark:via-purple-600/20 dark:to-pink-600/20 p-8 border-b border-white/20 dark:border-gray-700/30">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
            <CardTitle className="relative text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              Technical Notes & Data Sources
            </CardTitle>
          </div>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Primary Data Sources */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Primary Data Sources
                </h3>
                <div className="space-y-6">
                  <div className="bento-card border-blue-200/50 dark:border-blue-700/30 hover:scale-105 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg">Elexon BMRS API</h4>
                        <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0">Primary</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                        Official UK electricity market data including generation, demand, and system balancing information
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Updates</div>
                          <div className="text-sm text-gray-900 dark:text-white font-semibold">Every 5 min</div>
                        </div>
                        <div className="p-3 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Coverage</div>
                          <div className="text-sm text-gray-900 dark:text-white font-semibold">GB Grid</div>
                        </div>
                      </div>
                    </CardContent>
                  </div>

                  <div className="bento-card border-emerald-200/50 dark:border-emerald-700/30 hover:scale-105 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg">Carbon Intensity API</h4>
                        <Badge className="bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/40 dark:to-green-900/40 text-emerald-700 dark:text-emerald-300 border-0">Fallback</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                        National Grid ESO carbon intensity and generation mix data
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-xl">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Updates</div>
                          <div className="text-sm text-gray-900 dark:text-white font-semibold">Every 30 min</div>
                        </div>
                        <div className="p-3 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-xl">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Coverage</div>
                          <div className="text-sm text-gray-900 dark:text-white font-semibold">GB Carbon</div>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </div>

              {/* Technical Implementation */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  Technical Implementation
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-purple-50/80 to-indigo-50/80 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl border border-purple-200/50 dark:border-purple-700/30">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Data Processing:</strong>
                        <span className="text-gray-700 dark:text-gray-300"> Real-time data fetching with fallback mechanisms and validation</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-50/80 to-indigo-50/80 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl border border-purple-200/50 dark:border-purple-700/30">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Update Frequency:</strong>
                        <span className="text-gray-700 dark:text-gray-300"> Dashboard refreshes every 5 minutes during active hours</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-50/80 to-indigo-50/80 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl border border-purple-200/50 dark:border-purple-700/30">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Historical Data:</strong>
                        <span className="text-gray-700 dark:text-gray-300"> 24-hour rolling window with hourly aggregation</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-50/80 to-indigo-50/80 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl border border-purple-200/50 dark:border-purple-700/30">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-gray-900 dark:text-white">Data Quality:</strong>
                        <span className="text-gray-700 dark:text-gray-300"> Automated validation and error handling for API failures</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-6 bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-blue-950/40 dark:to-cyan-950/40 rounded-3xl border border-blue-200/50 dark:border-blue-800/30 backdrop-blur-xl shadow-lg">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white pt-1">Data Accuracy</h4>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    All data displayed comes directly from official UK energy system operators.
                    GridMix does not modify or estimate values - we present the authentic data as provided by Elexon and National Grid ESO.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}