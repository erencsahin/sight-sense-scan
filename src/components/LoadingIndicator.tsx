
import React from 'react';
import { Loader } from 'lucide-react';

interface LoadingIndicatorProps {
  message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="animate-spin">
        <Loader className="h-8 w-8 text-traffic-blue" />
      </div>
      <p className="mt-2 text-traffic-gray">{message}</p>
    </div>
  );
};

export default LoadingIndicator;
