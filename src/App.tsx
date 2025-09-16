import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from './components/ui/Toast';
import { useAuthStore } from './stores/authStore';
import { useAuthInit } from './hooks/useAuth';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Landing } from './pages/Landing';
import { Pricing } from './pages/Pricing';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { ResetPassword } from './pages/auth/ResetPassword';
import { EmailVerification } from './pages/auth/EmailVerification';
import { ResetPasswordVerification } from './pages/auth/ResetPasswordVerification';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Settings } from './pages/dashboard/Settings';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuthStore();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuthStore();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
}

function AppContent() {
  useAuthInit();
  
  return (
    <Router>
      <div className="min-h-screen bg-background-light">
        <Routes>
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
          <Route path="/verify-email" element={
            <PublicRoute>
              <EmailVerification />
            </PublicRoute>
          } />
          <Route path="/reset-password-verify" element={
            <PublicRoute>
              <ResetPasswordVerification />
            </PublicRoute>
          } />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="posts" element={
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-text-primary mb-4">My Posts</h2>
                <p className="text-text-secondary">Your generated videos will appear here.</p>
              </div>
            } />
            <Route path="scheduling" element={
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-text-primary mb-4">Scheduling</h2>
                <p className="text-text-secondary">Schedule multiple videos at once.</p>
              </div>
            } />
            <Route path="settings" element={
              <Settings />
            } />
            <Route path="billing" element={
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-text-primary mb-4">Billing</h2>
                <p className="text-text-secondary">Manage your subscription and billing details.</p>
              </div>
            } />
          </Route>
          
          <Route path="/admin/users" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-background-light p-8">
                <div className="text-center py-16">
                  <h2 className="text-2xl font-bold text-text-primary mb-4">User Management</h2>
                  <p className="text-text-secondary">Admin panel for managing users.</p>
                </div>
              </div>
            </ProtectedRoute>
          } />
          <Route path="/admin/usage" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-background-light p-8">
                <div className="text-center py-16">
                  <h2 className="text-2xl font-bold text-text-primary mb-4">Usage Metrics</h2>
                  <p className="text-text-secondary">System-wide usage statistics.</p>
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
    <>
      <AppContent />
      <ToastContainer />
    </>
  );
}

export default App;