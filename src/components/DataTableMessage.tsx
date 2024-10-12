import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  ColumnInstance,
  HeaderGroup,
  Row,
} from "react-table";

interface DataTableProps {
  data: Array<{ [key: string]: unknown }>;
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const columns = useMemo(
    () =>
      Object.keys(data[0] || {}).map((key) => ({
        Header: key.toUpperCase(),
        accessor: key,
      })),
    [data]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <table
      {...getTableProps()}
      className="min-w-full bg-gray-100 border-collapse border"
    >
      <thead>
        {headerGroups.map(
          (headerGroup: HeaderGroup<{ [key: string]: unknown }>) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map(
                (column: ColumnInstance<{ [key: string]: unknown }>) => (
                  <th
                    // @ts-expect-error - Temporarily ignoring TypeScript errors for sorting props
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={column.id}
                    className="p-2 border text-left cursor-pointer"
                  >
                    {column.render("Header")}
                    <span>
                      {/* @ts-expect-error - Temporarily ignoring TypeScript errors for sorting props */}
                      {column.isSorted
                        ? // @ts-expect-error - Temporarily ignoring TypeScript errors for sorting props
                          column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                )
              )}
            </tr>
          )
        )}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row: Row<{ [key: string]: unknown }>) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} key={cell.column.id}>
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
