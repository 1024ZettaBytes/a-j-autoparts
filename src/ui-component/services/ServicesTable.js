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
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

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
export default function ServicesTable({ rows, showSearch }) {
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
                <TableCell align="center">{row.customer}</TableCell>
                <TableCell align="center">{row.vehicle}</TableCell>
                <TableCell align="center">{row.billed}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
