import { useEffect, useState } from 'react';
import { deleteElement as deleteElementApi, getElements } from '../../api';
import { ApiError } from '../../api/apiError';
import { Element } from '../../api/apiTypes';

export const UseEffectFetchingView = () => {
  const { data, error, refetch, isLoading, deleteElement, elementIdsBeingDeleted } = useElements();

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
          {element.dn} {element.deviceType}{' '}
          <button onClick={() => deleteElement(element.id)} disabled={elementIdsBeingDeleted[element.id] === true}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

const useElements = () => {
  const [elements, setElements] = useState<Element[]>();
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

  const [elementIdsBeingDeleted, setElementIdsBeingDeleted] = useState<{ [id: string]: boolean }>({});

  const deleteElement = async (elementId: string) => {
    setElementIdsBeingDeleted((state) => ({ ...state, [elementId]: true }));
    deleteElementApi({
      elementId: elementId,
    })
      .then(() => {
        setElements((elements) => elements?.filter((element) => element.id !== elementId));
      })
      .catch(() => {
        console.log(">> couldn't delete", elementId);
      })
      .finally(() => {
        setElementIdsBeingDeleted((state) => ({ ...state, [elementId]: false }));
      });
  };

  return {
    data: elements,
    error,
    refetch,
    isLoading: status === 'loading',
    deleteElement,
    elementIdsBeingDeleted,
  };
};
