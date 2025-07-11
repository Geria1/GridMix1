import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Award, 
  Lightbulb,
  Car,
  Utensils,
  Home,
  ShoppingBag,
  Plus,
  BarChart3,
  Calendar
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { apiRequest } from '@/lib/queryClient';

// Mock user for demo purposes - in production this would come from auth
const DEMO_USER = {
  id: 1,
  email: 'demo@gridmix.co.uk',
  firstName: 'John',
  lastName: 'Smith'
};

interface CarbonUser {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  isActive: boolean;
}

interface UserProfile {
  id: number;
  userId: number;
  householdSize: number;
  homeType?: string;
  heatingType?: string;
  hasSmartMeter: boolean;
  annualEnergyUsage?: string;
}

interface LifestyleData {
  id: number;
  userId: number;
  category: string;
  subcategory: string;
  value: string;
  unit: string;
  frequency: string;
  date: string;
}

interface CarbonFootprint {
  id: number;
  userId: number;
  date: string;
  totalEmissions: string;
  energyEmissions: string;
  transportEmissions: string;
  dietEmissions: string;
  shoppingEmissions: string;
  gridCarbonIntensity?: string;
  energyUsage?: string;
}

interface CarbonBadge {
  id: number;
  badgeType: string;
  badgeName: string;
  description?: string;
  earnedAt: string;
}

interface CarbonInsights {
  currentIntensity: number;
  gridComposition: any;
  cleanestHours: Array<{ hour: number; intensity: number }>;
  suggestions: string[];
}

const categoryColors = {
  energy: '#10B981',
  transport: '#3B82F6', 
  diet: '#F59E0B',
  shopping: '#EF4444'
};

const categoryIcons = {
  energy: Home,
  transport: Car,
  diet: Utensils,
  shopping: ShoppingBag
};

