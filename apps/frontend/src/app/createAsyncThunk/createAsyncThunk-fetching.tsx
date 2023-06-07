import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { RootState } from '../store';
import { deleteElement, fetchElements } from './slice';

export const AsyncThunkFetching = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchElements({ size: 50, startIndex: 0 }));
  }, [dispatch]);

  const refetch = () => {
    dispatch(fetchElements({ size: 50, startIndex: 0 }));
  };

  const data = useAppSelector((state: RootState) => state.elementsCreateAsyncThunkFetching.elements);
  const fetchingStatus = useAppSelector(
    (state: RootState) => state.elementsCreateAsyncThunkFetching.fetchingElementsStatus
  );
  const error = useAppSelector((state: RootState) => state.elementsCreateAsyncThunkFetching.fetchingElementsError);

  const elementIdsBeingDeleted = useAppSelector(
    (state: RootState) => state.elementsCreateAsyncThunkFetching.elementIdsBeingDeleted
  );

  if (error && fetchingStatus === 'rejected') {
    return (
      <div>
        {error.message} ({error.statusCode})
        <div>
          <button onClick={refetch}>Refresh</button>
        </div>
      </div>
    );
  }

  if (!data || error) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <div>
        <button onClick={refetch} disabled={fetchingStatus === 'pending'}>
          {fetchingStatus === 'pending' ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      {data.map((element) => (
        <div key={element.dn}>
          {element.dn} {element.deviceType}{' '}
          <button
            onClick={() => dispatch(deleteElement(element.id))}
            disabled={elementIdsBeingDeleted[element.id] === true}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
