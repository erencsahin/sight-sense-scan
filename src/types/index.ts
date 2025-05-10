
export type FileUploadState = {
  file: File | null;
  preview: string | null;
  isVideo: boolean;
  status: 'idle' | 'uploading' | 'success' | 'error';
  error?: string;
};

export type DetectionResult = {
  id: string;
  label: string;
  confidence: number;
  bbox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  timestamp?: number; // Only for video frames
};

export type UploadResponse = {
  jobId: string;
};

export type ResultsResponse = {
  results: DetectionResult[];
  status: 'processing' | 'completed' | 'failed';
  message?: string;
};
