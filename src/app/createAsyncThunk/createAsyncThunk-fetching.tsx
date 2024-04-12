import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { RootState } from '../store';
import { RequestStatus } from '../types';
import { deleteElement, fetchElements } from './slice';

export const AsyncThunkFetching = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchElements({ size: 50, startIndex: 0 }));
  }, [dispatch]);

  const refetch = () => {
    dispatch(fetchElements({ size: 50, startIndex: 0 }));
  };

  const data = useAppSelector((state: RootState) => state.elementsWithCreateAsyncThunk.elements);
  const fetchingStatus = useAppSelector(
    (state: RootState) => state.elementsWithCreateAsyncThunk.fetchingElementsStatus,
  );
  const error = useAppSelector((state: RootState) => state.elementsWithCreateAsyncThunk.fetchingElementsError);

  const elementIdsBeingDeleted = useAppSelector(
    (state: RootState) => state.elementsWithCreateAsyncThunk.elementIdsBeingDeleted,
  );

  if (error && fetchingStatus === RequestStatus.Failed) {
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
        <button onClick={refetch} disabled={fetchingStatus === RequestStatus.Ongoing}>
          {fetchingStatus === RequestStatus.Ongoing ? 'Refreshing...' : 'Refresh'}
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
