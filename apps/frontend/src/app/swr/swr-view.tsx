import useSWR from 'swr';
import { getElements } from '../../api';

export const SwrView = () => {
  const { isLoading, error, data } = useSWR('elements', () => getElements({ size: 50, startIndex: 0 }));

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
