
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorBannerProps {
  message: string;
  onDismiss?: () => void;
  onRetry?: () => void;
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({ 
  message, 
  onDismiss,
  onRetry
}) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4 rounded animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0 text-red-500">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{message}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="text-sm bg-white hover:bg-red-50 border-red-200 text-red-600"
            >
              Retry
            </Button>
          )}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="inline-flex rounded focus:outline-none focus:ring-2 focus:ring-red-500 p-1"
            >
              <X className="h-4 w-4 text-red-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorBanner;
