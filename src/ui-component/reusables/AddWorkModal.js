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
  InputAdornment,
  Alert,
} from "@mui/material";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import PercentIcon from "@mui/icons-material/Percent";
import { LoadingButton } from "@mui/lab";
import { saveWork } from "client/api/works";
function AddWorkModal(props) {
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
          title="Agregar trabajo a servicio"
          sx={{ textAlign: "center" }}
        />
        <Divider />
        <CardContent>
          <Box component="form" onSubmit={submitHandler}>
            <Grid container direction="column" spacing={2} maxWidth="lg">
              <Grid item>
                <TextField
                  autoComplete="off"
                  required
                  id="description"
                  name="description"
                  label="Trabajo realizado"
                  fullWidth={true}
                  inputProps={{
                    maxLength: 255,
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  autoComplete="off"
                  required
                  id="basePrice"
                  name="basePrice"
                  type="number"
                  label="Precio base"
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
                  label="Descuento (%)"
                />
              </Grid>
              {hasError.error && (
                <Grid item lg={4}>
                  <Alert sx={{ maxWidth: "250px" }} severity="error">
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

export default AddWorkModal;
