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
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      Object.values(row).some((value) =>
        value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [data, searchQuery]);

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
    <div className="overflow-x-auto max-w-full">
      <div className="p-4">
        <TextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          size="small"
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
            style: { fontSize: "14px", borderRadius: "8px" },
          }}
        />
      </div>

      <TableContainer component={Paper} className="shadow-md rounded-lg">
        <Table className="min-w-full">
          <TableHead>
            <TableRow>
              {Object.keys(data[0] || {}).map((key) => (
                <TableCell
                  key={key}
                  className="bg-gray-100 text-nowrap"
                  sx={{ paddingInline: "16px", paddingBlock: "8px" }}
                >
                  <TableSortLabel
                    active={orderBy === key}
                    direction={orderBy === key ? order : "asc"}
                    onClick={() => handleSort(key)}
                  >
                    <span className="font-semibold text-gray-600 text-sm">
                      {key.toUpperCase()}
                    </span>
                  </TableSortLabel>
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
                  <TableCell key={i} className="text-gray-700 !p-4  text-sm">
                    {value as string | number}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DataTable;
