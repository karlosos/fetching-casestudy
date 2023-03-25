
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RootState } from "../store";
import { fetchElements } from "./slice";

export const AsyncThunkFetchingView = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchElements({ size: 50, startIndex: 0 }));
  }, [dispatch])

  const data = useAppSelector((state: RootState) => state.elementsCreateAsyncThunkFetching.elements);
  const fetchingStatus = useAppSelector((state: RootState) => state.elementsCreateAsyncThunkFetching.fetchingElementsStatus);
  const error = useAppSelector((state: RootState) => state.elementsCreateAsyncThunkFetching.fetchingElementsError);

  if (error && fetchingStatus === 'rejected') {
    return (
      <div>
        {error.message} ({error.statusCode})
      </div>
    );
  }

  if (!data || fetchingStatus === 'pending') {
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
