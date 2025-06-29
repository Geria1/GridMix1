import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Lightbulb, Home, Zap, Thermometer, Cpu, Car, Leaf, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EnergyTip {
  id: number;
  title: string;
  description: string;
  savings: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Heating' | 'Lighting' | 'Appliances' | 'Transport' | 'General';
  icon: React.ReactNode;
  estimatedCost: string;
  carbonSaving: string;
}

const energyTips: EnergyTip[] = [
  {
    id: 1,
    title: "Switch to LED Bulbs",
    description: "Replace incandescent bulbs with LED alternatives. LEDs use 75% less energy and last 25 times longer.",
    savings: "£40-80/year",
    difficulty: "Easy",
    category: "Lighting",
    icon: <Lightbulb className="w-6 h-6" />,
    estimatedCost: "£5-15 per bulb",
    carbonSaving: "200kg CO₂/year"
  },
  {
    id: 2,
    title: "Smart Thermostat Installation",
    description: "Install a programmable smart thermostat to automatically adjust heating when you're away or sleeping.",
    savings: "10-23% on heating bills",
    difficulty: "Medium",
    category: "Heating",
    icon: <Thermometer className="w-6 h-6" />,
    estimatedCost: "£100-250",
    carbonSaving: "500kg CO₂/year"
  },
  {
    id: 3,
    title: "Unplug Standby Devices",
    description: "Electronics in standby mode still consume power. Unplug chargers, TVs, and computers when not in use.",
    savings: "£30-50/year",
    difficulty: "Easy",
    category: "Appliances",
    icon: <Zap className="w-6 h-6" />,
    estimatedCost: "Free",
    carbonSaving: "150kg CO₂/year"
  },
  {
    id: 4,
    title: "Improve Home Insulation",
    description: "Add loft insulation, seal windows and doors to reduce heat loss. Can cut heating bills significantly.",
    savings: "£200-400/year",
    difficulty: "Hard",
    category: "Heating",
    icon: <Home className="w-6 h-6" />,
    estimatedCost: "£300-1,500",
    carbonSaving: "1,200kg CO₂/year"
  },
  {
    id: 5,
    title: "Energy-Efficient Appliances",
    description: "Choose A++ rated appliances when replacing old ones. They use significantly less electricity.",
    savings: "£100-200/year",
    difficulty: "Medium",
    category: "Appliances",
    icon: <Cpu className="w-6 h-6" />,
    estimatedCost: "Varies by appliance",
    carbonSaving: "400kg CO₂/year"
  },
  {
    id: 6,
    title: "Walk, Cycle, or Use Public Transport",
    description: "Reduce car journeys by walking, cycling, or using public transport for short trips.",
    savings: "£500-1,000/year",
    difficulty: "Easy",
    category: "Transport",
    icon: <Car className="w-6 h-6" />,
    estimatedCost: "Free to £100/month transport",
    carbonSaving: "800kg CO₂/year"
  },
  {
    id: 7,
    title: "Wash Clothes at 30°C",
    description: "Modern detergents work well at lower temperatures. Washing at 30°C uses 40% less energy than 40°C.",
    savings: "£25-35/year",
    difficulty: "Easy",
    category: "Appliances",
    icon: <Leaf className="w-6 h-6" />,
    estimatedCost: "Free",
    carbonSaving: "100kg CO₂/year"
  },
  {
    id: 8,
    title: "Draft-Proof Your Home",
    description: "Seal gaps around windows, doors, and floorboards to prevent warm air escaping.",
    savings: "£20-40/year",
    difficulty: "Easy",
    category: "Heating",
    icon: <Home className="w-6 h-6" />,
    estimatedCost: "£20-50",
    carbonSaving: "120kg CO₂/year"
  }
];

const categoryColors = {
  Heating: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  Lighting: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Appliances: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Transport: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  General: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
};

const difficultyColors = {
  Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Medium: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
};

export function EnergySavingTipsCarousel() {
  const [currentTip, setCurrentTip] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % energyTips.length);
    }, 6000); // Auto-advance every 6 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % energyTips.length);
    setIsAutoPlaying(false);
  };

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + energyTips.length) % energyTips.length);
    setIsAutoPlaying(false);
  };

  const goToTip = (index: number) => {
    setCurrentTip(index);
    setIsAutoPlaying(false);
  };

  const tip = energyTips[currentTip];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Energy Saving Tips
        </h3>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {currentTip + 1} of {energyTips.length}
        </div>
      </div>

      <Card className="relative overflow-hidden bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-green-200 dark:border-green-800">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                {tip.icon}
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {tip.title}
                </h4>
                <div className="flex gap-2">
                  <Badge className={categoryColors[tip.category]}>
                    {tip.category}
                  </Badge>
                  <Badge className={difficultyColors[tip.difficulty]}>
                    {tip.difficulty}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {tip.savings}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Potential savings
              </div>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            {tip.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <DollarSign className="w-4 h-4 text-blue-500" />
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Cost
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {tip.estimatedCost}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <Leaf className="w-4 h-4 text-green-500" />
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Carbon Saved
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {tip.carbonSaving}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <Zap className="w-4 h-4 text-orange-500" />
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Difficulty
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {tip.difficulty}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTip}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            {/* Dot Indicators */}
            <div className="flex gap-2">
              {energyTips.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTip(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTip
                      ? 'bg-green-500'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextTip}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Auto-play indicator */}
          {isAutoPlaying && (
            <div className="mt-3 text-center">
              <div className="inline-flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Auto-advancing tips
                <button
                  onClick={() => setIsAutoPlaying(false)}
                  className="text-blue-500 hover:text-blue-600 underline"
                >
                  Stop
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}