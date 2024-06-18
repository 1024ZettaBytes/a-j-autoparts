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
  Alert,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import { saveSupplier } from "client/api/suppliers";
function AddSupplierModal(props) {
  const { handleOnClose, open } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState({ error: false, msg: "" });

  async function submitHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    setHasError({ error: false, msg: "" });

    const result = await saveSupplier({
      name: event?.target?.name?.value,
      contactName: event?.target?.contactName?.value,
      phone: event?.target?.phone?.value,
      email: event?.target?.email?.value,
      address: event?.target?.address?.value,
      comments: event?.target?.comments?.value,
    });
    setIsLoading(false);
    if (!result.error) {
      handleSaved(result.msg);
    } else {
      handleErrorOnSave(result.msg);
    }
  }
  const handleClose = () => {
    setHasError({ error: false, msg: "" });
    setIsLoading(false);
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
        <CardHeader title="Agregar Proveedor" sx={{ textAlign: "center" }} />
        <Divider />
        <CardContent>
          <Box component="form" onSubmit={submitHandler}>
            <Grid container direction="column" spacing={2} maxWidth="lg">
              <Grid item>
                <TextField
                  autoComplete="off"
                  required
                  id="name"
                  name="name"
                  label="Nombre"
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
                  id="contactName"
                  name="contactName"
                  label="Nombre Contacto"
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
                  id="phone"
                  name="phone"
                  label="Teléfono"
                  fullWidth={true}
                  inputProps={{
                    maxLength: 13,
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  autoComplete="off"
                  id="email"
                  name="email"
                  label="Correo"
                  fullWidth={true}
                  inputProps={{
                    maxLength: 255,
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  autoComplete="off"
                  id="address"
                  name="address"
                  label="Dirección"
                  inputProps={{
                    maxLength: 255,
                  }}
                  fullWidth={true}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth={true}
                  autoComplete="off"
                  multiline
                  rows={3}
                  maxRows={3}
                  id="comments"
                  name="comments"
                  label="Notas"
                  inputProps={{
                    maxLength: 5000,
                  }}
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

export default AddSupplierModal;
