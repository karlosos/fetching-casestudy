import { useQuery } from '@tanstack/react-query';
import { getElements } from '../../api';

export const TanstackQueryView = () => {
  const { error, data, refetch, isFetching } = useQuery({
    queryKey: ['elements'],
    queryFn: () =>
      getElements({size: 50, startIndex: 0})
  })

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

  if (isFetching || !data) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => refetch()}>Refresh</button>
      </div>
      {data.elements.map((element) => (
        <div key={element.dn}>
          {element.dn} {element.deviceType}
        </div>
      ))}
    </div>
  );
};
