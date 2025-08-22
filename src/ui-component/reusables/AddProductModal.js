import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import { saveProduct } from "client/api/inventory";
function AddProductModal(props) {
  const { handleOnClose, open } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState({ error: false, msg: "" });

  async function submitHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    setHasError({ error: false, msg: "" });

    const result = await saveProduct({
      code: event?.target?.code?.value,
      name: event?.target?.name?.value,
      stock: parseInt(event?.target?.stock?.value),
      min: parseInt(event?.target?.min?.value),
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
        <CardHeader title="Agregar Producto" sx={{ textAlign: "center" }} />
        <Divider />
        <CardContent>
          <Box component="form" onSubmit={submitHandler}>
            <Grid container direction="column" spacing={2} maxWidth="lg">
              <Grid item>
                <TextField
                  inputProps={{
                    maxLength: 20,
                  }}
                  autoComplete="off"
                  required
                  id="code"
                  name="code"
                  label="Código"
                />
              </Grid>
              <Grid item>
                <TextField
                  inputProps={{
                    maxLength: 255,
                  }}
                  autoComplete="off"
                  required
                  id="name"
                  name="name"
                  label="Nombre"
                  fullWidth={true}
                />
              </Grid>
              <Grid item>
                <TextField
                  InputProps={{
                    inputProps: {
                      min: 0,
                    },
                  }}
                  autoComplete="off"
                  required
                  id="stock"
                  name="stock"
                  type="number"
                  label="Stock actual"
                />
              </Grid>
              <Grid item>
                <TextField
                  InputProps={{
                    inputProps: {
                      min: 0,
                    },
                  }}
                  autoComplete="off"
                  required
                  id="min"
                  name="min"
                  type="number"
                  label="Mínimo"
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

export default AddProductModal;
