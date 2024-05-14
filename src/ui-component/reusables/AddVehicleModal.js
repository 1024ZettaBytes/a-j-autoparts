import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  InputLabel,
  TextField,
  Typography,
  Select,
  FormControl,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { LoadingButton } from "@mui/lab";
import AddCustomerModal from "./AddCustomerModal";
function AddVehicleModal(props) {
  const { handleOnClose, open, citiesList, customerList } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState({ error: false, msg: "" });
  const [selectedCity, setSelectedCity] = useState();
  const [selectedSector, setSelectedSector] = useState();
  const [citySectors, setCitySectors] = useState([]);
  const [wasReferred, setWasReferred] = useState(false);
  const [selectedHowFound, setSelectedHowFound] = useState();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [referredBy, setReferredBy] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleCitySelection(city) {
    setSelectedCity(city);
    setSelectedSector(undefined);
    const filteredCity = citiesList.filter((c) => c._id === city);
    setCitySectors(filteredCity[0].sectors);
  }
  function handleSectorSelection(sector) {
    setSelectedSector(sector);
  }
  function handleHowFoundSelection(howFound) {
    setSelectedHowFound(howFound);
    setWasReferred(howFound === "referred");
  }
  function handleReferredBySelection(referredBy) {
    setReferredBy(referredBy);
  }
  async function submitHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    setHasError({ error: false, msg: "" });
    const result = {};
    /*const result = await saveCustomer({
      name: event.target.name.value,
      cell: event.target.cell.value,
      email: event.target.email.value,
      howFound: event.target.howFound.value,
      referredBy: referredBy,
      street: event.target.street.value,
      suburb: event.target.suburb.value,
      city: selectedCity,
      sector: selectedSector,
      residenceRef: event.target.residenceRef.value,
      nameRef: event.target.nameRef.value,
      telRef: event.target.telRef.value,
      maps: event.target.maps.value,
    });*/
    setIsLoading(false);
    if (!result.error) {
      handleSavedCustomer(result.msg);
    } else {
      handleErrorOnSave(result.msg);
    }
  }
  const handleCloseCustomer = () => {
    setModalIsOpen(false);
  };
  const handleClose = () => {
    setHasError({ error: false, msg: "" });
    setIsLoading(false);
    handleOnClose(false);
  };
  const handleSavedCustomer = (successMessage) => {
    handleOnClose(true, successMessage);
  };
  const handleCustomerSelect = (selected) => {
    const found = customerList.filter(
      (c) => c._id.toString() === selected?.id
    )[0];
    setSelectedCustomer(found);
  };

  const handleErrorOnSave = (msg) => {
    setHasError({ error: true, msg });
  };

  return (
    <>
      <Dialog open={open} fullWidth={true} scroll={"body"}>
        <Card>
          <CardHeader title="Agregar Vehículo" sx={{ textAlign: "center" }} />
          <Divider />
          <CardContent>
            <Box component="form" onSubmit={submitHandler}>
              <Grid container direction="column" spacing={2} maxWidth="lg">
                <Grid item container lg={12}>
                  <Grid item lg={6} md={6}>
                    <Autocomplete
                      fullwidth={true}
                      disablePortal
                      id="combo-box-demo"
                      options={[{ name: "Eduardo", cell: "12345" }].map(
                        (customer) => {
                          return {
                            label: `${customer.name} (${customer.cell})`,
                            id: customer._id,
                          };
                        }
                      )}
                      onChange={(event, newValue) => {
                        handleCustomerSelect(newValue);
                      }}
                      value={
                        selectedCustomer
                          ? {
                              label: `${selectedCustomer.name} (${selectedCustomer.cell})`,
                              id: selectedCustomer._id,
                            }
                          : null
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      renderInput={(params) => (
                        <TextField
                          fullWidth={true}
                          required
                          {...params}
                          label="Cliente"
                        />
                      )}
                    />
                  </Grid>

                  <Grid item lg={2} marginLeft={1}>
                    <Button
                      startIcon={<AddIcon />}
                      size="medium"
                      variant="contained"
                      sx={{ marginTop: 1 }}
                      onClick={() => {
                        setModalIsOpen(true);
                      }}
                    >
                      Nuevo
                    </Button>
                  </Grid>
                </Grid>
                <Grid item lg={12}>
                  <Typography
                    variant="h5"
                    component="h5"
                    color="secondary"
                    textAlign="left"
                    fontWeight="bold"
                  >
                    Datos del vehículo
                  </Typography>
                </Grid>
                <Grid item>
                  <FormControl
                    sx={{
                      width: "20%",
                      textAlign: "center",
                    }}
                  >
                    <InputLabel id="machine-id">Año*</InputLabel>
                    <Select
                      labelId="machine-id"
                      label="Año*"
                      id="newMachine"
                      name="newMachine"
                      required
                      defaultValue=""
                      size="medium"
                    >
                      {
                        //machinesData
                        true
                          ? [{ _id: "xd", machineNum: "2024" }].map(
                              (machine) => (
                                <MenuItem key={machine._id} value={machine._id}>
                                  {machine.machineNum}
                                </MenuItem>
                              )
                            )
                          : null
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl
                    sx={{
                      width: "40%",
                      textAlign: "center",
                    }}
                  >
                    <InputLabel id="machine-id">Marca*</InputLabel>
                    <Select
                      labelId="machine-id"
                      label="Marca*"
                      id="newMachine"
                      name="newMachine"
                      required
                      defaultValue=""
                      size="medium"
                    >
                      {
                        //machinesData
                        true
                          ? [{ _id: "xd", machineNum: "Nissan" }].map(
                              (machine) => (
                                <MenuItem key={machine._id} value={machine._id}>
                                  {machine.machineNum}
                                </MenuItem>
                              )
                            )
                          : null
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl
                    sx={{
                      width: "40%",
                      textAlign: "center",
                    }}
                  >
                    <InputLabel id="machine-id">Modelo*</InputLabel>
                    <Select
                      labelId="machine-id"
                      label="Modelo*"
                      id="newMachine"
                      name="newMachine"
                      required
                      defaultValue=""
                      size="medium"
                    >
                      {
                        //machinesData
                        true
                          ? [{ _id: "xd", machineNum: "Sentra" }].map(
                              (machine) => (
                                <MenuItem key={machine._id} value={machine._id}>
                                  {machine.machineNum}
                                </MenuItem>
                              )
                            )
                          : null
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <TextField
                    sx={{ width: "50%" }}
                    autoComplete="off"
                    required
                    id="email"
                    name="email"
                    label="Cilindraje"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    sx={{ width: "50%" }}
                    autoComplete="off"
                    required
                    id="email"
                    name="email"
                    label="Motor"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    sx={{ width: "50%" }}
                    autoComplete="off"
                    required
                    id="email"
                    name="email"
                    label="VIN"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    sx={{ width: "50%" }}
                    autoComplete="off"
                    required
                    id="email"
                    name="email"
                    label="Placas"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    sx={{ width: "50%" }}
                    autoComplete="off"
                    required
                    id="email"
                    name="email"
                    label="Color"
                  />
                </Grid>

                <Grid item lg={12}>
                  <Grid
                    container
                    alignItems={"right"}
                    direction="row"
                    justifyContent="right"
                    spacing={2}
                  >
                    <Grid item>
                      <Button
                        size="large"
                        variant="outlined"
                        onClick={() => handleClose()}
                      >
                        Cancelar
                      </Button>
                    </Grid>
                    <Grid item>
                      <LoadingButton
                        type="submit"
                        loading={isLoading}
                        size="large"
                        variant="contained"
                      >
                        Guardar
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Dialog>
      {modalIsOpen && (
        <AddCustomerModal
          open={modalIsOpen}
          handleOnClose={handleCloseCustomer}
        />
      )}
    </>
  );
}

export default AddVehicleModal;
