import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MainCard from "ui-component/cards/MainCard";
import NextBreadcrumbs from "ui-component/reusables/BreadCrums";
import ServicesTable, {
  getStatusLabel,
} from "ui-component/services/ServicesTable";
import SnacksTable from "ui-component/snacks/SnacksTable";
import VehiclesTable from "ui-component/vehicles/VehiclesTable";
import WorksTable from "ui-component/works/WorksTable";
import { useState } from "react";
const getSubHeader = (text, fullWidth = false, marginTop = 2) => {
  return (
    <Grid marginTop={marginTop} item lg={fullWidth ? 12 : 2}>
      <Typography variant="h4">{text}</Typography>
    </Grid>
  );
};
export default function BySupplierId() {
  const paths = [
    { path: "", text: "Inicio" },
    { path: "suppliers", text: "Proveedores" },
  ];
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const data = {
    name: "AutoZone 1",
    contactName: "Raul Pérez",
    phone: "6876497851",
    email: "contacto@autozone.com",
    address: "Blvd. Millan, #1034, Guasave, Sinaloa",
    comments: "",   
  };

  paths.push({ path: id, text: data.name });
  return (
    <>
      {" "}
      <NextBreadcrumbs sx={{ margin: 1 }} paths={paths} lastLoaded={true} />
      <MainCard
        title={`Proveedor: ${data.name}`}
        titleSx={{ textAlign: "center" }}
      >
        <Box padding={2} sx={{ border: "3px solid grey" }}>
          <Grid
            container
            direction="row"
            justifyContent="left"
            alignItems="left"
            spacing={1}
          >
            <Grid item textAlign="end" lg={12}>
              <Button
                sx={isEditing ? { visibility: "hidden" } : {}}
                variant="contained"
                startIcon={<EditOutlinedIcon />}
                color="warning"
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                Modificar
              </Button>
            </Grid>
            {getSubHeader("Nombre", true)}
            <Grid item>
              <TextField
                disabled={!isEditing}
                id="filled-basic"
                variant="outlined"
                value={data.name}
              />
            </Grid>

            {getSubHeader("Nombre de contacto", true)}
            <Grid item>
              <TextField
                disabled={!isEditing}
                id="filled-basic"
                variant="outlined"
                value={data.contactName}
              />
            </Grid>
            {getSubHeader("Teléfono", true)}
            <Grid item>
              <TextField
                disabled={!isEditing}
                id="filled-basic"
                variant="outlined"
                value={data.phone}
              />
            </Grid>
            {getSubHeader("Correo", true)}
            <Grid item>
              <TextField
                disabled={!isEditing}
                id="filled-basic"
                variant="outlined"
                value={data.email}
              />
            </Grid>
            {getSubHeader("Dirección", true)}
            <Grid item lg={6}>
              <TextField
                fullWidth
                disabled={!isEditing}
                id="filled-basic"
                variant="outlined"
                value={data.address}
              />
            </Grid>
            {getSubHeader("Notas", true)}
            <Grid item lg={6}>
              <TextField
                fullWidth
                multiline
                rows={5}
                maxRows={5}
                disabled={!isEditing}
                id="filled-basic"
                variant="outlined"
                value={data.comments}
              />
            </Grid>
            {isEditing && (
              <>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  textAlign={"center"}
                  marginTop={10}
                >
                  <Button
                    variant="outlined"
                    size="medium"
                    color="error"
                    onClick={() => {
                      setIsEditing(false);
                    }}
                  >
                    Cancelar
                  </Button>

                  <LoadingButton
                    sx={{ marginLeft: 1 }}
                    type="submit"
                    size="medium"
                    loading={false}
                    variant="contained"
                    color="success"
                    onClick={() => {
                      setIsEditing(false);
                    }}
                  >
                    Guardar
                  </LoadingButton>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </MainCard>
    </>
  );
}
