import { useEffect, useState } from 'react';
import { getElements } from '../api';
import { ApiError } from '../api/apiError';
import { ElementData } from '../api/apiTypes';

export const ReduxThunkTable = () => {
  const { data, error } = useElements();

  if (error) {
    return (
      <div>
        {error.message} ({error.statusCode})
      </div>
    );
  }

  if (!data) {
    return <div>Loading</div>;
  }

  return (
    <div>
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

  const fetchElements = async () => {
    try {
      const response = await getElements({
        size: 50,
        startIndex: 0,
      });
      setElements(response.elements);
    } catch (e) {
      const error = e as ApiError;
      setError(error);
    }
  };

  useEffect(() => {
    fetchElements();
  }, []);

  return {
    data: elements,
    error: error,
  };
};
