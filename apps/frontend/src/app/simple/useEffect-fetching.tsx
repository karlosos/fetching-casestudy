import { Button, Loader } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { deleteElement as deleteElementApi, getElements } from '../../api';
import { ApiError } from '../../api/apiError';
import { Element } from '../../api/apiTypes';
import { ElementsTable, TableContainer, TableErrorStyled, TableInfo, TableLoader } from '../../ui/elements-table';

type Props = {
  elements: ReturnType<typeof useElements>;
};

/*
TODO:
- [x] loading spinner inside the table (under table headings)
- [x] instead of spinner there should be skeleton
- [ ] better styling of error component
- [ ] add info icon near actions to some info on hover
- [ ] fix height - scrollbar only on table
- [ ] maximum width for the content
- [ ] border on the last row
*/

export const UseEffectFetching: React.FC<Props> = ({ elements }) => {
  const { data, error, refetch, isLoading, isFetching, deleteElement, elementIdsBeingDeleted } = elements;

  return (
    <TableContainer
      toolbar={
        <>
          <div>
            <TableInfo totalElements={data?.length} />
          </div>
          <Button
            compact
            variant={'light'}
            onClick={() => refetch({ inForeground: false })}
            disabled={isFetching}
            size="xs"
            leftIcon={isFetching ? <Loader size={14} /> : <IconRefresh size={14} />}
          >
            {isFetching ? 'REFRESHING...' : 'REFRESH'}
          </Button>
        </>
      }
    >
      <ElementsTable
        error={
          error ? (
            <TableErrorStyled>
              {error.message} ({error.statusCode})
              <div>
                <Button variant={'light'} onClick={() => refetch()} leftIcon={<IconRefresh size={16} />}>
                  Refresh
                </Button>
              </div>
            </TableErrorStyled>
          ) : null
        }
        isLoading={!data || isLoading}
        data={
          !data
            ? []
            : data.map((element) => ({
                dn: element.dn,
                deviceType: element.deviceType,
                id: element.id,
                isDeletingInProgress: elementIdsBeingDeleted[element.id] === true,
                delete: () => deleteElement(element.id),
              }))
        }
      />
    </TableContainer>
  );
};

type FetchOptions = {
  inForeground?: boolean;
};

export const useElements = () => {
  const [elements, setElements] = useState<Element[]>();
  const [error, setError] = useState<ApiError>();
  const [status, setStatus] = useState<'idle' | 'loading' | 'fetching' | 'success' | 'failed'>('idle');

  const fetchElements = async ({ inForeground = true }: FetchOptions = {}) => {
    setError(undefined);
    inForeground ? setStatus('loading') : setStatus('fetching');
    try {
      const response = await getElements({
        size: 50,
        startIndex: 0,
      });
      setElements(response.elements);
      setStatus('success');
    } catch (e) {
      const error = e as ApiError;
      setError(error);
      inForeground && setStatus('failed');
    }
  };

  useEffect(() => {
    fetchElements();
  }, []);

  const refetch = async ({ inForeground = true }: FetchOptions = {}) => {
    await fetchElements({ inForeground });
  };

  const [elementIdsBeingDeleted, setElementIdsBeingDeleted] = useState<{ [id: string]: boolean }>({});

  const deleteElement = async (elementId: string) => {
    setElementIdsBeingDeleted((state) => ({ ...state, [elementId]: true }));
    deleteElementApi({
      elementId: elementId,
    })
      .then(() => {
        setElements((elements) => elements?.filter((element) => element.id !== elementId));
      })
      .catch(() => {
        console.log(">> couldn't delete", elementId);
      })
      .finally(() => {
        setElementIdsBeingDeleted((state) => ({ ...state, [elementId]: false }));
      });
  };

  return {
    data: elements,
    error,
    refetch,
    isLoading: status === 'loading',
    isFetching: status === 'loading' || status === 'fetching',
    deleteElement,
    elementIdsBeingDeleted,
  };
};
