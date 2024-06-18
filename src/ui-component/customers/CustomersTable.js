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
  Chip,
  CircularProgress,
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
import BoyOutlinedIcon from "@mui/icons-material/BoyOutlined";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { Link } from "react-router-dom";
import { getFetcher, useGetAllCustomers } from "client/api/useRequest";

export const getTypesLabel = (type) => {
  switch (type) {
    case "REGULAR":
      return (
        <Chip
          icon={<BoyOutlinedIcon fontSize="small" />}
          label="Regular"
          color="default"
          size="small"
        ></Chip>
      );
    case "PRIVATE":
      return (
        <Chip
          icon={<CorporateFareOutlinedIcon fontSize="small" />}
          label="Privado"
          color="info"
          size="small"
        ></Chip>
      );
    default:
      return null;
  }
};
export default function CustomersTable({ showSearch }) {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [term, setTerm] = useState(null);
  const { customersList, customersError, isLoadingCustomers } =
    useGetAllCustomers(getFetcher, term, true);
  const applyPagination = (rowList, page, limit) => {
    return rowList.slice(page * limit, page * limit + limit);
  };
  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };
  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };
  const paginatedRows = applyPagination(customersList || [], page, limit);
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
      {isLoadingCustomers ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : customersError ? (
        <Grid item>
          <br />
          <Alert severity="error">{customersError.message}</Alert>
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
                  <TableCell>Nombre</TableCell>
                  <TableCell align="center">Tipo</TableCell>
                  <TableCell align="center">Teléfono</TableCell>
                  <TableCell align="center">Correo</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRows.map((row) => (
                  <TableRow
                    key={row.name}
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
                      {row.name}
                    </TableCell>

                    <TableCell align="center">
                      {getTypesLabel(row.type)}
                    </TableCell>

                    <TableCell align="center">{row.phone}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Detalle" arrow>
                        <Link to={`${row.id}`}>
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
