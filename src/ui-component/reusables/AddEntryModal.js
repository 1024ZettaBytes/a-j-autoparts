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
  InputAdornment,
} from "@mui/material";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";

import { LoadingButton } from "@mui/lab";
import { DesktopDatePicker } from "@mui/x-date-pickers";
function AddEntryModal(props) {
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
    <Dialog open={open} scroll={"body"}>
      <Card>
        <CardHeader title="Registrar Entrada" sx={{ textAlign: "center" }} />
        <Divider />
        <CardContent>
          <Box component="form" onSubmit={submitHandler}>
            <Grid container direction="column" spacing={2} maxWidth="lg">
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="machine-id">Producto*</InputLabel>
                  <Select
                    fullWidth={true}
                    labelId="machine-id"
                    label="Producto*"
                    id="newMachine"
                    name="newMachine"
                    required
                    defaultValue=""
                  >
                    {
                      //machinesData
                      true
                        ? [
                            { _id: "xd", machineNum: "Balata Duralast 4pz" },
                            { _id: "xd2", machineNum: "Aceite 5w30 1Lt" },
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
              <Grid item>
                <DesktopDatePicker
                  sx={{ width: "70%" }}
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
              <Grid item>
                <TextField
                  sx={{ width: "50%" }}
                  autoComplete="off"
                  required
                  id="email"
                  name="email"
                  type="number"
                  label="Cantidad"
                />
              </Grid>
              <Grid item>
                <TextField
                  sx={{ width: "50%" }}
                  autoComplete="off"
                  required
                  id="email"
                  name="email"
                  type="number"
                  label="Precio de compra"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="machine-id">Proveedor*</InputLabel>
                  <Select
                    fullWidth={true}
                    labelId="machine-id"
                    label="Proveedor*"
                    id="newMachine"
                    name="newMachine"
                    required
                    defaultValue=""
                  >
                    {
                      //machinesData
                      true
                        ? [
                            { _id: "xd", machineNum: "Auto Zone 1" },
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
  );
}

export default AddEntryModal;
