import { useEffect, useState } from 'react';
import { getElements } from '../../api';
import { ApiError } from '../../api/apiError';
import { ElementData } from '../../api/apiTypes';

export const UseEffectFetchingView = () => {
  const { data, error, refetch, isLoading } = useElements();

  if (error) {
    return (
      <div>
        {error.message} ({error.statusCode})
        <div>
          <button onClick={refetch}>Refresh</button>
        </div>
      </div>
    );
  }

  if (!data || isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <div>
        <button onClick={refetch}>Refresh</button>
      </div>
      {data.map((element) => (
        <div key={element.dn}>
          {element.dn} {element.deviceType}
        </div>
      ))}
    </div>
  );
};

const useElements = () => {
  const [elements, setElements] = useState<ElementData[]>();
  const [error, setError] = useState<ApiError>();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'failed'>('idle');

  const fetchElements = async () => {
    setError(undefined);
    setStatus('loading');
    try {
      const response = await getElements({
        size: 50,
        startIndex: 0,
      });
      setElements(response.elements);
      setStatus('success');
    } catch (e) {
      const error = e as ApiError;
      setError(error);
      setStatus('failed');
    }
  };

  useEffect(() => {
    fetchElements();
  }, []);

  const refetch = () => {
    fetchElements();
  };

  return {
    data: elements,
    error: error,
    refetch: refetch,
    isLoading: status === 'loading',
  };
};
