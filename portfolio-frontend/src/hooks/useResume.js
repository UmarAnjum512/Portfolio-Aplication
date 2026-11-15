import { useEffect, useState } from 'react';
import { getResumeInfo } from '../services/api';
import { resumeUrl } from '../services/url';

// Backend se CV ka status leta hai. Agar backend par CV nahi hai to purani static CV use hoti hai.
const FALLBACK = '/assets/Umar-Madni-CV.pdf';

export default function useResume() {
  const [info, setInfo] = useState({ loading: true, exists: false });

  useEffect(() => {
    getResumeInfo()
      .then((res) => setInfo({ loading: false, ...res.data }))
      .catch(() => setInfo({ loading: false, exists: false }));
  }, []);

  return {
    loading: info.loading,
    fromBackend: !!info.exists,
    downloadUrl: info.exists ? resumeUrl() : FALLBACK,
    viewUrl: info.exists ? resumeUrl(true) : FALLBACK,
  };
}
