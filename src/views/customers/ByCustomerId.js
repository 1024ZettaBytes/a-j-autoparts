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
export default function ByCustomerId() {
  const paths = [
    { path: "", text: "Inicio" },
    { path: "customers", text: "Clientes" },
  ];
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const data = {
    name: "Eduardo Ramírez",
    type: "REGULAR",
    phone: "6442571555",
    email: "ramirezcota.eduardo@gmail.com",
  };
  function createData(
    serie,
    plate,
    customer,
    brand,
    model,
    year,
    isSelected = false
  ) {
    return { serie, plate, customer, brand, model, year, isSelected };
  }
  const servicesRows = [
    {
      status: "IN_PROGRESS",
      customer: "Eduardo Ramirez",
      vehicle: "Sentra-2023",
      billed: "$1,500.00",
      date: "02/05/2024",
    },
  ];
  const vehiclesRows = [
    createData(
      "20K873JMF4444F",
      "VNC-YELS",
      "Eduardo Ramirez",
      "Nissan",
      "Sentra",
      "2023"
    ),
  ];
  paths.push({ path: id, text: data.name });
  return (
    <>
      {" "}
      <NextBreadcrumbs sx={{ margin: 1 }} paths={paths} lastLoaded={true} />
      <MainCard
        title={`Cliente: ${data.name}`}
        titleSx={{ textAlign: "center" }}
      >
        <Box padding={2} sx={{border: '3px solid grey' }}>
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
          {getSubHeader("Tipo", true)}

          <Grid item lg={2}>
            <FormControl fullWidth={true}>
              <Select
                disabled={!isEditing}
                fullWidth={true}
                labelId="machine-id"
                id="newMachine"
                name="newMachine"
                required
                defaultValue="xd"
              >
                {
                  //machinesData
                  true
                    ? [
                        { _id: "xd", machineNum: "Individual" },
                        { _id: "xd2", machineNum: "Empresarial" },
                      ].map((machine) => (
                        <MenuItem key={machine._id} value={machine._id}>
                          {machine.machineNum}
                        </MenuItem>
                      ))
                    : null
                }
              </Select>
            </FormControl>
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
        <Grid
          container
          direction="row"
          justifyContent="left"
          alignItems="left"
          spacing={1}
        >
          {getSubHeader("Vehículos", true, 6)}
          <Grid item container lg={9}>
            <Grid item>
              <VehiclesTable rows={vehiclesRows} whitDetail />
            </Grid>
          </Grid>
          <Grid item textAlign="end" lg={9}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              color="secondary"
            >
              Agregar
            </Button>
          </Grid>
          {getSubHeader("Servicios", true, 4)}
          <Grid item container lg={10}>
            <Grid item lg={12}>
              <ServicesTable rows={servicesRows} />
            </Grid>
          </Grid>
 
        </Grid>
      </MainCard>
    </>
  );
}
