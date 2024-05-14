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
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { Link } from "react-router-dom";

export default function VehiclesTable({ rows, showSearch, whitDetail }) {
  const theme = useTheme();
  return (
    <Card>
      <CardHeader
        action={
          showSearch ? (
            <Box width={200}>
              <>
                <TextField
                  size="small"
                  id="input-search-customer"
                  label="Buscar"
                  onChange={() => {}}
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
            {rows?.map((row) => (
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

                  cursor: "pointer",
                }}
              >
                <TableCell component="th" scope="row">
                  {row.serie}
                </TableCell>
                <TableCell align="center">{row.plate}</TableCell>
                <TableCell align="center">{row.customer}</TableCell>
                <TableCell align="center">{row.brand}</TableCell>
                <TableCell align="center">{row.model}</TableCell>
                <TableCell align="center">{row.year}</TableCell>
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
    </Card>
  );
}
