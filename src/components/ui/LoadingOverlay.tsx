import React from 'react';
import { cn } from '../../lib/utils';

interface LoadingOverlayProps {
  show: boolean;
  message?: string;
  subMessage?: string;
  fullscreen?: boolean;
  className?: string;
}

export function LoadingOverlay({
  show,
  message = 'Generating magic...',
  subMessage = 'This may take a few moments',
  fullscreen = true,
  className,
}: LoadingOverlayProps) {
  if (!show) return null;

  return (
    <div
      className={cn(
        'inset-0 z-50 flex items-center justify-center bg-white/75 backdrop-blur-sm',
        fullscreen ? 'fixed' : 'absolute rounded-xl',
        className
      )}
    >
      {/* Animated orb */}
      <div className="relative flex flex-col items-center">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-500 via-purple-500 to-pink-500 opacity-20 blur-2xl" />
          <div className="absolute inset-0 rounded-full border-4 border-primary-100" />
          <div className="absolute inset-2 rounded-full border-t-4 border-primary-500 animate-spin" />
          <div className="absolute inset-5 rounded-full border-t-4 border-purple-400 animate-[spin_2s_linear_infinite]" />
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-white to-primary-50 shadow-inner" />
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary-500 animate-bounce" />
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm font-medium text-text-primary tracking-wide">
            {message}
          </p>
          <p className="text-xs text-text-secondary mt-1">
            {subMessage}
          </p>
        </div>

        {/* Progress shimmer bar */}
        <div className="mt-6 w-64 h-2 rounded-full bg-gray-200 overflow-hidden">
          <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 animate-[shimmer_1.4s_ease_infinite]" />
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(50%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}

export default LoadingOverlay;


