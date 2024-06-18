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
  Autocomplete,
  InputAdornment,
  Typography,
  Skeleton,
  Alert,
} from "@mui/material";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import PercentIcon from "@mui/icons-material/Percent";

import { LoadingButton } from "@mui/lab";
import { getFetcher, useGetAllProducts } from "client/api/useRequest";
import { saveUsedProduct } from "client/api/usedProducts";
function AddUsedProductModal(props) {
  const { handleOnClose, open, serviceId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState({ error: false, msg: "" });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { productsList, productsError, isLoadingProducts } = useGetAllProducts(
    getFetcher,
    null
  );
  async function submitHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    setHasError({ error: false, msg: "" });

    const result = await saveUsedProduct({
      service: parseInt(serviceId),
      product: selectedProduct.id,
      qty: parseInt(event?.target?.qty?.value),
      unitPrice: event?.target?.unitPrice?.value,
      discountPercentage: event?.target?.discountPercentage?.value,
    });
    setIsLoading(false);
    if (!result.error) {
      handleSavedWork(result.msg);
    } else {
      handleErrorOnSave(result.msg);
    }
  }
  const handleClose = () => {
    setHasError({ error: false, msg: "" });
    setIsLoading(false);
    handleOnClose(false);
  };
  const handleSavedWork = (successMessage) => {
    handleOnClose(true, successMessage);
  };

  const handleErrorOnSave = (msg) => {
    setHasError({ error: true, msg });
  };

  return (
    <Dialog open={open} scroll={"body"}>
      <Card>
        <CardHeader
          title="Agregar refacción a servicio"
          sx={{ textAlign: "center" }}
        />
        <Divider />
        <CardContent>
          <Box component="form" onSubmit={submitHandler}>
            <Grid container direction="column" spacing={2} maxWidth="lg">
              <Grid item>
                {productsError ? (
                  <Typography color="red" marginTop={2} fontStyle="italic">
                    {productsError.message}
                  </Typography>
                ) : isLoadingProducts ? (
                  <Skeleton variant="rectangular" width={300} height={60} />
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
                    fullWidth
                    id="product"
                    options={productsList.map((product) => {
                      return {
                        label: ` (${product.code}) ${product.name} [${product.stock}]`,
                        id: product.code,
                        stock: product.stock,
                        isDisabled: product.stock <= 0,
                      };
                    })}
                    getOptionDisabled={(option) => {
                      return option.isDisabled;
                    }}
                    onChange={(event, newValue) => {
                      setSelectedProduct(newValue);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Pieza/Refacción" />
                    )}
                  />
                )}
              </Grid>
              <Grid item>
                <TextField
                  autoComplete="off"
                  required
                  id="qty"
                  name="qty"
                  defaultValue={0}
                  type="number"
                  label="Cantidad"
                  InputProps={{
                    inputProps: {
                      min: 0,
                      max: selectedProduct?.stock ?? 0,
                    },
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  autoComplete="off"
                  required
                  id="unitPrice"
                  name="unitPrice"
                  type="number"
                  label="Precio unitario"
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
              <Grid item>
                <TextField
                  autoComplete="off"
                  required
                  id="discountPercentage"
                  name="discountPercentage"
                  defaultValue={0}
                  type="number"
                  label="Descuento (%)"
                  InputProps={{
                    inputProps: {
                      min: 0,
                      max: 100,
                      step: 0.1,
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <PercentIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {hasError.error && (
                <Grid item lg={4}>
                  <Alert sx={{ maxWidth: "300px" }} severity="error">
                    {hasError?.msg}
                  </Alert>
                </Grid>
              )}
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
                      disabled={!selectedProduct}
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

export default AddUsedProductModal;
