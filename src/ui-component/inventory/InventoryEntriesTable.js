import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Alert,
  Box,
  Card,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  InputAdornment,
  TablePagination,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getFetcher, useGetAllProductEntries } from "client/api/useRequest";

export default function InventoryEntriesTable({ showSearch }) {
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [term, setTerm] = useState(null);
  const { entriesList, entriesError, isLoadingEntries } =
    useGetAllProductEntries(getFetcher, term, true);
  const applyPagination = (rowList, page, limit) => {
    return rowList.slice(page * limit, page * limit + limit);
  };
  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };
  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };
  const paginatedRows = applyPagination(entriesList || [], page, limit);

  return (
    <Card>
      <CardHeader
        action={
          showSearch ? (
            <Box width={200}>
              <>
                <TextField
                  size="small"
                  id="input-search"
                  label="Buscar"
                  helperText="Escriba y presione ENTER"
                  onKeyDown={(ev) => {
                    if (ev.key === "Enter") {
                      ev.preventDefault();
                      setTerm(ev.target.value);
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ marginTop: "20px" }}
                />
              </>
            </Box>
          ) : null
        }
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
        title=""
      />
      <Divider />
      {isLoadingEntries ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : entriesError ? (
        <Grid item>
          <br />
          <Alert severity="error">{entriesError.message}</Alert>
        </Grid>
      ) : paginatedRows?.length === 0 ? (
        <Typography variant="h3" margin={2} color="#FD5B5B" textAlign="center">
          No se encontraron registros
        </Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Código</TableCell>
                  <TableCell align="center">Nombre</TableCell>
                  <TableCell align="center">Cantidad</TableCell>
                  <TableCell align="center">Costo</TableCell>
                  <TableCell align="center">Proveedor </TableCell>
                  <TableCell align="center">Fecha</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRows.map((row) => (
                  <TableRow
                    key={row.code}
                    sx={{
                      "&.MuiTableRow-root:hover": {
                        backgroundColor: theme.palette.primary.light,
                      },
                      "&.MuiTableRow-root.Mui-selected": {
                        backgroundColor: theme.palette.secondary.main,
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.products?.code}
                    </TableCell>
                    <TableCell align="center">{row.products?.name}</TableCell>
                    <TableCell align="center">+{row.qty}</TableCell>
                    <TableCell align="center">{row.cost}</TableCell>
                    <TableCell align="center">
                      {row.supplier_product_entry_supplierTosupplier?.name}
                    </TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box p={2}>
            <TablePagination
              labelRowsPerPage="# de resultados"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`
              }
              component="div"
              count={paginatedRows.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25, 30]}
            />
          </Box>
        </>
      )}
    </Card>
  );
}
