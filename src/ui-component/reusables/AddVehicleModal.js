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
  Skeleton,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSnackbar } from "notistack";

import { LoadingButton } from "@mui/lab";
import AddCustomerModal from "./AddCustomerModal";
import {
  getFetcher,
  useGetAllCustomersNonDetail,
  useGetVehiclesCatalog,
} from "client/api/useRequest";
import { saveVehicle } from "client/api/vehicles";
function AddVehicleModal(props) {
  const { enqueueSnackbar } = useSnackbar();

  const { handleOnClose, open } = props;
  const { customersList, customersError, isLoadingCustomers } =
    useGetAllCustomersNonDetail(getFetcher);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState({ error: false, msg: "" });
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { yearList } = useGetVehiclesCatalog(
    true,
    getFetcher,
    null,
    null,
    true
  );
  const { makeList } = useGetVehiclesCatalog(
    selectedYear,
    getFetcher,
    selectedYear,
    null,
    true
  );
  const { modelList } = useGetVehiclesCatalog(
    selectedYear && selectedMake,
    getFetcher,
    selectedYear,
    selectedMake,
    true
  );

  const makeEnabled = selectedYear && makeList;

  const modelEnabled = makeEnabled && selectedMake;

  async function submitHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    setHasError({ error: false, msg: "" });
    const result = await saveVehicle({
      VIN: event?.target?.vin?.value,
      customer: selectedCustomer?.id,
      cilinders: Number(event?.target?.cilinders?.value),
      engine: event?.target?.engine?.value,
      plates: event?.target?.plates?.value,
      color: event?.target?.color?.value,
      details: selectedModel,
    });
    setIsLoading(false);
    if (!result.error) {
      handleSavedVehicle(result.msg);
    } else {
      handleErrorOnSave(result.msg);
    }
  }
  const handleCloseCustomer = (addedCustomer, successMessage = null) => {
    setModalIsOpen(false);
    if (addedCustomer && successMessage) {
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

  const handleClose = () => {
    setHasError({ error: false, msg: "" });
    setIsLoading(false);
    handleOnClose(false);
  };
  const handleSavedVehicle = (successMessage) => {
    handleOnClose(true, successMessage);
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
                {customersError ? (
                  <Grid item>
                    <br />
                    <Alert severity="error">{customersError.message}</Alert>
                  </Grid>
                ) : (
                  <Grid item container lg={12}>
                    <Grid item lg={6} md={6}>
                      {isLoadingCustomers ? (
                        <Skeleton
                          variant="rectangular"
                          width={210}
                          height={60}
                        />
                      ) : customersList?.length === 0 ? (
                        <Typography color="darkorange" marginTop={2} fontStyle="italic">
                          Aun no hay clientes registrados
                        </Typography>
                      ) : (
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={customersList.map((customer) => {
                            return {
                              label: `${customer.name} (${customer?.customer_type?.description})`,
                              id: customer.id,
                            };
                          })}
                          onChange={(event, newValue) => {
                            setSelectedCustomer(newValue);
                          }}
                          value={selectedCustomer ? selectedCustomer : null}
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
                      )}
                    </Grid>

                    <Grid item lg={4} marginLeft={1}>
                      <Button
                        startIcon={<AddIcon />}
                        size="medium"
                        variant="contained"
                        sx={{ marginTop: 1 }}
                        onClick={() => {
                          setModalIsOpen(true);
                        }}
                      >
                        Nuevo Cliente
                      </Button>
                    </Grid>
                  </Grid>
                )}
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
                    <InputLabel id="year-id">Año*</InputLabel>
                    <Select
                      labelId="year-id"
                      label="Año*"
                      id="year"
                      name="year"
                      required
                      size="medium"
                      value={selectedYear || ""}
                      onChange={(event) => {
                        setSelectedYear(event.target.value);
                        setSelectedMake(null);
                        setSelectedModel(null);
                      }}
                    >
                      <MenuItem disabled value="">
                        <em>Seleccione</em>
                      </MenuItem>
                      {yearList
                        ? yearList.map((year) => (
                            <MenuItem key={year} value={year}>
                              {year}
                            </MenuItem>
                          ))
                        : null}
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
                    <InputLabel id="make-id">Marca*</InputLabel>
                    <Select
                      labelId="make-id"
                      label="Marca*"
                      id="make"
                      name="make"
                      required
                      size="medium"
                      disabled={!makeEnabled}
                      value={selectedMake || ""}
                      onChange={(event) => {
                        setSelectedMake(event.target.value);
                        setSelectedModel(null);
                      }}
                    >
                      <MenuItem disabled value="">
                        <em>Seleccione</em>
                      </MenuItem>
                      {makeList
                        ? makeList.map((make) => (
                            <MenuItem key={make} value={make}>
                              {make}
                            </MenuItem>
                          ))
                        : null}
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
                      disabled={!modelEnabled}
                      labelId="model-id"
                      label="Modelo*"
                      id="model"
                      name="model"
                      required
                      value={selectedModel || ""}
                      size="medium"
                      onChange={(event) => {
                        setSelectedModel(event.target.value);
                      }}
                    >
                      <MenuItem disabled value="">
                        <em>Seleccione</em>
                      </MenuItem>
                      {modelList
                        ? modelList.map((model) => (
                            <MenuItem
                              key={model.id + model.year}
                              value={model.id}
                            >
                              {model.model}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <TextField
                    sx={{ width: "50%" }}
                    autoComplete="off"
                    required
                    type="number"
                    inputProps={{ min: 2, max: 12, step: 1 }}
                    id="cilinders"
                    name="cilinders"
                    label="Cilindraje"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    sx={{ width: "50%" }}
                    autoComplete="off"
                    required
                    id="engine"
                    name="engine"
                    label="Motor"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    sx={{ width: "50%" }}
                    autoComplete="off"
                    required
                    id="vin"
                    name="vin"
                    label="VIN"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    sx={{ width: "50%" }}
                    autoComplete="off"
                    required
                    id="plates"
                    name="plates"
                    label="Placas"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    sx={{ width: "50%" }}
                    autoComplete="off"
                    required
                    id="color"
                    name="color"
                    label="Color"
                  />
                </Grid>
                {hasError.error ? (
                  <Grid item>
                    <br />
                    <Alert severity="error">{hasError?.msg}</Alert>
                  </Grid>
                ) : null}
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
                        disabled={!selectedCustomer}
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
