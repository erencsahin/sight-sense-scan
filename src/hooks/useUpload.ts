// src/hooks/useUpload.ts
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { uploadFile } from '../services/api';

export default function useUpload() {
  // ... uploadState, validation vs. aynı kalabilir

  const uploadMutation = useMutation({
    mutationFn: (file: File) => {
      console.log('[useUpload] uploadMutation: ', file.name);
      return uploadFile(file);
    },
    onMutate: () => { /* ... */ },
    onSuccess: () => {
      toast.success('File uploaded successfully');
      /* ... */
    },
    onError: () => {
      toast.error('Upload failed');
      /* ... */
    },
  });

  // ...
  return {
    uploadState,
    handleFileSelect,
    uploadMutation,
    reset,
  };
}
