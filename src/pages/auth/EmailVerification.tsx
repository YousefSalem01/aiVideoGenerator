import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { VerificationCodeInput } from '../../components/ui/VerificationCodeInput';
import { Toast } from '../../components/ui/Toast';
import { tokenManager } from '../../lib/api';

export function EmailVerification() {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const tempUserId = searchParams.get('userId');
  const email = searchParams.get('email');

  useEffect(() => {
    if (!tempUserId || !email) {
      navigate('/signup');
    }
  }, [tempUserId, email, navigate]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const handleVerifyCode = async (verificationCode: string) => {
    if (!tempUserId) return;

    setIsVerifying(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: tempUserId,
          code: verificationCode,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Store tokens using cookie-based token manager
        tokenManager.setToken(data.data.token);
        tokenManager.setRefreshToken(data.data.refreshToken);
        
        Toast.success('Email verified successfully! Welcome!');
        navigate('/dashboard');
      } else {
        Toast.error(data.message || 'Invalid verification code');
        setCode('');
      }
    } catch (error) {
      console.error('Verification error:', error);
      Toast.error('Failed to verify email. Please try again.');
      setCode('');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (!tempUserId || resendCooldown > 0) return;

    setIsResending(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: tempUserId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        Toast.success('Verification code sent to your email');
        setResendCooldown(60); // 60 seconds cooldown
      } else {
        Toast.error(data.message || 'Failed to resend code');
      }
    } catch (error) {
      console.error('Resend error:', error);
      Toast.error('Failed to resend code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleCodeComplete = (completedCode: string) => {
    handleVerifyCode(completedCode);
  };

  if (!tempUserId || !email) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-background border-border-light shadow-md">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">Verify Your Email</h1>
            <p className="text-text-secondary">
              We've sent a 6-digit verification code to
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
              {isVerifying ? 'Verifying...' : 'Verify Email'}
            </Button>

            <div className="text-center space-y-3">
              <p className="text-sm text-text-secondary">
                Didn't receive the code?
              </p>
              
              <Button
                variant="ghost"
                onClick={handleResendCode}
                disabled={resendCooldown > 0 || isResending}
                className="text-primary-600 hover:text-primary-700"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isResending ? 'animate-spin' : ''}`} />
                {resendCooldown > 0 
                  ? `Resend in ${resendCooldown}s` 
                  : isResending 
                    ? 'Sending...' 
                    : 'Resend Code'
                }
              </Button>
            </div>

            <div className="pt-4 border-t border-border-light">
              <Button
                variant="ghost"
                onClick={() => navigate('/signup')}
                className="w-full text-text-secondary hover:text-text-primary"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sign Up
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
