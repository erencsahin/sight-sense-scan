
import React from 'react';
import { DetectionResult } from '../../types';

interface ResultCardProps {
  result: DetectionResult;
  imageSrc: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, imageSrc }) => {
  const confidencePercentage = Math.round(result.confidence * 100);
  const confidenceColor = 
    confidencePercentage >= 90 ? 'text-green-600' : 
    confidencePercentage >= 75 ? 'text-traffic-blue' : 'text-amber-600';
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg animate-fade-in">
      <div className="relative">
        <img 
          src={imageSrc} 
          alt={result.label} 
          className="w-full h-40 object-cover"
        />
        
        {/* Bounding box overlay */}
        <div 
          className="absolute border-2 border-traffic-orange"
          style={{
            left: `${result.bbox.x * 100}%`,
            top: `${result.bbox.y * 100}%`,
            width: `${result.bbox.width * 100}%`,
            height: `${result.bbox.height * 100}%`,
          }}
        />
        
        {/* Timestamp badge for video frames */}
        {result.timestamp !== undefined && (
          <span className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            {Math.floor(result.timestamp / 60)}:{(result.timestamp % 60).toString().padStart(2, '0')}
          </span>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-gray-800">{result.label}</h3>
          <span className={`font-medium ${confidenceColor}`}>
            {confidencePercentage}%
          </span>
        </div>
        
        <div className="text-xs text-traffic-gray">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p>Position:</p>
              <p className="font-mono">x: {Math.round(result.bbox.x * 100)}%</p>
              <p className="font-mono">y: {Math.round(result.bbox.y * 100)}%</p>
            </div>
            <div>
              <p>Size:</p>
              <p className="font-mono">w: {Math.round(result.bbox.width * 100)}%</p>
              <p className="font-mono">h: {Math.round(result.bbox.height * 100)}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
