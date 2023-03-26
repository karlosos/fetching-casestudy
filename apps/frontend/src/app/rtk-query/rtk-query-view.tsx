import { useGetElementsQuery } from './api';

export const RtkQueryView = () => {
  const { data, isLoading, error, refetch, isFetching } = useGetElementsQuery();

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

  if (isLoading || isFetching || !data) {
    return <div>Loading</div>;
  }

  return (
    <div>
        <div>
          <button onClick={refetch}>Refresh</button>
        </div>
      {data.elements.map((element) => (
        <div key={element.dn}>
          {element.dn} {element.deviceType}
        </div>
      ))}
    </div>
  );
};
