import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent } from '../../components/ui/Card';
import { VerificationCodeInput } from '../../components/ui/VerificationCodeInput';
import { useAuthStore } from '../../stores/authStore';
import toast from 'react-hot-toast';

export function ResetPasswordVerification() {
  const [step, setStep] = useState<'code' | 'password'>('code');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get('email');

  useEffect(() => {
    if (!email) {
      navigate('/login');
    }
  }, [email, navigate]);

  const handleVerifyCode = async (verificationCode: string) => {
    if (!email) return;

    setIsVerifying(true);
    try {
      // Just verify the code exists, don't reset password yet
      const response = await fetch('http://localhost:5000/api/auth/verify-reset-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          code: verificationCode,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Code verified! Now set your new password.');
        setStep('password');
      } else {
        toast.error(data.message || 'Invalid verification code');
        setCode('');
      }
    } catch (error) {
      console.error('Code verification error:', error);
      toast.error('Failed to verify code. Please try again.');
      setCode('');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !code) return;

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsResetting(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          code,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Store tokens and user data
        localStorage.setItem('auth_token', data.data.token);
        localStorage.setItem('refresh_token', data.data.refreshToken);
        
        toast.success('Password reset successfully! You are now logged in.');
        navigate('/dashboard');
      } else {
        toast.error(data.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error('Failed to reset password. Please try again.');
    } finally {
      setIsResetting(false);
    }
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleCodeComplete = (completedCode: string) => {
    handleVerifyCode(completedCode);
  };

  if (!email) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-background border-border-light shadow-md">
        <CardContent className="p-8">
          {step === 'code' ? (
            <>
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Lock className="w-8 h-8 text-red-600" />
                </div>
                <h1 className="text-2xl font-bold text-text-primary mb-2">Enter Reset Code</h1>
                <p className="text-text-secondary">
                  We've sent a 6-digit code to
                </p>
                <p className="text-text-primary font-semibold">{email}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-3 text-center">
                    Enter verification code
                  </label>
                  <VerificationCodeInput
                    value={code}
                    onChange={handleCodeChange}
                    onComplete={handleCodeComplete}
                    disabled={isVerifying}
                    error={false}
                  />
                </div>

                <Button
                  onClick={() => handleVerifyCode(code)}
                  disabled={code.length !== 6 || isVerifying}
                  className="w-full"
                  size="lg"
                  isLoading={isVerifying}
                >
                  {isVerifying ? 'Verifying...' : 'Verify Code'}
                </Button>

                <div className="pt-4 border-t border-border-light">
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/login')}
                    className="w-full text-text-secondary hover:text-text-primary"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Login
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Lock className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-text-primary mb-2">Set New Password</h1>
                <p className="text-text-secondary">
                  Enter your new password below
                </p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-6">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-4 h-4" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-secondary"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-4 h-4" />
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-secondary"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  isLoading={isResetting}
                  disabled={!password || !confirmPassword || password !== confirmPassword}
                >
                  {isResetting ? 'Resetting Password...' : 'Reset Password'}
                </Button>

                <div className="pt-4 border-t border-border-light">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setStep('code')}
                    className="w-full text-text-secondary hover:text-text-primary"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Code Verification
                  </Button>
                </div>
              </form>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
