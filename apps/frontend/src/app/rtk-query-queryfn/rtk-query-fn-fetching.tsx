import { useAppSelector } from '../hooks';
import { RootState } from '../store';
import { useDeleteElementMutation, useGetElementsQuery } from './api';

export const RtkQueryFnFetching = () => {
  const { data, isLoading, error, refetch, isFetching } = useGetElementsQuery();
  const [deleteElement, _result] = useDeleteElementMutation();

  const elementIdsBeingDeleted = useAppSelector((state: RootState) => state.elementsRtkQuery.elementIdsBeingDeleted);

  if (error && !isFetching) {
    return (
      <div>
        {/* TODO: find a way how to use `data` and `status` fields from error */}
        {JSON.stringify(error)}
        <div>
          <button onClick={refetch}>Refresh</button>
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
        <button onClick={refetch} disabled={isFetching}>
          {isFetching ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      {data.elements.map((element) => (
        <div key={element.dn}>
          {element.dn} {element.deviceType}
          <button onClick={() => deleteElement(element.id)} disabled={elementIdsBeingDeleted[element.id] === true}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
