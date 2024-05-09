import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";

// project imports
import SubCard from "ui-component/cards/SubCard";
import MainCard from "ui-component/cards/MainCard";
import SecondaryAction from "ui-component/cards/CardSecondaryAction";
import { LoadingButton } from "@mui/lab";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import AddIcon from "@mui/icons-material/Add";
import VehiclesTable from "ui-component/vehicles/VehiclesTable";
import { useState } from "react";
import AddVehicleModal from "ui-component/reusables/AddVehicleModal";
import { textAlign } from "@mui/system";

// ==============================|| TYPOGRAPHY ||============================== //

function New() {
  const defaultData = () => {
    return {
      rentPeriod: {
        selectedWeeks: 1,
        useFreeWeeks: true,
        usePromo: true,
      },

      selectedCustomer: null,
    };
  };
  const [activeStep, setActiveStep] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(
    defaultData().selectedCustomer
  );
  const { customerList, customerError } = {
    customerList: [],
    customerError: false,
  };

  const steps = [
    {
      label: "Seleccione un vehiculo",
    },
    {
      label: "Información de servicio",
    },
  ];
  const handleClickOpen = () => {
    setModalIsOpen(true);
  };
  const handleClose = () => {
    setModalIsOpen(false);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleOnRentSubmit = async () => {};
  const checkEnabledButton = (selectedCustomer) => {
    return true;
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
      "2001",
      true
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
  const nextButtonEnabled = checkEnabledButton(selectedCustomer);

  return (
    <MainCard
      title="Nuevo Servicio"
      titleSx={{ textAlign: "center" }}
      secondary={
        <SecondaryAction link="https://next.material-ui.com/system/typography/" />
      }
    >
      <Container>
        <Grid
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            sx={{ backgroundColor: "transparent" }}
          >
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  {activeStep === 0 && (
                    <>
                      <Grid container>
                        <Grid item xs={12} md={4} lg={4}></Grid>
                        <Grid item xs={12} md={4} lg={4}>
                          <Box flex={1} p={2}>
                            <Button
                              disabled={!customerList}
                              fullWidth
                              startIcon={<AddIcon />}
                              size="medium"
                              variant="contained"
                              sx={{ marginTop: 1 }}
                              onClick={handleClickOpen}
                              color="secondary"
                            >
                              Nuevo
                            </Button>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}></Grid>
                        <Grid item xs={12} md={12} lg={12}>
                          <VehiclesTable rows={rows} showSearch />
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
                          value={new Date()}
                          onChange={(newValue) => {
                            //onChangeTime("date",newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Grid>
                      <Grid item lg={12} />
                      <Grid item lg={2}>
                        <TextField
                          autoComplete="off"
                          required
                          label={"Kilometraje"}
                          id="problemDesc"
                          name="problemDesc"
                        />{" "}
                      </Grid>
                      <Grid item lg={12} />
                      <Grid item lg={4}>
                        <TextField
                          autoComplete="off"
                          required
                          label={"Quien entrega"}
                          id="problemDesc"
                          name="problemDesc"
                          fullWidth={true}
                        />
                      </Grid>
                      <Grid item lg={12} />
                      <Grid item lg={6}>
                        <TextField
                          autoComplete="off"
                          required
                          label={"Observaciones"}
                          id="problemDesc"
                          name="problemDesc"
                          multiline
                          rows={3}
                          fullWidth={true}
                        />
                      </Grid>{" "}
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
                        disabled={!nextButtonEnabled}
                        variant="contained"
                        onClick={
                          activeStep < steps.length - 1
                            ? handleNext
                            : handleOnRentSubmit
                        }
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? "Guardar" : "Siguiente"}
                      </LoadingButton>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Container>
      {modalIsOpen && customerList ? (
        <AddVehicleModal open={modalIsOpen} handleOnClose={handleClose} />
      ) : null}
    </MainCard>
  );
}

export default New;
