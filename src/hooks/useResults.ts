import { useQuery } from '@tanstack/react-query';
import api, { getResults } from '../services/api';
import { ResultsResponse } from '../types';

const useResults = (jobId: string | null, enabled: boolean = false) => {
  return useQuery({
    queryKey: ['results', jobId],
    queryFn: () => {
      if (!jobId) throw new Error('No job ID provided');
      return getResults(jobId);
    },
    enabled: !!jobId && enabled,
    refetchInterval: (query) => {
      // Implement polling - refetch every 2 seconds until processing is complete
      return query.state.data?.status === 'processing' ? 2000 : false;
    },
    refetchOnWindowFocus: false
  });
};

export default useResults;
