// src/services/api.ts
import axios from 'axios';
import { DetectionResult, UploadResponse, ResultsResponse } from '../types';

// Vite ile .env'den de alabilirsiniz, ama sabit de bırakabiliriz:
const API_BASE = import.meta.env.VITE_API_URL || '';

const api = {
  // Gerçek dosya yükleme
  uploadFile: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await axios.post<UploadResponse>(
       `${API_BASE}/api/upload`,
       formData
     );
     return data;
  },
};


export async function getResults(jobId: string): Promise<ResultsResponse> {
  const { data } = await axios.get<ResultsResponse>(
    `${API_BASE}/api/results/${jobId}`
  )
  return data
}

export default api;
