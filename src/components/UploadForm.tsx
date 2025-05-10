
import React, { useState, useCallback } from 'react';
import { UploadCloud, X, Image, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useUpload from '../hooks/useUpload';

interface UploadFormProps {
  onUploadComplete: (jobId: string) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onUploadComplete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const { uploadState, handleFileSelect, uploadMutation, reset } = useUpload();
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, [handleFileSelect]);
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };
  
  const handleUploadClick = async () => {
    if (!uploadState.file) return;
    
    const result = await uploadMutation.mutateAsync(uploadState.file);
    onUploadComplete(result.jobId);
  };

  return (
    <div className="w-full">
      <div 
        className={`drop-zone ${isDragging ? 'active' : ''} ${uploadState.file ? 'border-traffic-blue bg-blue-50' : 'border-gray-300'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!uploadState.file ? (
          <div className="flex flex-col items-center justify-center">
            <UploadCloud size={48} className="upload-icon" />
            <p className="mb-2 text-lg font-medium text-traffic-gray">Drag and drop your file here</p>
            <p className="mb-4 text-sm text-traffic-gray">or</p>
            <Button 
              type="button" 
              className="bg-traffic-blue hover:bg-traffic-darkblue"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              Select File
            </Button>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              accept="image/jpeg,image/png,image/gif,image/webp,video/mp4,video/quicktime,video/webm,video/avi"
              onChange={handleFileInputChange}
            />
            <p className="mt-4 text-xs text-traffic-gray">
              Supports: JPG, PNG, GIF, WEBP, MP4, MOV, AVI, WEBM (max 10MB)
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-between w-full mb-4">
              <div className="flex items-center">
                {uploadState.isVideo ? (
                  <Video size={24} className="text-traffic-blue mr-2" />
                ) : (
                  <Image size={24} className="text-traffic-blue mr-2" />
                )}
                <span className="font-medium truncate max-w-[200px]">{uploadState.file.name}</span>
              </div>
              <button
                type="button"
                className="text-traffic-gray hover:text-red-500 p-1"
                onClick={reset}
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex justify-center w-full">
              <Button
                type="button"
                className="bg-traffic-blue hover:bg-traffic-darkblue"
                onClick={handleUploadClick}
                disabled={uploadMutation.isPending}
              >
                {uploadMutation.isPending ? 'Uploading...' : 'Analyze Traffic Signs'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadForm;
