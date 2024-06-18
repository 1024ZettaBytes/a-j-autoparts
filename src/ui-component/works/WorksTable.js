import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Card, CardHeader, Divider, Typography, useTheme } from "@mui/material";

export default function WorksTable({ rows, total }) {
  const theme = useTheme();
  return (
    <Card sx={{ alignItems: "right", textAlign: "right" }}>
      <CardHeader
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
              <TableCell>Trabajo</TableCell>
              <TableCell align="center">Precio</TableCell>
              <TableCell align="center">Descuento</TableCell>
              <TableCell align="center">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow
                key={`${row.id}-${row.service}`}
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
                  {row.description}
                </TableCell>
                <TableCell align="center">{row.basePrice}</TableCell>
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
