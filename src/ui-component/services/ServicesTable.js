import * as React from "react";
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
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  TablePagination,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { useState } from "react";

export const getStatusLabel = (status) => {
  switch (status) {
    case "COMPLETED":
      return (
        <Chip
          icon={<DoneOutlineIcon fontSize="small" />}
          label="Completado"
          color="success"
          size="small"
        ></Chip>
      );
    case "IN_PROGRESS":
      return (
        <Chip
          icon={<BuildOutlinedIcon fontSize="small" />}
          label="En progreso"
          color="warning"
          size="small"
        ></Chip>
      );
    case "CANCELED":
      return (
        <Chip
          icon={<DoNotDisturbOnOutlinedIcon fontSize="small" />}
          label="Cancelado"
          color="error"
          size="small"
        ></Chip>
      );
  }
};
export default function ServicesTable({
  rows,
  showSearch,
  searchTerm,
  onSearchTerm,
}) {
  const theme = useTheme();
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
              <TableCell>Estado</TableCell>
              <TableCell align="center">Cliente</TableCell>
              <TableCell align="center">Vehiculo</TableCell>
              <TableCell align="center">Cobrado</TableCell>
              <TableCell align="center">Fecha</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                selected={row.isSelected}
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
                  {getStatusLabel(row.status)}
                </TableCell>
                <TableCell align="center">
                  {
                    row.vehicle_service_vehicleTovehicle
                      ?.customer_vehicle_customerTocustomer?.name
                  }
                </TableCell>
                <TableCell align="center">
                  {row.vehicle_service_vehicleTovehicle?.vehicles_db?.model +
                    "-" +
                    row.vehicle_service_vehicleTovehicle?.vehicles_db?.year}
                </TableCell>
                <TableCell align="center">{row.billed}</TableCell>
                <TableCell align="center">{row.startDate}</TableCell>
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
