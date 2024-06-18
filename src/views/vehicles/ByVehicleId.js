import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MainCard from "ui-component/cards/MainCard";
import NextBreadcrumbs from "ui-component/reusables/BreadCrums";
import EventRepeatOutlinedIcon from "@mui/icons-material/EventRepeatOutlined";
import ServicesTable from "ui-component/services/ServicesTable";
import { useState } from "react";
import AddReminderModal from "ui-component/reusables/AddReminderModal";
import {
  getFetcher,
  refreshData,
  useGetVehicleById,
  useGetVehiclesCatalog,
} from "client/api/useRequest";
import { API_ROUTES } from "client/api/constants";
import { enqueueSnackbar } from "notistack";
import { updateVehicle } from "client/api/vehicles";
import ServiceReminders from "ui-component/services/ServiceReminders";
const getFieldValues = (value, isEditing) => {
  if (isEditing)
    return {
      defaultValue: value || "",
    };
  return { value: value || "" };
};
const getSubHeader = (text, fullWidth = false, marginTop = 2) => {
  return (
    <Grid marginTop={marginTop} item lg={fullWidth ? 12 : 2}>
      <Typography variant="h4">{text}</Typography>
    </Grid>
  );
};
export default function ByVehicleId() {
  const paths = [
    { path: "", text: "Inicio" },
    { path: "vehicles", text: "Vehículos" },
  ];
  const { id } = useParams();
  const { vehicleData, vehicleError, isLoadingVehicle } = useGetVehicleById(
    getFetcher,
    id,
    true
  );
  const [isSaving, setIsSaving] = useState(false);
  const [hasError, setHasError] = useState({ error: false, msg: null });
  const [dataStored, setDataStored] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [remainderModalOpen, setRemainderModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const { yearList, isLoadingYears } = useGetVehiclesCatalog(
    true,
    getFetcher,
    null,
    null,
    true
  );
  const { makeList, isLoadingMakes } = useGetVehiclesCatalog(
    selectedYear,
    getFetcher,
    selectedYear,
    null,
    true
  );
  const { modelList, isLoadingModels } = useGetVehiclesCatalog(
    selectedYear && selectedMake,
    getFetcher,
    selectedYear,
    selectedMake,
    true
  );

  const makeEnabled = isEditing && selectedYear && makeList;

  const modelEnabled = isEditing && makeEnabled && selectedMake;

  paths.push({ path: id, text: vehicleData?.plates });
  if (vehicleData && !dataStored) {
    setDataStored(true);
    setSelectedYear(vehicleData?.vehicles_db?.year);
    setSelectedMake(vehicleData?.vehicles_db?.make);
    setSelectedModel(vehicleData?.vehicles_db?.id);
  }

  async function submitHandler(event) {
    event.preventDefault();
    setIsSaving(true);
    setHasError({ error: false, msg: "" });

    const result = await updateVehicle({
      VIN: id,
      cilinders: Number(event?.target?.cilinders?.value),
      engine: event?.target?.engine?.value,
      plates: event?.target?.plates?.value,
      color: event?.target?.color?.value,
      details: parseInt(event?.target?.model?.value),
    });
    setIsSaving(false);
    if (!result.error) {
      setIsEditing(false);
      enqueueSnackbar(result.msg, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 1500,
      });
    } else {
      setHasError({ error: true, msg: result.msg });
    }
  }
  const servicesRows = vehicleData?.service_service_vehicleTovehicle || [];
  const remindersList =
    vehicleData?.service_reminder_service_reminder_vehicleTovehicle || [];
  return (
    <>
      {" "}
      <NextBreadcrumbs sx={{ margin: 1 }} paths={paths} lastLoaded={true} />
      <MainCard
        loadingTitle={isLoadingVehicle}
        title={`Vehículo: ${vehicleData?.vehicles_db?.model} - ${vehicleData?.vehicles_db?.year} - (${vehicleData?.plates})`}
        titleSx={{ textAlign: "center" }}
      >
        {vehicleError ? (
          <Grid item>
            <br />
            <Alert severity="error">{vehicleError.message}</Alert>
          </Grid>
        ) : (
          <>
            <Box padding={2} sx={{ border: "3px solid grey" }}>
              <Box
                width={"100%"}
                component="form"
                onSubmit={submitHandler}
                sx={{ border: "3px solid grey" }}
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="left"
                  alignItems="left"
                  spacing={1}
                  margin={2}
                >
                  <Grid item textAlign="center">
                    {vehicleData && (
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
                    )}
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    justifyContent="left"
                    alignItems="left"
                    spacing={1}
                    margin={2}
                    item
                    lg={12}
                  >
                    {getSubHeader("Cliente", true)}
                    {isLoadingVehicle ? (
                      <Grid item lg={3}>
                        <Skeleton variant="rounded" height={50} />
                      </Grid>
                    ) : (
                      <Grid item lg={4}>
                        <Autocomplete
                          fullWidth
                          disabled
                          id="combo-box-demo"
                          options={[
                            {
                              id: vehicleData
                                .customer_vehicle_customerTocustomer?.id,
                              label:
                                vehicleData.customer_vehicle_customerTocustomer
                                  ?.name,
                            },
                          ]}
                          value={{
                            id: vehicleData.customer_vehicle_customerTocustomer
                              ?.id,
                            label:
                              vehicleData.customer_vehicle_customerTocustomer
                                ?.name,
                          }}
                          isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                          }
                          sx={{ width: 300 }}
                          renderInput={(params) => (
                            <TextField {...params} label="" />
                          )}
                        />
                      </Grid>
                    )}
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justifyContent="left"
                    alignItems="left"
                    spacing={1}
                    marginLeft={2}
                    item
                    lg={3}
                  >
                    <Grid item container direction="column" lg={1}>
                      {getSubHeader("Año")}
                      {isLoadingVehicle || isLoadingYears ? (
                        <Grid item lg={2}>
                          <Skeleton variant="rounded" height={50} />
                        </Grid>
                      ) : (
                        <Grid item lg={2}>
                          <FormControl>
                            <Select
                              disabled={!isEditing}
                              labelId="year-id"
                              id="year"
                              name="year"
                              required
                              size="medium"
                              value={selectedYear}
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
                      )}
                    </Grid>

                    <Grid container direction="column" item lg={2}>
                      {getSubHeader("Marca")}
                      {isLoadingVehicle || isLoadingMakes ? (
                        <Grid item lg={2}>
                          <Skeleton variant="rounded" height={50} />
                        </Grid>
                      ) : (
                        <Grid item lg={2}>
                          <FormControl>
                            <Select
                              labelId="make-id"
                              id="make"
                              name="make"
                              required
                              size="medium"
                              disabled={!makeEnabled}
                              value={selectedMake}
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
                      )}
                    </Grid>

                    <Grid container direction="column" item lg={2}>
                      {getSubHeader("Modelo")}
                      {isLoadingVehicle || isLoadingModels ? (
                        <Grid item lg={2}>
                          <Skeleton variant="rounded" height={50} />
                        </Grid>
                      ) : (
                        <Grid item lg={2}>
                          <FormControl fullWidth={true}>
                            <Select
                              disabled={!modelEnabled}
                              fullWidth={true}
                              labelId="model-id"
                              id="model"
                              name="model"
                              required
                              defaultValue={selectedModel || ""}
                            >
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
                      )}
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justifyContent="left"
                    alignItems="left"
                    spacing={1}
                    margin={2}
                    item
                    lg={3}
                  >
                    {getSubHeader("Cilindraje", true)}
                    {isLoadingVehicle && !vehicleData ? (
                      <Grid item lg={2}>
                        <Skeleton variant="rounded" height={50} />
                      </Grid>
                    ) : (
                      <Grid item>
                        <TextField
                          required
                          disabled={!isEditing}
                          variant="outlined"
                          type="number"
                          id="cilinders"
                          name="cilinders"
                          inputProps={{ min: 2, max: 12, step: 1 }}
                          {...getFieldValues(
                            vehicleData.cilinders ?? 2,
                            isEditing
                          )}
                        />
                      </Grid>
                    )}
                    {getSubHeader("Motor", true)}
                    {isLoadingVehicle && !vehicleData ? (
                      <Grid item lg={2}>
                        <Skeleton variant="rounded" height={50} />
                      </Grid>
                    ) : (
                      <Grid item>
                        <TextField
                          required
                          disabled={!isEditing}
                          id="engine"
                          name="engine"
                          variant="outlined"
                          inputProps={{
                            maxLength: 15,
                          }}
                          {...getFieldValues(
                            vehicleData.engine ?? "",
                            isEditing
                          )}
                        />
                      </Grid>
                    )}
                    {getSubHeader("VIN", true)}
                    {isLoadingVehicle && !vehicleData ? (
                      <Grid item lg={2}>
                        <Skeleton variant="rounded" height={50} />
                      </Grid>
                    ) : (
                      <Grid item>
                        <TextField
                          required
                          disabled
                          id="vin"
                          name="vin"
                          variant="outlined"
                          inputProps={{
                            maxLength: 18,
                          }}
                          value={vehicleData.VIN}
                        />
                      </Grid>
                    )}
                    {getSubHeader("Placas", true)}
                    {isLoadingVehicle && !vehicleData ? (
                      <Grid item lg={2}>
                        <Skeleton variant="rounded" height={50} />
                      </Grid>
                    ) : (
                      <Grid item>
                        <TextField
                          required
                          disabled={!isEditing}
                          id="plates"
                          name="plates"
                          inputProps={{
                            maxLength: 15,
                          }}
                          variant="outlined"
                          {...getFieldValues(
                            vehicleData.plates ?? "",
                            isEditing
                          )}
                        />
                      </Grid>
                    )}
                    {getSubHeader("Color", true)}
                    {isLoadingVehicle && !vehicleData ? (
                      <Grid item lg={2}>
                        <Skeleton variant="rounded" height={50} />
                      </Grid>
                    ) : (
                      <Grid item>
                        <TextField
                          required
                          disabled={!isEditing}
                          id="color"
                          name="color"
                          inputProps={{
                            maxLength: 30,
                          }}
                          variant="outlined"
                          {...getFieldValues(
                            vehicleData.color ?? "",
                            isEditing
                          )}
                        />
                      </Grid>
                    )}
                  </Grid>
                  {hasError.error && (
                    <Grid
                      container
                      lg={12}
                      justifyContent="center"
                      marginTop={4}
                    >
                      <Grid item lg={6}>
                        <br />
                        <Alert severity="error">{hasError.msg}</Alert>
                      </Grid>
                    </Grid>
                  )}
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
                            setHasError({ error: false, msg: null });
                            refreshData(
                              API_ROUTES.VEHICLE_BY_ID.replace(":id", id)
                            );
                          }}
                        >
                          Cancelar
                        </Button>

                        <LoadingButton
                          sx={{ marginLeft: 1 }}
                          type="submit"
                          size="medium"
                          loading={isSaving}
                          variant="contained"
                          color="success"
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
                {getSubHeader("Servicios", true, 4)}
                {isLoadingVehicle ? (
                  <Grid item lg={12}>
                    <Skeleton variant="rounded" height={300} />
                  </Grid>
                ) : (
                  <>
                    <Grid item container lg={8}>
                      <Grid item lg={12}>
                        <ServicesTable rows={servicesRows} />
                      </Grid>
                    </Grid>
                    <Grid item container textAlign="end" lg={3}>
                      <Grid item lg={12}>
                        <Button
                          variant="contained"
                          startIcon={<EventRepeatOutlinedIcon />}
                          color="info"
                          onClick={() => {
                            setRemainderModalOpen(true);
                          }}
                        >
                          Agregar Recordatorio
                        </Button>
                        <ServiceReminders list={remindersList} />
                      </Grid>

                      <Grid item lg={12} />
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
          </>
        )}
      </MainCard>
      {remainderModalOpen && (
        <AddReminderModal
          open
          VIN={id}
          handleOnClose={() => {
            setRemainderModalOpen(false);
          }}
        />
      )}
    </>
  );
}
