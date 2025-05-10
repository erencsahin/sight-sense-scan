
import React, { useState } from 'react';
import UploadForm from '../components/UploadForm';
import Preview from '../components/Preview';
import ResultsList from '../components/ResultsList';
import useUpload from '../hooks/useUpload';
import useResults from '../hooks/useResults';

const Index = () => {
  const [jobId, setJobId] = useState<string | null>(null);
  const { uploadState } = useUpload();
  const { 
    data: resultsData, 
    isLoading, 
    error, 
    refetch 
  } = useResults(jobId, !!jobId);

  const handleUploadComplete = (newJobId: string) => {
    setJobId(newJobId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg viewBox="0 0 24 24" className="h-8 w-8 text-traffic-blue fill-current mr-2">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
              </svg>
              <h1 className="text-2xl font-bold text-gray-900">
                Traffic Sign <span className="text-traffic-blue">Detection</span>
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Upload Image or Video</h2>
            <p className="text-traffic-gray mb-6">
              Upload a photo or video to detect traffic signs. Our system will analyze the content and identify road signs.
            </p>
            <UploadForm onUploadComplete={handleUploadComplete} />
          </div>

          {uploadState.preview && (
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              <Preview 
                src={uploadState.preview} 
                isVideo={uploadState.isVideo}
                isAnalyzing={!!jobId && (!resultsData || resultsData.status === 'processing')}
              />
            </div>
          )}

          {jobId && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Detection Results</h2>
              <ResultsList 
                results={resultsData?.results}
                isLoading={isLoading}
                error={error as Error}
                imageSrc={uploadState.preview}
                status={resultsData?.status}
                onRetry={refetch}
              />
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-traffic-gray text-sm">
            &copy; 2025 Traffic Sign Detection System
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
