import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';

export function ResetPassword() {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { resetPassword, isLoading, error, clearError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      await resetPassword(email);
      setIsSuccess(true);
    } catch (err) {
      console.error('Reset password error:', err);
      // Error is handled by the auth store
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center px-4">
        <Card className="w-full max-w-md bg-background border-border-light shadow-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-4">Check your email</h1>
            <p className="text-text-secondary mb-8">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <Link to="/login">
              <Button variant="ghost" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sign In
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-background border-border-light shadow-md">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-text-primary mb-2">Reset your password</h1>
            <p className="text-text-secondary">Enter your email to receive a reset link</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-4 h-4" />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              Send Reset Link
            </Button>
          </form>

          <div className="mt-8 text-center">
            <Link to="/login" className="text-primary-600 hover:text-primary-700 inline-flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}