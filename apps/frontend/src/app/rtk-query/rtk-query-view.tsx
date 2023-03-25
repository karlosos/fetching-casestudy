import { useGetElementsQuery } from './api';

export const RtkQueryView = () => {
  const { data, isLoading, error } = useGetElementsQuery();

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
