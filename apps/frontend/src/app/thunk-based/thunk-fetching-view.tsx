import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { RootState } from '../store';
import { fetchElementsThunk } from './slice';

export const ThunkFetchingView = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchElementsThunk({
        size: 50,
        startIndex: 0,
      })
    );
  }, [dispatch]);

  const refetch = () => {
    dispatch(
      fetchElementsThunk({
        size: 50,
        startIndex: 0,
      })
    );
  };

  const data = useAppSelector((state: RootState) => state.elementsThunkFetching.elements);
  const fetchingStatus = useAppSelector((state: RootState) => state.elementsThunkFetching.fetchingElementsStatus);
  const error = useAppSelector((state: RootState) => state.elementsThunkFetching.fetchingElementsError);

  if (error && fetchingStatus === 'failed') {
    return (
      <div>
        {error.message} ({error.statusCode})
        <div>
          <button onClick={refetch}>Refresh</button>
        </div>
      </div>
    );
  }

  if (!data || fetchingStatus === 'ongoing') {
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
