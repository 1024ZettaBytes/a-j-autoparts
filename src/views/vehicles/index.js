import { Button, Container, Grid } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import ServicesTable from "ui-component/services/ServicesTable";
import SecondaryAction from "ui-component/cards/CardSecondaryAction";
import NextBreadcrumbs from "ui-component/reusables/BreadCrums";
import VehiclesTable from "ui-component/vehicles/VehiclesTable";
import AddIcon from "@mui/icons-material/Add";

function AllVehicles() {
  const paths = [
    { path: "", text: "Inicio" },
    { path: "vehicles", text: "Vehículos" },
  ];
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

  const rows = [
    createData(
      "20K873JMF4444F",
      "VNC-YELS",
      "Eduardo Ramirez",
      "Nissan",
      "Sentra",
      "2023"
    ),
    createData(
      "5GSF5TGRRTY6YR",
      "LDI-30EK",
      "Juan Peréz",
      "Ford",
      "Ranger",
      "2001"
    ),
    createData(
      "V6RY6W44RFFASD",
      "D93-92IU",
      "Pedro López",
      "Honda",
      "Civic",
      "2015"
    ),
  ];
  return (
    <>
      <NextBreadcrumbs sx={{ margin: 1 }} paths={paths} lastLoaded={true} />
      <MainCard title="Vehículos" titleSx={{ textAlign: "center" }}>
        <Container>
          <VehiclesTable rows={rows} showSearch whitDetail />
          <Grid container marginTop={3}>
            <Grid item textAlign="end" lg={12}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                color="secondary"
              >
                Agregar
              </Button>
            </Grid>
          </Grid>
        </Container>
      </MainCard>
    </>
  );
}
export default AllVehicles;
