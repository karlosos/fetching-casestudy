import { useQuery } from '@tanstack/react-query';
import { getElements } from '../../api';

export const TanstackQueryView = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['elements'],
    queryFn: () =>
      getElements({size: 50, startIndex: 0})
  })

  if (error) {
    return (
      <div>
        {/* TODO: find a way how to use `data` and `status` fields from error */}
        {JSON.stringify(error)}
      </div>
    );
  }

  if (isLoading || !data) {
    return <div>Loading</div>;
  }

  return (
    <div>
      {data.elements.map((element) => (
        <div key={element.dn}>
          {element.dn} {element.deviceType}
        </div>
      ))}
    </div>
  );
};
