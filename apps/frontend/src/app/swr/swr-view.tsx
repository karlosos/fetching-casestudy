import useSWR, { useSWRConfig } from 'swr';
import { getElements } from '../../api';

export const SwrView = () => {
  const { mutate } = useSWRConfig();
  const { isLoading, error, data, isValidating } = useSWR('elements', () => getElements({ size: 50, startIndex: 0 }));

  const refetch = () => {
    mutate('elements');
  };

  if (error && !isValidating) {
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

  if (isLoading || isValidating || !data) {
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
