import { useEffect, useState } from 'react';
import { ApiError } from '../../api/apiError';
import { getElements } from '../../api';
import { deleteElementApi } from '../../api/deleteElement/deleteElementApi';
import { Element } from '../../api/apiTypes';

type FetchOptions = {
  inForeground?: boolean;
};

export const useElements = () => {
  const [elements, setElements] = useState<Element[]>();
  const [error, setError] = useState<ApiError>();
  const [status, setStatus] = useState<'idle' | 'loading' | 'fetching' | 'success' | 'failed'>('idle');

  const fetchElements = async ({ inForeground = true }: FetchOptions = {}) => {
    setError(undefined);
    if (inForeground || status === 'failed') {
      setStatus('loading');
    } else {
      setStatus('fetching');
    }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    isFetching: status === 'loading' || status === 'fetching',
    deleteElement,
    elementIdsBeingDeleted,
  };
};
