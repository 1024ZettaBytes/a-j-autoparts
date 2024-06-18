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
  TextField,
  Typography,
  Autocomplete,
  InputAdornment,
  Skeleton,
  Alert,
} from "@mui/material";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";

import { LoadingButton } from "@mui/lab";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import {
  getFetcher,
  useGetAllProducts,
  useGetAllSuppliers,
} from "client/api/useRequest";
import { saveProductEntry } from "client/api/inventory";
function AddEntryModal(props) {
  const { handleOnClose, open } = props;
  const [isSaving, setIsSaving] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hasError, setHasError] = useState({ error: false, msg: "" });
  const { productsList, productsError, isLoadingProducts } = useGetAllProducts(
    getFetcher,
    null,
    true
  );

  const onChangeDate = (value) => {
    if (value?.toString() === "Invalid Date") {
      value = null;
    }
    setSelectedDate(value);
  };

  const { suppliersList, suppliersError, isLoadingSuppliers } =
    useGetAllSuppliers(getFetcher, null, true, true);
  async function submitHandler(event) {
    event.preventDefault();
    setIsSaving(true);
    setHasError({ error: false, msg: "" });
    const result = await saveProductEntry({
      product: selectedProduct?.id,
      supplier: selectedSupplier?.id,
      date: selectedDate,
      qty: event?.target?.qty?.value,
      cost: event?.target?.cost?.value,
    });
    setIsSaving(false);
    if (!result.error) {
      handleSaved(result.msg);
    } else {
      handleErrorOnSave(result.msg);
    }
  }
  const handleClose = () => {
    setHasError({ error: false, msg: "" });
    setIsSaving(false);
    handleOnClose(false);
  };
  const handleSaved = (successMessage) => {
    handleOnClose(true, successMessage);
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
                {productsError ? (
                  <Typography color="red" marginTop={2} fontStyle="italic">
                    {productsError.message}
                  </Typography>
                ) : isLoadingProducts ? (
                  <Skeleton variant="rectangular" width={210} height={60} />
                ) : productsList?.length === 0 ? (
                  <Typography
                    color="darkorange"
                    marginTop={2}
                    fontStyle="italic"
                  >
                    Aun no hay productos registrados
                  </Typography>
                ) : (
                  <Autocomplete
                    disablePortal
                    id="supplier"
                    name="supplier"
                    options={productsList.map((product) => {
                      return {
                        label: ` (${product.code}) ${product.name}`,
                        id: product.code,
                      };
                    })}
                    onChange={(event, newValue) => {
                      setSelectedProduct(newValue);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    renderInput={(params) => (
                      <TextField
                        fullWidth={true}
                        required
                        {...params}
                        label="Producto"
                      />
                    )}
                  />
                )}
              </Grid>
              <Grid item>
                <DesktopDatePicker
                  sx={{ width: "70%" }}
                  id="date"
                  name="date"
                  label="Fecha"
                  inputFormat="dd/MM/yyyy"
                  maxDate={new Date()}
                  value={selectedDate}
                  onChange={onChangeDate}
                  slotProps={{ textField: { variant: "outlined" } }}
                />
              </Grid>
              <Grid item>
                <TextField
                  sx={{ width: "50%" }}
                  autoComplete="off"
                  required
                  id="qty"
                  name="qty"
                  type="number"
                  InputProps={{
                    inputProps: {
                      min: 1,
                    },
                  }}
                  label="Cantidad"
                />
              </Grid>
              <Grid item>
                <TextField
                  sx={{ width: "50%" }}
                  autoComplete="off"
                  required
                  id="cost"
                  name="cost"
                  type="number"
                  label="Precio de compra"
                  InputProps={{
                    inputProps: {
                      min: 0,
                      step: 0.01,
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                {suppliersError ? (
                  <Typography color="red" marginTop={2} fontStyle="italic">
                    {suppliersError.message}
                  </Typography>
                ) : isLoadingSuppliers ? (
                  <Skeleton variant="rectangular" width={210} height={60} />
                ) : suppliersList?.length === 0 ? (
                  <Typography
                    color="darkorange"
                    marginTop={2}
                    fontStyle="italic"
                  >
                    Aun no hay proveedores registrados
                  </Typography>
                ) : (
                  <Autocomplete
                    disablePortal
                    id="supplier"
                    name="supplier"
                    options={suppliersList.map((supp) => {
                      return {
                        label: ` (${supp.id}) ${supp.name}`,
                        id: supp.id,
                      };
                    })}
                    onChange={(event, newValue) => {
                      setSelectedSupplier(newValue);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    renderInput={(params) => (
                      <TextField
                        fullWidth={true}
                        required
                        {...params}
                        label="Proveedor"
                      />
                    )}
                  />
                )}
              </Grid>
              {hasError.error ? (
                <Grid item>
                  <br />
                  <Alert sx={{ maxWidth: "250px" }} severity="error">
                    {hasError?.msg}
                  </Alert>
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
                      loading={isSaving}
                      size="large"
                      variant="contained"
                      disabled={
                        !productsList ||
                        productsList.length === 0 ||
                        !suppliersList ||
                        suppliersList.length === 0 ||
                        !selectedDate
                      }
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
