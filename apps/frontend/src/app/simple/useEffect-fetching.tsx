import { useEffect, useState } from 'react';
import { deleteElement as deleteElementApi, getElements } from '../../api';
import { ApiError } from '../../api/apiError';
import { Element } from '../../api/apiTypes';

type Props = {
  elements: ReturnType<typeof useElements>;
};

export const UseEffectFetching: React.FC<Props> = ({ elements }) => {
  const { data, error, refetch, isLoading, deleteElement, elementIdsBeingDeleted } = elements;
  if (error) {
    return (
      <div>
        {error.message} ({error.statusCode})
        <div>
          <button onClick={() => refetch()}>Refresh</button>
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
        <button onClick={() => refetch()}>Refresh</button>
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

type FetchOptions = {
  inForeground?: boolean;
};

export const useElements = () => {
  const [elements, setElements] = useState<Element[]>();
  const [error, setError] = useState<ApiError>();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'failed'>('idle');

  const fetchElements = async ({ inForeground = true}: FetchOptions = {}) => {
    setError(undefined);
    inForeground && setStatus('loading');
    try {
      const response = await getElements({
        size: 50,
        startIndex: 0,
      });
      setElements(response.elements);
      inForeground && setStatus('success');
    } catch (e) {
      const error = e as ApiError;
      setError(error);
      inForeground && setStatus('failed');
    }
  };

  useEffect(() => {
    fetchElements();
  }, []);

  const refetch = async ({ inForeground = true }: FetchOptions = {}) => {
    await fetchElements({ inForeground });
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
