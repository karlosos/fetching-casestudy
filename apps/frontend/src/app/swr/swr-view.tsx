import useSWR from 'swr';
import { deleteElement, getElements } from '../../api';
import { Element } from '../../api/apiTypes';
import { useState } from 'react';

export const SwrView = () => {
  const { isLoading, error, data, isValidating, mutate } = useSWR('elements', () =>
    getElements({ size: 50, startIndex: 0 })
  );

  const [elementIdsBeingDeleted, setElementIdsBeingDeleted] = useState<{ [id: string]: boolean }>({});

  const refetch = () => {
    mutate();
  };

  const handleDeleteElement = async (elementToBeRemoved: Element) => {
    if (!data) {
      return;
    }

    try {
      setElementIdsBeingDeleted((state) => ({ ...state, [elementToBeRemoved.id]: true }));
      await deleteElement({ elementId: elementToBeRemoved.id });
      mutate(
        {
          totalElements: data?.totalElements - 1,
          elements: data?.elements.filter((element) => element.id !== elementToBeRemoved.id),
        },
        { revalidate: false }
      );
    } catch (e) {
      console.log(">> couldn't delete", elementToBeRemoved);
    }
    setElementIdsBeingDeleted((state) => ({ ...state, [elementToBeRemoved.id]: false }));
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
          <button onClick={() => handleDeleteElement(element)} disabled={elementIdsBeingDeleted[element.id] === true}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
