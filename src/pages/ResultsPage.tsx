import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getResults } from '../services/api';
import { DetectionResult, ResultsResponse } from '../types';
import ResultCard from '../components/ui/ResultCard';

export default function ResultsPage() {
  const { jobId } = useParams();
  const [results, setResults] = useState<DetectionResult[]>([]);
  const [status, setStatus] = useState<'processing' | 'completed' | 'failed'>('processing');

  useEffect(() => {
    if (!jobId) return;
    getResults(jobId).then((data: ResultsResponse) => {
      setResults(data.results);
      setStatus(data.status);
    });
  }, [jobId]);

  if (status === 'processing') return <p>İşleniyor...</p>;
  if (status === 'failed') return <p>Bir hata oluştu.</p>;
  if (!results.length) return <p>Sonuç bulunamadı.</p>;

  return (
    <div className="results-container">
      {results.map((res) => (
        <ResultCard key={res.id} result={res} imageSrc={`/storage/${jobId}.png`} />
      ))}
    </div>
  );
}
