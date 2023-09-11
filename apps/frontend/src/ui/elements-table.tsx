import { useState } from 'react';
import { createStyles, Table, Checkbox, ScrollArea, Text, rem, Button, Loader, Badge } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import styled from '@emotion/styled';
import { neutral200 } from './colors';

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

export const TableContainerStyled = styled.div`
  border: 2px solid ${neutral200};
  border-radius: 8px;
  height: 100%;
`;

export const TableToolbarStyled = styled.div`
  padding: 8px 10px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${neutral200};
  align-items: center;
`;

export const TableContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

//
// Table body
//
const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

interface ElementsTableProps {
  data: { id: string; dn: string; deviceType: string; delete: () => void; isDeletingInProgress: boolean }[];
}

export function ElementsTable({ data }: ElementsTableProps) {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState<Array<string>>([]);
  const toggleRow = (id: string) =>
    setSelection((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  const toggleAll = () =>
    setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.id)));

  const rows = data.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Checkbox
            disabled
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
            transitionDuration={0}
          />
        </td>
        <td>
          <Text size="sm" weight={500}>
            {item.dn}
          </Text>
        </td>
        <td>
          <Badge radius="sm" color="gray" styles={{ root: { textTransform: 'none' } }}>
            {item.deviceType}
          </Badge>
        </td>
        <td style={{textAlign: 'right'}}>
          <Button
            variant="outline"
            color="blue.5"
            compact
            onClick={item.delete}
            disabled={item.isDeletingInProgress}
            leftIcon={item.isDeletingInProgress ? <Loader size={16} /> : <IconTrash size={16} />}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="xs">
        <thead>
          <tr>
            <th style={{ width: rem(40) }}>
              <Checkbox
                disabled
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={selection.length > 0 && selection.length !== data.length}
                transitionDuration={0}
              />
            </th>
            <th>DN</th>
            <th>Device Type</th>
            <th style={{textAlign: 'right'}}>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

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
    <TableLoaderStyled>
      <Loader size="lg" variant="dots" />
    </TableLoaderStyled>
  );
};

const TableLoaderStyled = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

//
// Table error
//
export const TableErrorStyled = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;
