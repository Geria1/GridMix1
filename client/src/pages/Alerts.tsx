import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Bell, 
  Plus, 
  Trash2, 
  Edit, 
  Mail, 
  MessageSquare, 
  Smartphone,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingDown,
  TrendingUp,
  Zap,
  Leaf,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface AlertUser {
  id: number;
  email: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
}

interface UserAlert {
  id: number;
  userId: number;
  name: string;
  alertType: 'carbon_intensity' | 'renewable_share' | 'total_demand';
  condition: 'below' | 'above' | 'equals';
  threshold: number;
  frequency: 'realtime' | '15min' | '1hour' | 'daily';
  deliveryMethods: string[];
  isActive: boolean;
  lastTriggered?: string;
  createdAt: string;
}

interface NotificationSettings {
  id: number;
  userId: number;
  emailEnabled: boolean;
  smsEnabled: boolean;
  pushEnabled: boolean;
  quietHoursStart?: string;
  quietHoursEnd?: string;
  maxAlertsPerHour: number;
}

interface AlertFormData {
  name: string;
  alertType: string;
  condition: string;
  threshold: number;
  frequency: string;
  deliveryMethods: string[];
}

export default function Alerts() {
  const [currentUser, setCurrentUser] = useState<AlertUser | null>(null);
  const [alerts, setAlerts] = useState<UserAlert[]>([]);
  const [settings, setSettings] = useState<NotificationSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingAlert, setEditingAlert] = useState<UserAlert | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const { toast } = useToast();

  const [formData, setFormData] = useState<AlertFormData>({
    name: '',
    alertType: '',
    condition: '',
    threshold: 0,
    frequency: 'realtime',
    deliveryMethods: ['email']
  });

  const alertTypeOptions = [
    { value: 'carbon_intensity', label: 'Carbon Intensity', icon: Leaf, unit: 'gCO₂/kWh', description: 'Get notified when carbon emissions from electricity change' },
    { value: 'renewable_share', label: 'Renewable Share', icon: TrendingUp, unit: '%', description: 'Track the percentage of renewable energy in the grid' },
    { value: 'total_demand', label: 'Total Demand', icon: Zap, unit: 'MW', description: 'Monitor overall electricity demand across the UK' }
  ];

  const conditionOptions = [
    { value: 'below', label: 'Falls Below', icon: TrendingDown },
    { value: 'above', label: 'Rises Above', icon: TrendingUp },
    { value: 'equals', label: 'Equals', icon: BarChart3 }
  ];

  const frequencyOptions = [
    { value: 'realtime', label: 'Real-time', description: 'Instant notifications' },
    { value: '15min', label: 'Every 15 minutes', description: 'Batched notifications' },
    { value: '1hour', label: 'Hourly', description: 'Hourly summaries' },
    { value: 'daily', label: 'Daily', description: 'Daily digest' }
  ];

  const deliveryOptions = [
    { value: 'email', label: 'Email', icon: Mail },
    { value: 'sms', label: 'SMS', icon: MessageSquare },
    { value: 'push', label: 'Push Notifications', icon: Smartphone }
  ];

  useEffect(() => {
    // Check if user exists in localStorage or create new user
    const savedEmail = localStorage.getItem('alertUserEmail');
    if (savedEmail) {
      setUserEmail(savedEmail);
      loadUserData(savedEmail);
    }
  }, []);

  const loadUserData = async (email: string) => {
    try {
      setLoading(true);
      const userResponse = await fetch(`/api/alerts/users/${encodeURIComponent(email)}`);
      if (!userResponse.ok) throw new Error('Failed to fetch user');
      const user = await userResponse.json();
      setCurrentUser(user);
      
      const [alertsResponse, settingsResponse] = await Promise.all([
        fetch(`/api/alerts/user/${user.id}`),
        fetch(`/api/alerts/settings/${user.id}`)
      ]);
      
      if (alertsResponse.ok) {
        const userAlerts = await alertsResponse.json();
        setAlerts(userAlerts);
      }
      
      if (settingsResponse.ok) {
        const userSettings = await settingsResponse.json();
        setSettings(userSettings);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      toast({
        title: "Error",
        description: "Failed to load your alert data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createUser = async () => {
    if (!userEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const userData = {
        email: userEmail,
        phone: userPhone || undefined,
        isActive: true
      };

      const response = await fetch('/api/alerts/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        const user = await response.json();
        setCurrentUser(user);
        localStorage.setItem('alertUserEmail', userEmail);
        
        // Load initial data
        await loadUserData(userEmail);
        
        toast({
          title: "Welcome!",
          description: "Your alert account has been created successfully",
        });
      } else if (response.status === 409) {
        // User already exists, try to load them
        await loadUserData(userEmail);
        localStorage.setItem('alertUserEmail', userEmail);
      } else {
        throw new Error('Failed to create user');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to create alert account",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createAlert = async () => {
    if (!currentUser) return;

    try {
      const alertData = {
        userId: currentUser.id,
        name: formData.name,
        alertType: formData.alertType,
        condition: formData.condition,
        threshold: formData.threshold,
        frequency: formData.frequency,
        deliveryMethods: formData.deliveryMethods,
        isActive: true
      };

      const response = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alertData)
      });

      if (response.ok) {
        const newAlert = await response.json();
        setAlerts([...alerts, newAlert]);
        setShowCreateForm(false);
        resetForm();
        
        toast({
          title: "Alert Created",
          description: `"${formData.name}" alert has been set up successfully`,
        });
      } else {
        throw new Error('Failed to create alert');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create alert",
        variant: "destructive",
      });
    }
  };

  const deleteAlert = async (alertId: number) => {
    try {
      const response = await fetch(`/api/alerts/${alertId}`, { method: 'DELETE' });
      
      if (response.ok) {
        setAlerts(alerts.filter(alert => alert.id !== alertId));
        
        toast({
          title: "Alert Deleted",
          description: "Alert has been removed successfully",
        });
      } else {
        throw new Error('Failed to delete alert');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete alert",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      alertType: '',
      condition: '',
      threshold: 0,
      frequency: 'realtime',
      deliveryMethods: ['email']
    });
    setEditingAlert(null);
  };

  const getAlertTypeInfo = (type: string) => {
    return alertTypeOptions.find(option => option.value === type);
  };

  const getConditionInfo = (condition: string) => {
    return conditionOptions.find(option => option.value === condition);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-2xl">Welcome to GridMix Alerts</CardTitle>
              <p className="text-gray-600 dark:text-gray-400">
                Get notified when UK energy conditions match your preferences
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number (Optional, for SMS alerts)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+44 7XXX XXXXXX"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                />
              </div>
              <Button 
                onClick={createUser} 
                disabled={loading || !userEmail}
                className="w-full"
              >
                {loading ? 'Setting up...' : 'Get Started'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/60 via-white to-green-50/60 dark:from-gray-900 dark:via-gray-850 dark:to-gray-900 py-10 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 md:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-green-600 bg-clip-text text-transparent mb-3 md:mb-4">
            Energy Alerts
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
            Get notified when UK electricity grid conditions match your criteria
          </p>
        </div>

        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="alerts">My Alerts</TabsTrigger>
            <TabsTrigger value="create">Create Alert</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="alerts">
            <div className="space-y-4">
              {alerts.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No alerts yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Create your first alert to get notified about energy conditions
                    </p>
                    <Button onClick={() => setShowCreateForm(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Alert
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                alerts.map((alert) => {
                  const typeInfo = getAlertTypeInfo(alert.alertType);
                  const conditionInfo = getConditionInfo(alert.condition);
                  
                  return (
                    <Card key={alert.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              {typeInfo && <typeInfo.icon className="w-5 h-5 text-blue-600" />}
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {alert.name}
                              </h3>
                              <Badge variant={alert.isActive ? "default" : "secondary"}>
                                {alert.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                            
                            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                              <p>
                                <strong>Condition:</strong> {typeInfo?.label} {conditionInfo?.label.toLowerCase()} {alert.threshold} {typeInfo?.unit}
                              </p>
                              <p>
                                <strong>Frequency:</strong> {frequencyOptions.find(f => f.value === alert.frequency)?.label}
                              </p>
                              <div className="flex items-center gap-2">
                                <strong>Delivery:</strong>
                                {alert.deliveryMethods.map(method => {
                                  const deliveryInfo = deliveryOptions.find(d => d.value === method);
                                  return deliveryInfo ? (
                                    <Badge key={method} variant="outline" className="text-xs">
                                      <deliveryInfo.icon className="w-3 h-3 mr-1" />
                                      {deliveryInfo.label}
                                    </Badge>
                                  ) : null;
                                })}
                              </div>
                              {alert.lastTriggered && (
                                <p>
                                  <strong>Last triggered:</strong> {new Date(alert.lastTriggered).toLocaleString()}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setEditingAlert(alert)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => deleteAlert(alert.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </TabsContent>

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Create New Alert</CardTitle>
                <p className="text-gray-600 dark:text-gray-400">
                  Set up a custom alert for UK energy grid conditions
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="alertName">Alert Name</Label>
                  <Input
                    id="alertName"
                    placeholder="e.g., Low Carbon Alert"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div>
                  <Label>Alert Type</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    {alertTypeOptions.map((option) => (
                      <Card 
                        key={option.value}
                        className={`cursor-pointer transition-colors ${
                          formData.alertType === option.value 
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                            : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                        onClick={() => setFormData({...formData, alertType: option.value})}
                      >
                        <CardContent className="p-4 text-center">
                          <option.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                          <h4 className="font-semibold">{option.label}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            {option.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Condition</Label>
                    <Select value={formData.condition} onValueChange={(value) => setFormData({...formData, condition: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              <option.icon className="w-4 h-4" />
                              {option.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="threshold">
                      Threshold ({getAlertTypeInfo(formData.alertType)?.unit || ''})
                    </Label>
                    <Input
                      id="threshold"
                      type="number"
                      placeholder="Enter threshold value"
                      value={formData.threshold}
                      onChange={(e) => setFormData({...formData, threshold: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                </div>

                <div>
                  <Label>Notification Frequency</Label>
                  <Select value={formData.frequency} onValueChange={(value) => setFormData({...formData, frequency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {frequencyOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div>
                            <div className="font-medium">{option.label}</div>
                            <div className="text-xs text-gray-500">{option.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Delivery Methods</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    {deliveryOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.value}
                          checked={formData.deliveryMethods.includes(option.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({
                                ...formData,
                                deliveryMethods: [...formData.deliveryMethods, option.value]
                              });
                            } else {
                              setFormData({
                                ...formData,
                                deliveryMethods: formData.deliveryMethods.filter(m => m !== option.value)
                              });
                            }
                          }}
                        />
                        <Label htmlFor={option.value} className="flex items-center gap-2 cursor-pointer">
                          <option.icon className="w-4 h-4" />
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={createAlert}
                    disabled={!formData.name || !formData.alertType || !formData.condition || formData.deliveryMethods.length === 0}
                    className="flex-1"
                  >
                    Create Alert
                  </Button>
                  <Button variant="outline" onClick={resetForm}>
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage your notification preferences and limits
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Settings management coming soon. For now, you can configure delivery methods when creating alerts.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}