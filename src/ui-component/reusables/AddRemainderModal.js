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
  Autocomplete,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import { LoadingButton } from "@mui/lab";
import { DesktopDatePicker } from "@mui/x-date-pickers";
function AddRemainderModal(props) {
  const { handleOnClose, open } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState({ error: false, msg: "" });
  const [selectedCity, setSelectedCity] = useState();
  const [selectedSector, setSelectedSector] = useState();
  const [citySectors, setCitySectors] = useState([]);
  const [wasReferred, setWasReferred] = useState(false);
  const [selectedHowFound, setSelectedHowFound] = useState();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [referredBy, setReferredBy] = useState();

  function handleSectorSelection(sector) {
    setSelectedSector(sector);
  }
  function handleHowFoundSelection(howFound) {
    setSelectedHowFound(howFound);
    setWasReferred(howFound === "referred");
  }
  function handleReferredBySelection(referredBy) {
    setReferredBy(referredBy);
  }
  async function submitHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    setHasError({ error: false, msg: "" });
    const result = {};
    /*const result = await saveCustomer({
      name: event.target.name.value,
      cell: event.target.cell.value,
      email: event.target.email.value,
      howFound: event.target.howFound.value,
      referredBy: referredBy,
      street: event.target.street.value,
      suburb: event.target.suburb.value,
      city: selectedCity,
      sector: selectedSector,
      residenceRef: event.target.residenceRef.value,
      nameRef: event.target.nameRef.value,
      telRef: event.target.telRef.value,
      maps: event.target.maps.value,
    });*/
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
        <CardHeader
          title="Agregar recordatorio de servicio"
          sx={{ textAlign: "center" }}
        />
        <Divider />
        <CardContent>
          <Box component="form" onSubmit={submitHandler}>
            <Grid container direction="column" spacing={2} maxWidth="lg">
              <Grid item>
              <DesktopDatePicker
                          label="Fecha próximo servicio"
                          inputFormat="dd/MM/yyyy"
                          minDate={new Date()}
                          
                          onChange={(newValue) => {
                            //onChangeTime("date",newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
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

export default AddRemainderModal;
