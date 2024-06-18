import { LoadingButton } from "@mui/lab";
import {
  Alert,
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
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MainCard from "ui-component/cards/MainCard";
import NextBreadcrumbs from "ui-component/reusables/BreadCrums";
import VehiclesTable from "ui-component/vehicles/VehiclesTable";
import { useState } from "react";
import { useSnackbar } from "notistack";
import {
  getFetcher,
  refreshData,
  useGetCustomerById,
  useGetCustomerTypes,
} from "client/api/useRequest";
import { API_ROUTES } from "client/api/constants";
import { getTypesLabel } from "ui-component/customers/CustomersTable";
import { updateCustomer } from "client/api/customers";
import ServicesTable from "ui-component/services/ServicesTable";
import AddVehicleModal from "ui-component/reusables/AddVehicleModal";
const getSubHeader = (text, fullWidth = false, marginTop = 2) => {
  return (
    <Grid marginTop={marginTop} item lg={fullWidth ? 12 : 2}>
      <Typography variant="h4">{text}</Typography>
    </Grid>
  );
};

const getFieldValues = (value, isEditing) => {
  if (isEditing)
    return {
      defaultValue: value || "",
    };
  return { value: value || "" };
};

export default function ByCustomerId() {
  const paths = [
    { path: "", text: "Inicio" },
    { path: "customers", text: "Clientes" },
  ];
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [vehicleModalIsOpen, setVehicleModalIsOpen] = useState(false);

  const [hasError, setHasError] = useState({ error: false, msg: null });
  const { customerData, customerError, isLoadingCustomer } = useGetCustomerById(
    getFetcher,
    id,
    true
  );
  const { isLoadingTypes, typesList } = useGetCustomerTypes(getFetcher, true);
  async function submitHandler(event) {
    event.preventDefault();
    setIsSaving(true);
    setHasError({ error: false, msg: "" });

    const result = await updateCustomer({
      id,
      name: event?.target?.name?.value,
      type: event?.target?.type?.value,
      phone: event?.target?.phone?.value,
      email: event?.target?.email?.value,
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
  const handleCloseVehicle = (addedVehicle, successMessage = null) => {
    setVehicleModalIsOpen(false);
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
  paths.push({ path: id, text: customerData?.name });

  return (
    <>
      {" "}
      <NextBreadcrumbs
        sx={{ margin: 1 }}
        paths={paths}
        lastLoaded={customerData}
      />
      <MainCard
        title={`Cliente: ${customerData?.name}`}
        titleSx={{ textAlign: "center" }}
      >
        <Box padding={2} sx={{ border: "3px solid grey" }}>
          {customerError ? (
            <Grid item>
              <br />
              <Alert severity="error">{customerError.message}</Alert>
            </Grid>
          ) : (
            <>
              <Grid
                container
                direction="row"
                justifyContent="left"
                alignItems="left"
                spacing={1}
              >
                <Grid item textAlign="center" lg={12}>
                  {customerData && (
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
                <Box width={"100%"} component="form" onSubmit={submitHandler}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="left"
                    alignItems="left"
                    spacing={1}
                    p={3}
                  >
                    {getSubHeader("Tipo", true)}

                    <Grid item lg={2}>
                      {isLoadingCustomer || isLoadingTypes || !typesList ? (
                        <Grid item lg={12}>
                          <Skeleton variant="rounded" height={50} />
                        </Grid>
                      ) : isEditing ? (
                        <FormControl fullWidth={true}>
                          <Select
                            disabled={!isEditing}
                            fullWidth={true}
                            labelId="type-id"
                            id="type"
                            name="type"
                            required
                            defaultValue={customerData.type}
                          >
                            {typesList
                              ? typesList?.map((type) => (
                                  <MenuItem key={type.id} value={type.id}>
                                    {type.description}
                                  </MenuItem>
                                ))
                              : null}
                          </Select>
                        </FormControl>
                      ) : (
                        getTypesLabel(customerData.type)
                      )}
                    </Grid>
                    {getSubHeader("Nombre", true)}
                    {isLoadingCustomer || !customerData ? (
                      <Grid item lg={2}>
                        <Skeleton variant="rounded" height={50} />
                      </Grid>
                    ) : (
                      <Grid item>
                        <TextField
                          disabled={!isEditing}
                          required
                          id="name"
                          name="name"
                          inputProps={{
                            maxLength: 255,
                          }}
                          variant="outlined"
                          {...getFieldValues(
                            customerData.name ?? "",
                            isEditing
                          )}
                        />
                      </Grid>
                    )}
                    {getSubHeader("Teléfono", true)}
                    {isLoadingCustomer || !customerData ? (
                      <Grid item lg={2}>
                        <Skeleton variant="rounded" height={50} />
                      </Grid>
                    ) : (
                      <Grid item>
                        <TextField
                          disabled={!isEditing}
                          required
                          id="phone"
                          name="phone"
                          inputProps={{
                            maxLength: 13,
                          }}
                          variant="outlined"
                          {...getFieldValues(
                            customerData.phone ?? "",
                            isEditing
                          )}
                        />
                      </Grid>
                    )}
                    {getSubHeader("Correo", true)}
                    {isLoadingCustomer || !customerData ? (
                      <Grid item lg={2}>
                        <Skeleton variant="rounded" height={50} />
                      </Grid>
                    ) : (
                      <Grid item>
                        <TextField
                          disabled={!isEditing}
                          required
                          id="email"
                          name="email"
                          type="email"
                          inputProps={{
                            maxLength: 255,
                          }}
                          variant="outlined"
                          {...getFieldValues(
                            customerData.email ?? "",
                            isEditing
                          )}
                        />
                      </Grid>
                    )}
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
                                API_ROUTES.CUSTOMER_BY_ID_API.replace(":id", id)
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
              </Grid>
            </>
          )}
        </Box>
        <Grid
          container
          direction="row"
          justifyContent="left"
          alignItems="left"
          spacing={1}
        >
          {getSubHeader("Vehículos", true, 6)}
          {isLoadingCustomer || !customerData ? (
            <Grid item lg={9}>
              <Skeleton variant="rounded" height={300} />
            </Grid>
          ) : (
            <>
              <Grid item container lg={9}>
                <Grid item lg={12}>
                  <VehiclesTable rows={customerData.vehicles} whitDetail />
                </Grid>
              </Grid>
              <Grid item textAlign="end" lg={9}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  color="secondary"
                  onClick={() => setVehicleModalIsOpen(true)}
                >
                  Agregar
                </Button>
              </Grid>
            </>
          )}
          {getSubHeader("Servicios", true, 4)}
          {isLoadingCustomer || !customerData ? (
            <Grid item lg={9}>
              <Skeleton variant="rounded" height={300} />
            </Grid>
          ) : (
            <Grid item container lg={10}>
              <Grid item lg={12}>
                <ServicesTable rows={customerData.services} detailed />
              </Grid>
            </Grid>
          )}
        </Grid>
      </MainCard>
      {vehicleModalIsOpen ? (
        <AddVehicleModal
          open={vehicleModalIsOpen}
          handleOnClose={handleCloseVehicle}
          defaultCustomer={{
            id: parseInt(id),
            label: `${customerData.name} (${customerData?.customer_type?.description})`,
          }}
        />
      ) : null}
    </>
  );
}
