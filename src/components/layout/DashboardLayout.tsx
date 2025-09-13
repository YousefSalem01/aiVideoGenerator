import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  VideoIcon, 
  Calendar, 
  Settings, 
  CreditCard, 
  Users, 
  BarChart3,
  LogOut,
  Video
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

export function DashboardLayout() {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Posts', href: '/dashboard/posts', icon: VideoIcon },
    { name: 'Scheduling', href: '/dashboard/scheduling', icon: Calendar },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  ];

  const adminNavigation = [
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Usage Metrics', href: '/admin/usage', icon: BarChart3 },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="min-h-screen bg-background-light">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-background shadow-sm border-r border-border-light fixed h-full overflow-y-auto">
          {/* Logo */}
          <div className="p-6 border-b border-border-light">
            <Link to="/" className="flex items-center space-x-2">
              <Video className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-text-primary">AI VideoGen</span>
            </Link>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-border-light">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-text-primary">{user?.name}</p>
                <p className="text-xs text-text-muted capitalize">{user?.plan} Plan</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary-50 text-primary-700 border border-primary-200'
                    : 'text-text-secondary hover:bg-surface-light hover:text-text-primary'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}

            {user?.isAdmin && (
              <>
                <div className="pt-4 mt-4 border-t border-border-light">
                  <p className="px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Admin
                  </p>
                </div>
                {adminNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary-50 text-primary-700 border border-primary-200'
                        : 'text-text-secondary hover:bg-surface-light hover:text-text-primary'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </>
            )}

            <button
              onClick={logout}
              className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors mt-4"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64">
          <main className="p-8">
            <Outlet /> 
          </main>
        </div>
      </div>
    </div>
  );
}