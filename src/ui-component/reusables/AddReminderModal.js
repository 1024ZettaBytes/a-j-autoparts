import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { saveReminder } from "client/api/service_reminders";
function AddReminderModal(props) {
  const {VIN, handleOnClose, open } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState({ error: false, msg: "" });
  const [selectedDate, setSelectedDate] = useState(null);

  const onChangeDate = (value) => {
    if (!value || value?.toString() === "Invalid Date") {
      value = null;
    }
    setSelectedDate(value);
  };
  async function submitHandler() {
    setIsLoading(true);
    setHasError({ error: false, msg: "" });
    const result = await saveReminder({
      vehicle: VIN,
      date: selectedDate
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
        <CardHeader
          title="Agregar recordatorio de servicio"
          sx={{ textAlign: "center" }}
        />
        <Divider />
        <CardContent>
          <Grid
            container
            direction="row"
            justifyContent="center"
            spacing={2}
            maxWidth="300px"
          >
            <Grid item>
              <DesktopDatePicker
                required
                label="Fecha próximo servicio"
                inputFormat="dd/MM/yyyy"
                minDate={new Date()}
                value={selectedDate}
                onChange={(newValue) => {
                  onChangeDate(newValue);
                }}
                slotProps={{ textField: { variant: "outlined" } }}
              />
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
                    disabled={selectedDate === null}
                    loading={isLoading}
                    size="large"
                    variant="contained"
                    onClick={submitHandler}
                  >
                    Guardar
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Dialog>
  );
}

export default AddReminderModal;
