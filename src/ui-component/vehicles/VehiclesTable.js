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
  Box,
  Card,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TablePagination,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { Link } from "react-router-dom";

export default function VehiclesTable({
  rows,
  showSearch,
  whitDetail,
  onSelectRow,
  selectedRow,
  searchTerm,
  onSearchTerm,
}) {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [term, setTerm] = useState(searchTerm);
  const applyPagination = (rowList, page, limit) => {
    return rowList.slice(page * limit, page * limit + limit);
  };
  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };
  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };
  const theme = useTheme();
  const paginatedRows = applyPagination(rows, page, limit);
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
                  value={term || ""}
                  onChange={(event) => {
                    setTerm(event.target.value);
                  }}
                  onKeyDown={(ev) => {
                    if (ev.key === "Enter") {
                      ev.preventDefault();
                      onSearchTerm(term);
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Serie</TableCell>
              <TableCell align="center">Placa</TableCell>
              <TableCell align="center">Cliente</TableCell>
              <TableCell align="center">Marca</TableCell>
              <TableCell align="center">Modelo</TableCell>
              <TableCell align="center">Año</TableCell>
              {whitDetail && <TableCell align="center"></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows?.map((row) => (
              <TableRow
                key={row.VIN}
                selected={selectedRow ? selectedRow.VIN === row.VIN : false}
                sx={{
                  "&.MuiTableRow-root:hover": {
                    backgroundColor: theme.palette.primary.light,
                  },
                  "&.MuiTableRow-root.Mui-selected": {
                    backgroundColor: theme.palette.secondary.main,
                  },

                  cursor: "pointer",
                }}
                onClick={() => {
                  if (onSelectRow) {
                    onSelectRow(row);
                  }
                }}
              >
                <TableCell component="th" scope="row">
                  {row.VIN}
                </TableCell>
                <TableCell align="center">{row.plates}</TableCell>
                <TableCell align="center">
                  {row.customer_vehicle_customerTocustomer?.name}
                </TableCell>
                <TableCell align="center">{row.vehicles_db?.make}</TableCell>
                <TableCell align="center">{row.vehicles_db?.model}</TableCell>
                <TableCell align="center">{row.vehicles_db?.year}</TableCell>
                {whitDetail && (
                  <TableCell align="center">
                    <Tooltip title="Detalle" arrow>
                      <Link to={"56"}>
                        <IconButton
                          sx={{
                            "&:hover": {
                              background: theme.palette.primary.lighter,
                            },
                            color: theme.palette.primary.main,
                          }}
                          color="inherit"
                          size="small"
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Link>
                    </Tooltip>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {paginatedRows?.length === 0 && (
        <Typography variant="h3" margin={2} color="#FD5B5B" textAlign="center">
          No se encontraron registros
        </Typography>
      )}
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
    </Card>
  );
}
