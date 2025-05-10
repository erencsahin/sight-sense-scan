
import React from 'react';
import { DetectionResult } from '../types';
import ResultCard from './ResultCard';
import LoadingIndicator from './LoadingIndicator';
import ErrorBanner from './ErrorBanner';

interface ResultsListProps {
  results: DetectionResult[] | undefined;
  isLoading: boolean;
  error: Error | null;
  imageSrc: string | null;
  status?: 'processing' | 'completed' | 'failed';
  onRetry?: () => void;
}

const ResultsList: React.FC<ResultsListProps> = ({ 
  results,
  isLoading,
  error,
  imageSrc,
  status,
  onRetry
}) => {
  if (isLoading) {
    return <LoadingIndicator message="Analyzing image..." />;
  }
  
  if (error) {
    return (
      <ErrorBanner 
        message={error.message || 'An error occurred while fetching results.'} 
        onRetry={onRetry}
      />
    );
  }
  
  if (status === 'processing') {
    return (
      <div className="text-center p-6">
        <div className="animate-pulse-slow mb-4">
          <div className="h-4 w-3/4 mx-auto bg-traffic-blue rounded"></div>
          <div className="h-4 w-1/2 mx-auto bg-traffic-blue rounded mt-2"></div>
        </div>
        <p className="text-traffic-gray">Your image is still being analyzed...</p>
      </div>
    );
  }
  
  if (status === 'failed') {
    return (
      <ErrorBanner 
        message="Analysis failed. Please try uploading the image again."
        onRetry={onRetry}
      />
    );
  }
  
  if (!results || results.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-traffic-gray">No traffic signs detected in this image.</p>
        <p className="text-sm text-traffic-gray mt-2">Try uploading a different image with clearer traffic signs.</p>
      </div>
    );
  }
  
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-center">
        {results.length} Traffic {results.length === 1 ? 'Sign' : 'Signs'} Detected
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {results.map((result) => (
          <ResultCard 
            key={result.id} 
            result={result} 
            imageSrc={imageSrc || ''}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultsList;
