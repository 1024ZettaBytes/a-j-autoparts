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
  TextField,
  Tooltip,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BoyOutlinedIcon from '@mui/icons-material/BoyOutlined';
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import VisibilityIcon from "@mui/icons-material/Visibility";

import { Link } from "react-router-dom";
function createData(name, type, phone, email) {
  return { name, type, phone, email };
}

const rows = [
  createData(
    "Eduardo Ramírez",
    "REGULAR",
    "6442571555",
    "ramirezcota.eduardo@gmail.com"
  ),
  createData("Rochin", "ENTERPRISE", "6871234567", "contacto@rochin.com"),
  createData("Juan Lopéz", "REGULAR", "6872347951", "juan.lopez@gmail.com"),
];
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
    case "ENTERPRISE":
      return (
        <Chip
          icon={<CorporateFareOutlinedIcon fontSize="small" />}
          label="Privado"
          color="info"
          size="small"
        ></Chip>
      );
  }
};
export default function CustomersTable() {
  const theme = useTheme();
  return (
    <Card>
      <CardHeader
        action={
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
              <TableCell>Nombre</TableCell>
              <TableCell align="center">Tipo</TableCell>
              <TableCell align="center">Teléfono</TableCell>
              <TableCell align="center">Correo</TableCell>
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
                  {row.name}
                </TableCell>

                <TableCell align="center">
                  {getTypesLabel(row.type)}
                </TableCell>

                <TableCell align="center">{row.phone}</TableCell>
                 <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Detalle" arrow>
                    <Link to={"01"}>
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
    </Card>
  );
}
