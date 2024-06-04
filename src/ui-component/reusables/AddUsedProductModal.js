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
} from "@mui/material";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import { LoadingButton } from "@mui/lab";
import { saveWork } from "client/api/works";
function AddUsedProductModal(props) {
  const { handleOnClose, open, serviceId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState({ error: false, msg: "" });

  async function submitHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    setHasError({ error: false, msg: "" });

    const result = await saveWork({
      service: parseInt(serviceId),
      description: event?.target?.description?.value,
      basePrice: event?.target?.basePrice?.value,
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
                <Autocomplete
                  fullWidth
                  id="combo-box-demo"
                  options={[
                    {
                      id: "1",
                      label: "(AC5W30)" + "Aceite 5w30 1 Lt",
                    },
                  ]}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Pieza/Refacción" />
                  )}
                />
              </Grid>
              <Grid item>
                <TextField
                  autoComplete="off"
                  required
                  id="email"
                  name="email"
                  defaultValue={0}
                  type="number"
                  label="Cantidad" 
                />
              </Grid>
              <Grid item>
                <TextField
                  autoComplete="off"
                  required
                  id="email"
                  name="email"
                  type="number"
                  label="Precio unitario"
                  InputProps={{
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
                  id="email"
                  name="email"
                  defaultValue={0}
                  type="number"
                  label="Descuento (%)"
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
  );
}

export default AddUsedProductModal;
