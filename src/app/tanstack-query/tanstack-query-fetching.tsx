import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { deleteElement, getElements } from '../../api';
import { GetElementsResponse } from '../../api/apiTypes';

export const TanstackQueryFetching = () => {
  const queryClient = useQueryClient();

  const { error, data, refetch, isFetching, isLoading } = useQuery({
    queryKey: ['elements'],
    queryFn: () => getElements({ size: 50, startIndex: 0 }),
  });

  const [elementIdsBeingDeleted, setElementIdsBeingDeleted] = useState<{ [id: string]: boolean }>({});

  const deleteElementMutation = useMutation({
    mutationFn: deleteElement,
    onMutate: (variables) => {
      setElementIdsBeingDeleted((state) => ({ ...state, [variables.elementId]: true }));
    },
    onSuccess: (_data, variables, _context) => {
      const oldData = queryClient.getQueryData(['elements']) as GetElementsResponse;
      const newElements = oldData.elements.filter((element) => element.id !== variables.elementId);
      queryClient.setQueryData(['elements'], { totalElements: oldData.totalElements - 1, elements: newElements });
    },
    onError: (_error, variables, _context) => {
      console.log(">> couldn't create", variables);
    },
    onSettled: (data, error, variables, context) => {
      setElementIdsBeingDeleted((state) => ({ ...state, [variables.elementId]: false }));
    },
  });

  if (error && !isFetching) {
    return (
      <div>
        {/* TODO: find a way how to use `data` and `status` fields from error */}
        {JSON.stringify(error)}
        <div>
          <button onClick={() => refetch()}>Refresh</button>
        </div>
      </div>
    );
  }

  if (isLoading || error || !data) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      {data.elements.map((element) => (
        <div key={element.dn}>
          {element.dn} {element.deviceType}
          <button
            onClick={() => deleteElementMutation.mutate({ elementId: element.id })}
            disabled={elementIdsBeingDeleted[element.id] === true}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
