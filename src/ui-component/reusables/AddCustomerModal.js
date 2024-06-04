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
  Skeleton,
  Alert,
} from "@mui/material";
import { getFetcher, useGetCustomerTypes } from "client/api/useRequest";

import { LoadingButton } from "@mui/lab";
import { saveCustomer } from "client/api/customers";
function AddCustomerModal(props) {
  const { handleOnClose, open } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [hasError, setHasError] = useState({ error: false, msg: "" });
  const { isLoadingTypes, typesList } = useGetCustomerTypes(getFetcher, true);

  async function submitHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    setHasError({ error: false, msg: "" });

    const result = await saveCustomer({
      type: event?.target?.type?.value,
      name: event?.target?.name?.value,
      phone: event?.target?.phone?.value,
      email: event?.target?.email?.value,
    });
    setIsLoading(false);
    if (!result.error) {
      handleSavedCustomer(result.msg);
    } else {
      handleErrorOnSave(result.msg);
    }
  }
  const handleClose = () => {
    setHasError({ error: false, msg: "" });
    setIsLoading(false);
    handleOnClose(false);
  };
  const handleSavedCustomer = (successMessage) => {
    handleOnClose(true, successMessage);
  };

  const handleErrorOnSave = (msg) => {
    setHasError({ error: true, msg });
  };

  return (
    <Dialog open={open} scroll={"body"}>
      <Card>
        <CardHeader title="Agregar Cliente" sx={{ textAlign: "center" }} />
        <Divider />
        <CardContent>
          <Box component="form" onSubmit={submitHandler}>
            <Grid container direction="column" spacing={2} maxWidth="lg">
              <Grid item lg={12}>
                <Typography
                  variant="h5"
                  component="h5"
                  color="secondary"
                  textAlign="left"
                  fontWeight="bold"
                >
                  Tipo
                </Typography>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                {isLoadingTypes ? (
                  <Skeleton variant="rectangular" width={210} height={60} />
                ) : (
                  <FormControl sx={{ width: "50%" }}>
                    <InputLabel id="machine-id">Tipo*</InputLabel>
                    <Select
                      fullWidth={true}
                      labelId="type-id"
                      label="Tipo*"
                      id="type"
                      name="type"
                      value={selectedType || ""}
                      onChange={(event) => setSelectedType(event.target.value)}
                      required
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
                )}
              </Grid>

              <Grid item>
                <TextField
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
                  fullWidth={true}
                  autoComplete="off"
                  required
                  id="phone"
                  name="phone"
                  label="Teléfono"
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth={true}
                  autoComplete="off"
                  required
                  id="email"
                  name="email"
                  type="email"
                  label="Correo"
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

export default AddCustomerModal;
