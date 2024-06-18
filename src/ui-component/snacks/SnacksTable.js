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
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SnacksTable({ showSearch, rows, total }) {
  const theme = useTheme();
  return (
    <Card sx={{ alignItems: "right", textAlign: "right" }}>
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
      <TableContainer component={Paper} sx={{ marginBottom: "10px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Unidades</TableCell>
              <TableCell align="center">Precio Unit.</TableCell>
              <TableCell align="center">Descuento</TableCell>
              <TableCell align="center">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((row) => (
                <TableRow
                  key={`${row.id}-${row.product}`}
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
                    {row.product}
                  </TableCell>
                  <TableCell align="center">{row.products?.name}</TableCell>
                  <TableCell align="center">{row.qty}</TableCell>
                  <TableCell align="center">{row.unitPrice}</TableCell>
                  <TableCell align="center">{row.discountPercentage}</TableCell>
                  <TableCell align="center">{row.total}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography fontWeight="bold" display="inline">
        {"TOTAL:"}
      </Typography>
      <Typography
        display="inline"
        marginLeft={4}
        marginRight={4}
        fontWeight="bold"
      >
        {total}
      </Typography>
    </Card>
  );
}