export default function CarbonFootprint() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState('energy');
  const [newLifestyleData, setNewLifestyleData] = useState({
    category: 'energy',
    subcategory: '',
    value: '',
    unit: '',
    frequency: 'daily',
    date: new Date().toISOString().split('T')[0]
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Get user by email (the API endpoint expects this format)
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['/api/carbon/users', DEMO_USER.email],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/carbon/users/${DEMO_USER.email}`);
        if (response.status === 404) {
          return null; // User doesn't exist yet
        }
        if (!response.ok) throw new Error('Failed to fetch user');
        return response.json();
      } catch (error) {
        console.error('Error fetching user:', error);
        return null;
      }
    },
    enabled: !!DEMO_USER.email,
    retry: false,
  });

  const createUserMutation = useMutation({
    mutationFn: async (userData: any) => apiRequest('/api/carbon/users', { method: 'POST', body: userData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/carbon/users'] });
      toast({ title: 'Profile created successfully!' });
    },
  });

  // Initialize user if they don't exist
  useEffect(() => {
    if (!userLoading && !user && !createUserMutation.isPending) {
      createUserMutation.mutate({
        email: DEMO_USER.email,
        firstName: DEMO_USER.firstName,
        lastName: DEMO_USER.lastName,
      });
    }
  }, [user, userLoading]);

  // Get user profile
  const { data: profile } = useQuery({
    queryKey: ['/api/carbon/profile', DEMO_USER.id],
    enabled: !!user,
  });

  // Get lifestyle data
  const { data: lifestyleData = [] } = useQuery({
    queryKey: ['/api/carbon/lifestyle', DEMO_USER.id],
    enabled: !!user,
  });

  // Get carbon footprints
  const { data: footprints = [] } = useQuery({
    queryKey: ['/api/carbon/footprint', DEMO_USER.id],
    enabled: !!user,
  });

  // Get badges
  const { data: badges = [] } = useQuery({
    queryKey: ['/api/carbon/badges', DEMO_USER.id],
    enabled: !!user,
  });

  // Get insights
  const { data: insights } = useQuery({
    queryKey: ['/api/carbon/insights', DEMO_USER.id],
    enabled: !!user,
  });

  // Add lifestyle data mutation
  const addLifestyleMutation = useMutation({
    mutationFn: async (data: any) => apiRequest('/api/carbon/lifestyle', { method: 'POST', body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/carbon/lifestyle'] });
      toast({ title: 'Lifestyle data added successfully!' });
      setNewLifestyleData({
        category: 'energy',
        subcategory: '',
        value: '',
        unit: '',
        frequency: 'daily',
        date: new Date().toISOString().split('T')[0]
      });
    },
  });

  // Calculate footprint mutation
  const calculateMutation = useMutation({
    mutationFn: async () => apiRequest(`/api/carbon/calculate/${DEMO_USER.id}`, { method: 'POST', body: {} }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/carbon/footprint'] });
      queryClient.invalidateQueries({ queryKey: ['/api/carbon/badges'] });
      toast({ 
        title: 'Carbon footprint calculated!',
        description: `Today's footprint: ${parseFloat(data.footprint.totalEmissions).toFixed(2)} kg CO₂e`
      });
      if (data.badges.length > 0) {
        toast({
          title: '🎉 New badge earned!',
          description: data.badges[0].badgeName,
        });
      }
    },
  });

  const handleAddLifestyle = () => {
    if (!newLifestyleData.subcategory || !newLifestyleData.value || !newLifestyleData.unit) {
      toast({ title: 'Please fill in all fields', variant: 'destructive' });
      return;
    }
    
    addLifestyleMutation.mutate({
      ...newLifestyleData,
      userId: DEMO_USER.id
    });
  };

  // Process data for charts
  const footprintChartData = footprints.slice(-30).map((fp: CarbonFootprint) => ({
    date: fp.date,
    total: parseFloat(fp.totalEmissions),
    energy: parseFloat(fp.energyEmissions),
    transport: parseFloat(fp.transportEmissions),
    diet: parseFloat(fp.dietEmissions),
    shopping: parseFloat(fp.shoppingEmissions),
  }));

  const latestFootprint = footprints[0];
  const categoryBreakdown = latestFootprint ? [
    { name: 'Energy', value: parseFloat(latestFootprint.energyEmissions), color: categoryColors.energy },
    { name: 'Transport', value: parseFloat(latestFootprint.transportEmissions), color: categoryColors.transport },
    { name: 'Diet', value: parseFloat(latestFootprint.dietEmissions), color: categoryColors.diet },
    { name: 'Shopping', value: parseFloat(latestFootprint.shoppingEmissions), color: categoryColors.shopping },
  ] : [];

  const avgDailyEmissions = footprints.length > 0 
    ? footprints.reduce((sum: number, fp: CarbonFootprint) => sum + parseFloat(fp.totalEmissions), 0) / footprints.length 
    : 0;

  if (userLoading || createUserMutation.isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Setting up your carbon tracking profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Carbon Footprint Tracker
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your personal carbon emissions using real-time UK grid data
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Emissions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {latestFootprint ? parseFloat(latestFootprint.totalEmissions).toFixed(2) : '0.00'} kg
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">30-Day Average</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {avgDailyEmissions.toFixed(2)} kg
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <Target className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Grid Intensity</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {insights?.currentIntensity || 0} g/kWh
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Badges Earned</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {badges.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="input">Add Data</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="badges">Achievements</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Emissions Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Carbon Footprint Trend</CardTitle>
                <CardDescription>Your daily emissions over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={footprintChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Breakdown Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Emissions by Category</CardTitle>
                <CardDescription>Breakdown of your carbon footprint sources</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryBreakdown}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value.toFixed(2)}kg`}
                    >
                      {categoryBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              onClick={() => calculateMutation.mutate()}
              disabled={calculateMutation.isPending}
              className="flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              {calculateMutation.isPending ? 'Calculating...' : 'Calculate Today\'s Footprint'}
            </Button>
            <Button variant="outline" onClick={() => setActiveTab('input')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Lifestyle Data
            </Button>
          </div>
        </TabsContent>

        {/* Input Tab */}
        <TabsContent value="input" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Lifestyle Data</CardTitle>
              <CardDescription>Track your daily activities to calculate your carbon footprint</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newLifestyleData.category} onValueChange={(value) => 
                    setNewLifestyleData(prev => ({ ...prev, category: value, subcategory: '' }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="energy">Energy</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="diet">Diet</SelectItem>
                      <SelectItem value="shopping">Shopping</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subcategory">Subcategory</Label>
                  <Select value={newLifestyleData.subcategory} onValueChange={(value) => 
                    setNewLifestyleData(prev => ({ ...prev, subcategory: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {newLifestyleData.category === 'energy' && (
                        <>
                          <SelectItem value="electricity_grid">Electricity (Grid)</SelectItem>
                          <SelectItem value="gas_heating">Gas Heating</SelectItem>
                          <SelectItem value="oil_heating">Oil Heating</SelectItem>
                        </>
                      )}
                      {newLifestyleData.category === 'transport' && (
                        <>
                          <SelectItem value="car_petrol">Car (Petrol)</SelectItem>
                          <SelectItem value="car_diesel">Car (Diesel)</SelectItem>
                          <SelectItem value="car_electric">Car (Electric)</SelectItem>
                          <SelectItem value="bus">Bus</SelectItem>
                          <SelectItem value="train">Train</SelectItem>
                          <SelectItem value="flights_domestic">Flights (Domestic)</SelectItem>
                        </>
                      )}
                      {newLifestyleData.category === 'diet' && (
                        <>
                          <SelectItem value="meat_beef">Beef</SelectItem>
                          <SelectItem value="meat_chicken">Chicken</SelectItem>
                          <SelectItem value="dairy_milk">Milk</SelectItem>
                          <SelectItem value="vegetables">Vegetables</SelectItem>
                        </>
                      )}
                      {newLifestyleData.category === 'shopping' && (
                        <>
                          <SelectItem value="clothing">Clothing</SelectItem>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="household_goods">Household Goods</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="value">Amount</Label>
                  <Input
                    value={newLifestyleData.value}
                    onChange={(e) => setNewLifestyleData(prev => ({ ...prev, value: e.target.value }))}
                    placeholder="Enter amount"
                    type="number"
                  />
                </div>

                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={newLifestyleData.unit} onValueChange={(value) => 
                    setNewLifestyleData(prev => ({ ...prev, unit: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kWh">kWh</SelectItem>
                      <SelectItem value="miles">Miles</SelectItem>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="liters">Liters</SelectItem>
                      <SelectItem value="pounds">£</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select value={newLifestyleData.frequency} onValueChange={(value) => 
                    setNewLifestyleData(prev => ({ ...prev, frequency: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    type="date"
                    value={newLifestyleData.date}
                    onChange={(e) => setNewLifestyleData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
              </div>

              <Button 
                onClick={handleAddLifestyle}
                disabled={addLifestyleMutation.isPending}
                className="w-full"
              >
                {addLifestyleMutation.isPending ? 'Adding...' : 'Add Lifestyle Data'}
              </Button>
            </CardContent>
          </Card>

          {/* Recent Lifestyle Data */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lifestyleData.slice(0, 5).map((item: LifestyleData) => {
                  const IconComponent = categoryIcons[item.category as keyof typeof categoryIcons];
                  return (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-5 w-5" style={{ color: categoryColors[item.category as keyof typeof categoryColors] }} />
                        <div>
                          <p className="font-medium">{item.subcategory.replace(/_/g, ' ')}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.value} {item.unit} ({item.frequency})
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Personalized Insights
              </CardTitle>
              <CardDescription>AI-powered suggestions based on your data and current grid conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights?.suggestions.map((suggestion: string, index: number) => (
                  <div key={index} className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                    <p className="text-gray-800 dark:text-gray-200">{suggestion}</p>
                  </div>
                ))}
                {(!insights?.suggestions || insights.suggestions.length === 0) && (
                  <p className="text-gray-600 dark:text-gray-400">
                    Add more lifestyle data to receive personalized insights!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Grid Status */}
          <Card>
            <CardHeader>
              <CardTitle>Current UK Grid Status</CardTitle>
              <CardDescription>Real-time grid conditions affecting your energy carbon intensity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Carbon Intensity</p>
                  <p className="text-2xl font-bold">{insights?.currentIntensity || 0} g CO₂/kWh</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                  <p className="text-lg font-semibold">
                    {(insights?.currentIntensity || 0) < 150 ? '🟢 Low Carbon' : 
                     (insights?.currentIntensity || 0) < 300 ? '🟡 Moderate' : '🔴 High Carbon'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Badges Tab */}
        <TabsContent value="badges" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Your Achievements
              </CardTitle>
              <CardDescription>Badges earned for your carbon reduction efforts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {badges.map((badge: CarbonBadge) => (
                  <div key={badge.id} className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{badge.badgeName}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(badge.earnedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {badge.description && (
                      <p className="text-sm text-gray-700 dark:text-gray-300">{badge.description}</p>
                    )}
                  </div>
                ))}
                {badges.length === 0 && (
                  <div className="col-span-full text-center py-8">
                    <Award className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Start tracking your carbon footprint to earn badges!
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}