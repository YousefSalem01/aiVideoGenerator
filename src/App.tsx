import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Landing } from './pages/Landing';
import { Pricing } from './pages/Pricing';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { ResetPassword } from './pages/auth/ResetPassword';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Settings } from './pages/dashboard/Settings';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

// Public Route Component (redirect to dashboard if logged in)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
}

function AppContent() {
  const { user } = useAuth();
  
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Routes>
          {/* Public routes with header/footer */}
          <Route path="/" element={
            <div>
              <Header />
              <Landing />
              <Footer />
            </div>
          } />
          <Route path="/pricing" element={
            <div>
              <Header />
              <Pricing />
              <Footer />
            </div>
          } />
          
          {/* Auth routes */}
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/signup" element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } />
          <Route path="/reset-password" element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          } />
          
          {/* Protected dashboard routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="posts" element={
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">My Posts</h2>
                <p className="text-gray-600 dark:text-gray-400">Your generated videos will appear here.</p>
              </div>
            } />
            <Route path="scheduling" element={
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Scheduling</h2>
                <p className="text-gray-600 dark:text-gray-400">Schedule multiple videos at once.</p>
              </div>
            } />
            <Route path="settings" element={
              <Settings />
            } />
            <Route path="billing" element={
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Billing</h2>
                <p className="text-gray-600 dark:text-gray-400">Manage your subscription and billing details.</p>
              </div>
            } />
          </Route>
          
          {/* Admin routes */}
          <Route path="/admin/users" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
                <div className="text-center py-16">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">User Management</h2>
                  <p className="text-gray-600 dark:text-gray-400">Admin panel for managing users.</p>
                </div>
              </div>
            </ProtectedRoute>
          } />
          <Route path="/admin/usage" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
                <div className="text-center py-16">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Usage Metrics</h2>
                  <p className="text-gray-600 dark:text-gray-400">System-wide usage statistics.</p>
                </div>
              </div>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;