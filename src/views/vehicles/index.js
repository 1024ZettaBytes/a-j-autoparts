import { useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Grid,
} from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import NextBreadcrumbs from "ui-component/reusables/BreadCrums";
import VehiclesTable from "ui-component/vehicles/VehiclesTable";
import AddIcon from "@mui/icons-material/Add";
import { getFetcher, useGetAllVehicles } from "client/api/useRequest";
import { Box } from "@mui/system";
import { enqueueSnackbar } from "notistack";
import AddVehicleModal from "ui-component/reusables/AddVehicleModal";

function AllVehicles() {
  const paths = [
    { path: "", text: "Inicio" },
    { path: "vehicles", text: "Vehículos" },
  ];
  const [searchTerm, setSearchTerm] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { vehiclesList, vehiclesError, isLoadingVehicles } = useGetAllVehicles(
    getFetcher,
    searchTerm
  );
  const handleCloseVehicle = (addedVehicle, successMessage = null) => {
    setModalIsOpen(false);
    if (addedVehicle && successMessage) {
      enqueueSnackbar(successMessage, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 1500,
      });
    }
  };
  return (
    <>
      <NextBreadcrumbs sx={{ margin: 1 }} paths={paths} lastLoaded={true} />
      <MainCard title="Vehículos" titleSx={{ textAlign: "center" }}>
        <Container>
          {vehiclesError && (
            <Grid item>
              <br />
              <Alert severity="error">{vehiclesError.message}</Alert>
            </Grid>
          )}
          {isLoadingVehicles && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {!vehiclesError && vehiclesList && (
            <VehiclesTable
              showSearch
              withDetail
              rows={vehiclesList}
              searchTerm={searchTerm}
              onSearchTerm={setSearchTerm}
            />
          )}
          <Grid container marginTop={3}>
            <Grid item textAlign="end" lg={12}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                color="secondary"
                onClick={()=>setModalIsOpen(true)}
              >
                Agregar
              </Button>
            </Grid>
          </Grid>
        </Container>
      </MainCard>
      {modalIsOpen ? (
        <AddVehicleModal
          open={modalIsOpen}
          handleOnClose={handleCloseVehicle}
        />
      ) : null}
    </>
  );
}
export default AllVehicles;
