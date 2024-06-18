import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Button, 
  Grid,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MainCard from "ui-component/cards/MainCard";
import NextBreadcrumbs from "ui-component/reusables/BreadCrums";

import { useState } from "react";
import { useSnackbar } from "notistack";
import {
  getFetcher,
  refreshData,
  useGetSupplierById,
} from "client/api/useRequest";
import { API_ROUTES } from "client/api/constants";
import { updateSupplier } from "client/api/suppliers";
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
      defaultValue: value,
    };
  return { value };
};
export default function BySupplierId() {
  const paths = [
    { path: "", text: "Inicio" },
    { path: "suppliers", text: "Proveedores" },
  ];
  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasError, setHasError] = useState({ error: false, msg: null });
  const { supplierData, supplierError, isLoadingSupplier } = useGetSupplierById(
    getFetcher,
    id,
    true
  );

  paths.push({ path: id, text: supplierData?.name });
  async function submitHandler(event) {
    event.preventDefault();
    setIsSaving(true);
    setHasError({ error: false, msg: "" });

    const result = await updateSupplier({
      id,
      name: event?.target?.name?.value,
      contactName: event?.target?.contactName?.value,
      phone: event?.target?.phone?.value,
      email: event?.target?.email?.value,
      address: event?.target?.address?.value,
      comments: event?.target?.comments?.value,
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
  return (
    <>
      {" "}
      <NextBreadcrumbs
        sx={{ margin: 1 }}
        paths={paths}
        lastLoaded={supplierData}
      />
      <MainCard
        title={`Proveedor: ${supplierData?.name}`}
        loadingTitle={isLoadingSupplier}
        titleSx={{ textAlign: "center" }}
      >
        <Box padding={2} sx={{ border: "3px solid grey" }}>
          {supplierError ? (
            <Grid item>
              <br />
              <Alert severity="error">{supplierError.message}</Alert>
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
                <Grid item textAlign="end" lg={12}>
                  {supplierData && (
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
                  >
                    {getSubHeader("Nombre", true)}
                    {isLoadingSupplier ? (
                      <Grid item lg={2}>
                        <Skeleton variant="rounded" height={50} />
                      </Grid>
                    ) : (
                      <Grid item>
                        <TextField
                          disabled={!isEditing}
                          id="name"
                          name="name"
                          variant="outlined"
                          inputProps={{
                            maxLength: 255,
                          }}
                          {...getFieldValues(supplierData.name, isEditing)}
                        />
                      </Grid>
                    )}

                    {getSubHeader("Nombre de contacto", true)}
                    {isLoadingSupplier ? (
                      <Grid item lg={2}>
                        <Skeleton variant="rounded" height={50} />
                      </Grid>
                    ) : (
                      <Grid item>
                        <TextField
                          disabled={!isEditing}
                          id="contactName"
                          name="contactName"
                          variant="outlined"
                          inputProps={{
                            maxLength: 255,
                          }}
                          {...getFieldValues(
                            supplierData.contactName,
                            isEditing
                          )}
                        />
                      </Grid>
                    )}
                    {getSubHeader("Teléfono", true)}
                    {isLoadingSupplier ? (
                      <Grid item lg={2}>
                        <Skeleton variant="rounded" height={50} />
                      </Grid>
                    ) : (
                      <Grid item>
                        <TextField
                          disabled={!isEditing}
                          id="phone"
                          name="phone"
                          variant="outlined"
                          {...getFieldValues(supplierData.phone, isEditing)}
                          inputProps={{
                            maxLength: 13,
                          }}
                        />
                      </Grid>
                    )}
                    {getSubHeader("Correo", true)}
                    {isLoadingSupplier ? (
                      <Grid item lg={2}>
                        <Skeleton variant="rounded" height={50} />
                      </Grid>
                    ) : (
                      <Grid item>
                        <TextField
                          disabled={!isEditing}
                          id="email"
                          name="email"
                          variant="outlined"
                          inputProps={{
                            maxLength: 255,
                          }}
                          {...getFieldValues(supplierData.email, isEditing)}
                        />
                      </Grid>
                    )}
                    {getSubHeader("Dirección", true)}
                    {isLoadingSupplier ? (
                      <Grid item lg={2}>
                        <Skeleton variant="rounded" height={50} />
                      </Grid>
                    ) : (
                      <Grid item lg={6}>
                        <TextField
                          fullWidth
                          disabled={!isEditing}
                          id="address"
                          name="address"
                          variant="outlined"
                          inputProps={{
                            maxLength: 255,
                          }}
                          {...getFieldValues(supplierData.address, isEditing)}
                        />
                      </Grid>
                    )}
                    {getSubHeader("Notas", true)}
                    {isLoadingSupplier ? (
                      <Grid item lg={2}>
                        <Skeleton variant="rounded" height={50} />
                      </Grid>
                    ) : (
                      <Grid item lg={6}>
                        <TextField
                          fullWidth
                          multiline
                          rows={5}
                          maxRows={5}
                          disabled={!isEditing}
                          id="comments"
                          name="comments"
                          variant="outlined"
                          inputProps={{
                            maxLength: 5000,
                          }}
                          {...getFieldValues(supplierData.comments, isEditing)}
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
                            disabled={isSaving}
                            variant="outlined"
                            size="medium"
                            color="error"
                            onClick={() => {
                              setIsEditing(false);
                              setHasError({ error: false, msg: null });
                              refreshData(
                                `${API_ROUTES.ALL_SUPPLIERS_API}/${id}`
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
      </MainCard>
    </>
  );
}
