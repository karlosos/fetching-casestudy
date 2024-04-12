import { useState } from 'react';
import { createStyles, Table, Checkbox, ScrollArea, Text, rem, Button, Loader, Badge, Skeleton } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import styled from '@emotion/styled';
import { neutral200, neutral50, slate50 } from './colors';

//
// Table Container
//
type TableContainerProps = {
  children: React.ReactElement;
  toolbar: React.ReactElement;
};
export const TableContainer = ({ children, toolbar }: TableContainerProps) => {
  return (
    <TableContainerStyled>
      <TableToolbarStyled>{toolbar}</TableToolbarStyled>
      <TableContentStyled>{children}</TableContentStyled>
    </TableContainerStyled>
  );
};

export const TableContainerStyled = styled.div``;

export const TableToolbarStyled = styled.div`
  padding: 8px 10px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${neutral200};
  align-items: center;
  font-size: 14px;
`;

export const TableContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

//
// Table body
//
const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor: theme.colors[theme.primaryColor][0],
  },
}));

interface ElementsTableProps {
  data: { id: string; dn: string; deviceType: string; delete: () => void; isDeletingInProgress: boolean }[];
  error: React.ReactElement | null;
  isLoading: boolean;
}

export function ElementsTable({ data, error, isLoading }: ElementsTableProps) {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState<Array<string>>([]);
  const toggleRow = (id: string) =>
    setSelection((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  const toggleAll = () =>
    setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.id)));

  const renderContent = () => {
    if (error) {
      return (
        <tr>
          <td rowSpan={5} colSpan={4}>
            {error}
          </td>
        </tr>
      );
    }
    if (isLoading) {
      return Array.from({ length: 3 }).map(() => <TableLoader />);
    }
    return rows;
  };

  const rows = data.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <TableRowStyled key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Checkbox
            size={'xs'}
            disabled
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
            transitionDuration={0}
          />
        </td>
        <td>
          <Text size="xs" weight={500} color="gray.8">
            {item.dn}
          </Text>
        </td>
        <td>
          <Badge radius="sm" color="gray" styles={{ root: { textTransform: 'none' } }}>
            {item.deviceType}
          </Badge>
        </td>
        <TableActionCellStyled style={{ textAlign: 'right' }}>
          <Button
            variant="light"
            color="gray.8"
            onClick={item.delete}
            disabled={item.isDeletingInProgress}
            compact
            title="Delete element"
          >
            {item.isDeletingInProgress ? <Loader size={16} /> : <IconTrash size={16} />}
          </Button>
        </TableActionCellStyled>
      </TableRowStyled>
    );
  });

  return (
    <ScrollArea.Autosize
      mah="calc(100vh - 57px)"
      styles={(_theme) => ({
        scrollbar: {
          zIndex: 2,
        },
      })}
    >
      <Table verticalSpacing={4} style={{ tableLayout: 'fixed' }} fontSize={'12px'}>
        <TableHeadStyled>
          <tr>
            <th style={{ width: rem(30) }}>
              <Checkbox
                size={'xs'}
                disabled
                onChange={toggleAll}
                checked={selection.length === data.length && selection.length > 0}
                indeterminate={selection.length > 0 && selection.length !== data.length}
                transitionDuration={0}
              />
            </th>
            <th>DN</th>
            <th>Device Type</th>
            <th></th>
          </tr>
        </TableHeadStyled>
        <tbody>{renderContent()}</tbody>
      </Table>
    </ScrollArea.Autosize>
  );
}

const TableHeadStyled = styled.thead`
  background-color: ${slate50};
  position: sticky;
  top: 0;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-bottom: 0.15rem solid #dee2e6;
  }
`;

const TableActionCellStyled = styled.td`
  button {
    opacity: 0;
  }

  button:disabled {
    opacity: 1;
  }
`;

const TableRowStyled = styled.tr`
  td {
    height: 36.17px;
  }

  &:hover,
  &:focus-within {
    background-color: ${neutral50};

    ${TableActionCellStyled} {
      button {
        opacity: 1;
      }
    }
  }

  &:last-of-type {
    border-bottom: 0.0625rem solid #dee2e6;
  }
`;

//
// Table info
//
type TableInfoProps = {
  totalElements?: number;
};

export const TableInfo = ({ totalElements }: TableInfoProps) => {
  return (
    <TableInfoStyled>
      <Text fw={600} c="dark.5">
        Elements
      </Text>
      <Badge>{totalElements ?? '???'}</Badge>
    </TableInfoStyled>
  );
};

const TableInfoStyled = styled.div`
  display: flex;
  gap: 0.75em;
  align-items: center;
`;

//
// Table loader
//
export const TableLoader = () => {
  return (
    <TableRowStyled>
      <td>
        <Checkbox size={'xs'} disabled transitionDuration={0} />
      </td>
      <td>
        <Skeleton height={16} radius="xl" width="200px" />
      </td>
      <td>
        <Skeleton height={16} radius="xl" width="150px" />
      </td>
      <td></td>
    </TableRowStyled>
  );
};

//
// Table error
//
export const TableErrorStyled = styled.div`
  margin-top: 32px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  font-weight: 500;
  font-size: 13px;
`;
