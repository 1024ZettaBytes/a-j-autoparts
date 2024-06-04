import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import VisibilityIcon from "@mui/icons-material/Visibility";
import MainCard from "ui-component/cards/MainCard";
import { LoadingButton } from "@mui/lab";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import AddIcon from "@mui/icons-material/Add";
import VehiclesTable from "ui-component/vehicles/VehiclesTable";
import { useState } from "react";
import AddVehicleModal from "ui-component/reusables/AddVehicleModal";
import { useSnackbar } from "notistack";
import { getFetcher, useGetAllVehicles } from "client/api/useRequest";
import { saveService } from "client/api/services";

function New() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const [searchTerm, setSearchTerm] = useState(null);
  const { vehiclesList, vehiclesError, isLoadingVehicles } = useGetAllVehicles(
    getFetcher,
    searchTerm,
    true,
    false
  );

  const [activeStep, setActiveStep] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState({ error: false, msg: "" });
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [insertedId, setInsertedId] = useState(null);

  const steps = [
    {
      label: "Seleccione un vehiculo",
    },
    {
      label: "Información de servicio",
    },
  ];
  const handleClickOpenVehicle = () => {
    setModalIsOpen(true);
  };
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
  const onChangeDate = (value) => {
    if (value?.toString() === "Invalid Date") {
      value = null;
    }

    setSelectedDate(value);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleNext = () => {
    if (!selectedDate) setSelectedDate(new Date());
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  async function submitHandler(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setHasError({ error: false, msg: "" });
    const result = await saveService({
      vehicle: selectedVehicle.VIN,
      startDate: selectedDate,
      mileage: Number(event?.target?.mileage?.value),
      deliveredBy: event?.target?.deliveredBy?.value,
      comments: event?.target?.comments?.value,
    });
    setIsSubmitting(false);
    if (!result.error) {
      setInsertedId(result?.data?.id);
      handleNext();
    } else {
      setHasError({ error: true, msg: result.msg });
    }
  }
  const checkEnabledButton = (selectedVehicle) => {
    if (activeStep === 0 && selectedVehicle) return true;
    if (activeStep === 1 && selectedDate) return true;
    return false;
  };
  const nextButtonEnabled = checkEnabledButton(selectedVehicle);

  return (
    <MainCard title="Nuevo Servicio" titleSx={{ textAlign: "center" }}>
      <Container>
        <Grid justifyContent="center" alignItems="stretch">
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            sx={{ backgroundColor: "transparent" }}
          >
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  <Box
                    component="form"
                    onSubmit={(event) => submitHandler(event)}
                  >
                    {activeStep === 0 && (
                      <>
                        <Grid container>
                          <Grid item xs={12} md={4} lg={4}></Grid>
                          <Grid item xs={12} md={4} lg={4}>
                            <Box flex={1} p={2}>
                              <Button
                                fullWidth
                                startIcon={<AddIcon />}
                                size="medium"
                                variant="contained"
                                sx={{ marginTop: 1 }}
                                onClick={handleClickOpenVehicle}
                                color="secondary"
                              >
                                Nuevo
                              </Button>
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={4} lg={4}></Grid>
                          <Grid item xs={12} md={12} lg={12}>
                            {vehiclesError && (
                              <Grid item>
                                <br />
                                <Alert severity="error">
                                  {vehiclesError.message}
                                </Alert>
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
                                rows={vehiclesList}
                                showSearch
                                onSelectRow={setSelectedVehicle}
                                selectedRow={selectedVehicle}
                                searchTerm={searchTerm}
                                onSearchTerm={setSearchTerm}
                              />
                            )}
                          </Grid>
                        </Grid>
                      </>
                    )}
                    {activeStep === 1 && (
                      <Grid container spacing={1} marginTop={1}>
                        <Grid item>
                          <DesktopDatePicker
                            label="Fecha"
                            inputFormat="dd/MM/yyyy"
                            maxDate={new Date()}
                            value={selectedDate}
                            onChange={(newValue) => {
                              onChangeDate(newValue);
                            }}
                            hel
                            slotProps={{ textField: { variant: "outlined" } }}
                          />
                        </Grid>
                        <Grid item lg={12} />
                        <Grid item lg={2}>
                          <TextField
                            autoComplete="off"
                            required
                            type="number"
                            inputProps={{ min: selectedVehicle?.mileage }}
                            defaultValue={selectedVehicle?.mileage}
                            label={"Kilometraje"}
                            id="mileage"
                            name="mileage"
                          />{" "}
                        </Grid>
                        <Grid item lg={12} />
                        <Grid item lg={4}>
                          <TextField
                            autoComplete="off"
                            required
                            label={"Quien entrega"}
                            id="deliveredBy"
                            name="deliveredBy"
                            fullWidth={true}
                          />
                        </Grid>
                        <Grid item lg={12} />
                        <Grid item lg={6}>
                          <TextField
                            autoComplete="off"
                            label={"Observaciones"}
                            id="comments"
                            name="comments"
                            multiline
                            rows={3}
                            fullWidth={true}
                          />
                        </Grid>{" "}
                        {hasError.error && (
                          <Grid item>
                            <br />
                            <Alert severity="error">{hasError.msg}</Alert>
                          </Grid>
                        )}
                      </Grid>
                    )}

                    <Box sx={{ mb: 2 }}>
                      <div>
                        {index > 0 && (
                          <Button
                            disabled={isSubmitting}
                            onClick={handleBack}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            Atrás
                          </Button>
                        )}
                        <LoadingButton
                          loading={isSubmitting}
                          type="submit"
                          disabled={!nextButtonEnabled}
                          variant="contained"
                          onClick={
                            activeStep < steps.length - 1
                              ? handleNext
                              : () => {}
                          }
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === steps.length - 1 ? "Guardar" : "Siguiente"}
                        </LoadingButton>
                      </div>
                    </Box>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Alert severity="success">
                Se creó el servicio para el vehículo{" "}
                {`${selectedVehicle?.vehicles_db?.make}-${selectedVehicle?.vehicles_db?.model} ${selectedVehicle?.vehicles_db?.year} (${selectedVehicle?.VIN})`}
              </Alert>
              <Button
                endIcon={<VisibilityIcon />}
                variant="outlined"
                sx={{ mt: 1, mr: 1 }}
                onClick={() => {
                  navigate(`/services/${insertedId}`); // Target path
                }}
              >
                Ver servicio
              </Button>
            </Paper>
          )}
        </Grid>
      </Container>
      {modalIsOpen ? (
        <AddVehicleModal
          open={modalIsOpen}
          handleOnClose={handleCloseVehicle}
        />
      ) : null}
    </MainCard>
  );
}

export default New;
