import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { useMemo, useState } from "react";

interface DataTableProps {
  data: Array<{ [key: string]: unknown }>;
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string | null>(null);

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = useMemo(() => {
    if (!orderBy) return data;
    return [...data].sort((a, b) => {
      const aValue = a[orderBy] as string | number;
      const bValue = b[orderBy] as string | number;

      if (aValue < bValue) return order === "asc" ? -1 : 1;
      if (aValue > bValue) return order === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, order, orderBy]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(data[0] || {}).map((key) => (
              <TableCell key={key}>
                <TableSortLabel
                  active={orderBy === key}
                  direction={orderBy === key ? order : "asc"}
                  onClick={() => handleSort(key)}
                >
                  {key.toUpperCase()}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row, index) => (
            <TableRow key={index}>
              {Object.values(row).map((value, i) => (
                <TableCell key={i}>{value as string | number}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
