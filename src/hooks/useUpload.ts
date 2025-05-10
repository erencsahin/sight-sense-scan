
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import api from '../services/api';
import { FileUploadState } from '../types';
import { toast } from 'sonner';

const useUpload = () => {
  const [uploadState, setUploadState] = useState<FileUploadState>({
    file: null,
    preview: null,
    isVideo: false,
    status: 'idle',
  });

  // Video file extensions
  const videoExtensions = ['.mp4', '.mov', '.avi', '.webm'];
  
  // Image file extensions
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
  
  // Allowed file extensions
  const allowedExtensions = [...imageExtensions, ...videoExtensions];
  
  // Max file size (10MB in bytes)
  const maxFileSize = 10 * 1024 * 1024;

  // Validation function
  const validateFile = (file: File): { valid: boolean; error?: string } => {
    const extension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    
    if (!allowedExtensions.includes(extension)) {
      return {
        valid: false,
        error: `File type not supported. Please upload ${imageExtensions.join(', ')} or ${videoExtensions.join(', ')} files.`
      };
    }
    
    if (file.size > maxFileSize) {
      return {
        valid: false,
        error: `File is too large. Maximum size is ${maxFileSize / (1024 * 1024)}MB.`
      };
    }
    
    return { valid: true };
  };

  // Handle file selection
  const handleFileSelect = (file: File | null) => {
    if (!file) {
      setUploadState({
        file: null,
        preview: null,
        isVideo: false,
        status: 'idle'
      });
      return;
    }
    
    const validation = validateFile(file);
    
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }
    
    const isVideoFile = videoExtensions.includes(`.${file.name.split('.').pop()?.toLowerCase()}`);
    const objectUrl = URL.createObjectURL(file);
    
    setUploadState({
      file,
      preview: objectUrl,
      isVideo: isVideoFile,
      status: 'idle'
    });
  };

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: (file: File) => api.uploadFile(file),
    onMutate: () => {
      setUploadState(prev => ({ ...prev, status: 'uploading' }));
    },
    onSuccess: () => {
      setUploadState(prev => ({ ...prev, status: 'success' }));
      toast.success('File uploaded successfully');
    },
    onError: (error) => {
      setUploadState(prev => ({ 
        ...prev, 
        status: 'error', 
        error: error instanceof Error ? error.message : 'Upload failed'
      }));
      toast.error('Upload failed. Please try again.');
    }
  });

  // Reset state
  const reset = () => {
    if (uploadState.preview) {
      URL.revokeObjectURL(uploadState.preview);
    }
    
    setUploadState({
      file: null,
      preview: null,
      isVideo: false,
      status: 'idle'
    });
  };

  return {
    uploadState,
    handleFileSelect,
    uploadMutation,
    reset,
    validateFile
  };
};

export default useUpload;
