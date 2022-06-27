import React from 'react';
import ReactDOM from 'react-dom';

import { createTable, useTable } from '@tanstack/react-table';
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer
} from '@chakra-ui/react';

const defaultData = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
];

const table = createTable();

const defaultColumns = table.createColumns([
  table.createGroup({
    header: 'Name',
    footer: props => props.column.id,
    columns: [
      table.createDataColumn('firstName', {
        cell: info => info.value,
        footer: props => props.column.id,
      }),
      table.createDataColumn(row => row.lastName, {
        id: 'lastName',
        cell: info => info.value,
        header: () => <span>Last Name</span>,
        footer: props => props.column.id,
      }),
    ],
  }),
  table.createGroup({
    header: 'Info',
    footer: props => props.column.id,
    columns: [
      table.createDataColumn('age', {
        header: () => 'Age',
        footer: props => props.column.id,
      }),
      table.createGroup({
        header: 'More Info',
        columns: [
          table.createDataColumn('visits', {
            header: () => <span>Visits</span>,
            footer: props => props.column.id,
          }),
          table.createDataColumn('status', {
            header: 'Status',
            footer: props => props.column.id,
          }),
          table.createDataColumn('progress', {
            header: 'Profile Progress',
            footer: props => props.column.id,
          }),
        ],
      }),
    ],
  }),
]);

function ReactTableTest() {
  const [data, setData] = React.useState(() => [...defaultData]);
  const [columns] = React.useState(() => [
    ...defaultColumns,
  ]);

  const rerender = React.useReducer(() => ({}), {})[1];

  const instance = useTable(table, {
    data,
    columns,
  });

  return (
    <TableContainer>
      <Table {...instance.getTableProps()}>
        <Thead>
          {instance.getHeaderGroups().map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(header => (
                <Th {...header.getHeaderProps()}>
                  {header.isPlaceholder ? null : header.renderHeader()}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...instance.getTableBodyProps()}>
          {instance.getRowModel().rows.map(row => (
            <Tr {...row.getRowProps()}>
              {row.getVisibleCells().map(cell => (
                <Td {...cell.getCellProps()}>{cell.renderCell()}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          {instance.getFooterGroups().map(footerGroup => (
            <Tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map(header => (
                <Th {...header.getFooterProps()}>
                  {header.isPlaceholder ? null : header.renderFooter()}
                </Th>
              ))}
            </Tr>
          ))}
        </Tfoot>
      </Table>
      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
    </TableContainer>
  );
}


export default ReactTableTest;
