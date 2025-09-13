import { useState } from 'react';
import { 
  Youtube, 
  Instagram, 
  Facebook, 
  Music, 
  Check, 
  Settings as SettingsIcon,
  Bell,
  Lock,
  CreditCard,
  User,
  Shield,
  Palette,
  Globe
} from 'lucide-react';
import { useAppStore } from '../../stores/appStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import toast, { Toaster } from 'react-hot-toast';

export function Settings() {
  const { connectedPlatforms, connectPlatform, disconnectPlatform } = useAppStore();
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true
  });

  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    timezone: 'UTC-5'
  });

  const platforms = [
    {
      id: 'youtube',
      name: 'YouTube',
      icon: Youtube,
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      description: 'Connect to publish YouTube Shorts',
      connected: connectedPlatforms.includes('youtube')
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      hoverColor: 'hover:from-purple-600 hover:to-pink-600',
      description: 'Connect to publish Instagram Reels',
      connected: connectedPlatforms.includes('instagram')
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: Music,
      color: 'bg-gray-900',
      hoverColor: 'hover:bg-gray-800',
      description: 'Connect to publish TikTok videos',
      connected: connectedPlatforms.includes('tiktok')
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      description: 'Connect to publish Facebook Reels',
      connected: connectedPlatforms.includes('facebook')
    }
  ];

  const handleConnect = (platformId: string, platformName: string, isConnected: boolean) => {
    if (isConnected) {
      disconnectPlatform(platformId);
      toast.success(`Disconnected from ${platformName}`, {
        style: {
          background: '#ffffff',
          color: '#374151',
          border: '1px solid #e5e7eb',
        },
      });
    } else {
      connectPlatform(platformId);
      toast.success(`Connected to ${platformName}! 🚀`, {
        duration: 4000,
        style: {
          background: '#ffffff',
          color: '#374151',
          border: '1px solid #e5e7eb',
        },
        iconTheme: {
          primary: '#2563eb',
          secondary: '#ffffff',
        },
      });
    }
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast.success('Notification preferences updated!', {
      style: {
        background: '#ffffff',
        color: '#374151',
        border: '1px solid #e5e7eb',
      },
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <Toaster position="top-right" />
      
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
          <SettingsIcon className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Settings</h1>
          <p className="text-text-secondary">Manage your account and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-8">
          {/* Social Media Connections */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary-50 to-purple-50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-text-primary">Social Media Connections</h2>
                  <p className="text-sm text-text-secondary">Connect your social media accounts to start publishing</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {platforms.map((platform) => (
                  <div
                    key={platform.id}
                    className="group relative bg-background border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-primary-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 ${platform.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <platform.icon className="w-6 h-6" />
                      </div>
                      {platform.connected && (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      {platform.name}
                    </h3>
                    <p className="text-sm text-text-secondary mb-4">
                      {platform.description}
                    </p>
                    
                    <Button
                      onClick={() => handleConnect(platform.id, platform.name, platform.connected)}
                      className={`w-full ${platform.connected ? 'bg-green-500 hover:bg-green-600' : `${platform.color} ${platform.hoverColor}`} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300`}
                      size="sm"
                    >
                      {platform.connected ? 'Disconnect' : 'Connect'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-text-primary">Profile Information</h2>
                  <p className="text-sm text-text-secondary">Update your personal information</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Timezone
                  </label>
                  <select className="w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-background text-text-primary">
                    <option>UTC-5 (Eastern Time)</option>
                    <option>UTC-8 (Pacific Time)</option>
                    <option>UTC+0 (GMT)</option>
                    <option>UTC+1 (Central European Time)</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full">Update Profile</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-text-primary">Security</h2>
                  <p className="text-sm text-text-secondary">Manage your account security</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Current Password"
                  type="password"
                  placeholder="Enter current password"
                />
                <Input
                  label="New Password"
                  type="password"
                  placeholder="Enter new password"
                />
              </div>
              <div className="flex justify-end">
                <Button variant="secondary">Change Password</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Bell className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">Notifications</h3>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-surface-light rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-text-primary capitalize">
                      {key === 'marketing' ? 'Marketing Emails' : `${key} Notifications`}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {key === 'email' && 'Receive email notifications'}
                      {key === 'push' && 'Receive push notifications'}
                      {key === 'marketing' && 'Receive marketing updates'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange(key, !value)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-primary-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Palette className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="ghost" className="w-full justify-start" icon={CreditCard}>
                Billing & Subscription
              </Button>
              <Button variant="ghost" className="w-full justify-start" icon={Lock}>
                Privacy Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start" icon={SettingsIcon}>
                Advanced Settings
              </Button>
            </CardContent>
          </Card>

          {/* Account Stats */}
          <Card className="bg-gradient-to-br from-primary-50 to-purple-50 border-primary-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Account Overview</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Videos Generated</span>
                  <span className="text-sm font-semibold text-text-primary">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Current Plan</span>
                  <span className="text-sm font-semibold text-primary-600">Pro</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">Connected Platforms</span>
                  <span className="text-sm font-semibold text-text-primary">{connectedPlatforms.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}