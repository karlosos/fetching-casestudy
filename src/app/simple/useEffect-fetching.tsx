import { Button, Loader } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { ElementsTable, TableContainer, TableErrorStyled, TableInfo } from '../../ui/elements-table';
import { useElements } from './use-elements';

type Props = {
  elements: ReturnType<typeof useElements>;
};

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
