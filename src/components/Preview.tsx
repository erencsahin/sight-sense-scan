
import React, { useRef, useEffect } from 'react';

interface PreviewProps {
  src: string | null;
  isVideo: boolean;
  isAnalyzing?: boolean;
}

const Preview: React.FC<PreviewProps> = ({ src, isVideo, isAnalyzing = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (isVideo && videoRef.current && src) {
      videoRef.current.src = src;
    }
  }, [src, isVideo]);

  if (!src) return null;

  return (
    <div className="relative rounded-lg overflow-hidden shadow-md bg-traffic-lightgray mb-6">
      <div className={`relative ${isAnalyzing ? 'scanning-effect' : ''}`}>
        {isVideo ? (
          <video 
            ref={videoRef}
            className="w-full h-auto max-h-[400px] object-contain"
            controls
          />
        ) : (
          <img 
            src={src} 
            alt="Preview" 
            className="w-full h-auto max-h-[400px] object-contain"
          />
        )}
        
        {isAnalyzing && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-white text-center p-4">
              <div className="mb-2">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em]"></div>
              </div>
              <p className="text-lg font-semibold">Analyzing...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;
