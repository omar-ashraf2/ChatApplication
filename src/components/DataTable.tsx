import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useMemo, useState } from "react";

interface DataTableProps {
  data: Array<{ [key: string]: unknown }>;
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string | null>(null);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFilterChange = (property: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [property]: value,
    }));
  };

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      Object.keys(filters).every((key) => {
        const value = row[key] as string | number;
        return value
          .toString()
          .toLowerCase()
          .includes(filters[key].toLowerCase());
      })
    );
  }, [data, filters]);

  const sortedData = useMemo(() => {
    if (!orderBy) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aValue = a[orderBy] as string | number;
      const bValue = b[orderBy] as string | number;

      if (aValue < bValue) return order === "asc" ? -1 : 1;
      if (aValue > bValue) return order === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, order, orderBy]);

  return (
    <TableContainer component={Paper} className="shadow-md rounded-lg">
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(data[0] || {}).map((key) => (
              <TableCell key={key} className="bg-gray-100">
                <div className="flex justify-between items-center">
                  <TableSortLabel
                    active={orderBy === key}
                    direction={orderBy === key ? order : "asc"}
                    onClick={() => handleSort(key)}
                  >
                    <span className="font-semibold text-gray-600">
                      {key.toUpperCase()}
                    </span>
                  </TableSortLabel>
                  <TextField
                    value={filters[key] || ""}
                    onChange={(e) => handleFilterChange(key, e.target.value)}
                    placeholder={`Search`}
                    size="small"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search fontSize="small" />
                        </InputAdornment>
                      ),
                      style: { borderRadius: 8 },
                    }}
                    className="ml-2"
                  />
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row, index) => (
            <TableRow
              key={index}
              hover
              className="hover:bg-gray-50 transition duration-200 ease-in-out"
            >
              {Object.values(row).map((value, i) => (
                <TableCell key={i} className="text-gray-700 p-4">
                  {value as string | number}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
