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
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import NotificationImportantOutlinedIcon from "@mui/icons-material/NotificationImportantOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

export const getStockLabel = (stock, min) => {
  if (stock <= min)
    return (
      <Chip
        icon={<NotificationImportantOutlinedIcon fontSize="small" />}
        label={stock}
        color="error"
        size="small"
      ></Chip>
    );
  if (stock <= min + 3)
    return (
      <Chip
        icon={<WarningAmberIcon fontSize="small" />}
        label={stock}
        color="warning"
        size="small"
      ></Chip>
    );
  return <Chip label={stock} color="success" size="small"></Chip>;
};
export default function InventoryTable({ rows, showSearch }) {
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
              <TableCell>Código</TableCell>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Stock</TableCell>
              <TableCell align="center">Mínimo</TableCell>
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
                  {row.code}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">
                  {getStockLabel(row.stock, row.min)}
                </TableCell>
                <TableCell align="center">{row.min}</TableCell>

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
