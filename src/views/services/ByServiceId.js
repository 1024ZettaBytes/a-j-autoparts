import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Button,
  Grid,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { getFetcher, useGetServiceById } from "client/api/useRequest";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import MainCard from "ui-component/cards/MainCard";
import AddUsedProductModal from "ui-component/reusables/AddUsedProductModal";
import AddWorkModal from "ui-component/reusables/AddWorkModal";
import NextBreadcrumbs from "ui-component/reusables/BreadCrums";
import ServiceActionModal from "ui-component/reusables/ServiceActionModal";
import { getStatusLabel } from "ui-component/services/ServicesTable";
import SnacksTable from "ui-component/snacks/SnacksTable";
import WorksTable from "ui-component/works/WorksTable";
const getSubHeader = (text, fullWidth = false, marginTop = 2) => {
  return (
    <Grid marginTop={marginTop} item lg={fullWidth ? 12 : 2}>
      <Typography variant="h4">{text}</Typography>
    </Grid>
  );
};
export default function ByServiceId() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const paths = [
    { path: "", text: "Inicio" },
    { path: "services", text: "Servicios" },
  ];
  const { id } = useParams();
  const [recordModalIsOpen, setRecordModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [serviceModalIsOpen, setServiceModalIsOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const { serviceData, serviceError, isLoadingService } = useGetServiceById(
    getFetcher,
    id,
    true
  );
  const { year, make, model } = serviceData?.vehicle_service_vehicleTovehicle
    ?.vehicles_db || { year: 0, make: "", model: "" };
  paths.push({ path: id, text: id });
  const handleCloseRecordModal = (addedRecord, successMessage = null) => {
    setRecordModalIsOpen(false);
    if (addedRecord && successMessage) {
      enqueueSnackbar(successMessage, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        autoHideDuration: 1500,
      });
    }
  };
  return (
    <>
      {" "}
      <NextBreadcrumbs sx={{ margin: 1 }} paths={paths} lastLoaded={true} />
      <MainCard title={`Servicio: #${id}`} titleSx={{ textAlign: "center" }}>
        {serviceError ? (
          <Grid item>
            <br />
            <Alert severity="error">{serviceError.message}</Alert>
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
              {getSubHeader("Estado", true)}
              {isLoadingService ? (
                <Grid item lg={2}>
                  <Skeleton variant="rounded" height={50} />
                </Grid>
              ) : (
                <Grid item>{getStatusLabel(serviceData?.status)}</Grid>
              )}
              {getSubHeader("Cliente", true)}
              <Grid item lg={3}>
                {isLoadingService ? (
                  <Skeleton variant="rounded" height={50} />
                ) : (
                  <TextField
                    disabled
                    id="filled-basic"
                    variant="outlined"
                    value={
                      serviceData?.vehicle_service_vehicleTovehicle
                        ?.customer_vehicle_customerTocustomer?.name
                    }
                  />
                )}
              </Grid>
              {getSubHeader("Vehículo", true)}
              <Grid item lg={3}>
                {isLoadingService ? (
                  <Skeleton variant="rounded" height={50} />
                ) : (
                  <TextField
                    disabled
                    id="filled-basic"
                    variant="outlined"
                    value={`${make} ${model} ${year}`}
                  />
                )}
              </Grid>
              {getSubHeader("Trabajos realizados", true, 6)}
              <Grid item container lg={8}>
                {isLoadingService ? (
                  <Grid item lg={12}>
                    <Skeleton variant="rounded" height={200} />
                  </Grid>
                ) : (
                  <>
                    {serviceData?.work_work_serviceToservice?.length === 0 ? (
                      <Typography
                        textAlign="center"
                        fontStyle={"italic"}
                        width="100%"
                      >
                        Aún no hay trabajos agregados
                      </Typography>
                    ) : (
                      <Grid item>
                        <WorksTable
                          rows={serviceData?.work_work_serviceToservice}
                          total={serviceData?.workTotal}
                        />
                      </Grid>
                    )}
                    <Grid item textAlign="end" lg={12}>
                      <Button
                        sx={{ display: "inline" }}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          setModalType("WORK");
                          setRecordModalIsOpen(true);
                        }}
                      >
                        Agregar
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>

              {getSubHeader("Refacciones", true, 4)}
              <Grid item container lg={10}>
                {isLoadingService ? (
                  <Grid item lg={12}>
                    <Skeleton variant="rounded" height={200} />
                  </Grid>
                ) : (
                  <>
                    {serviceData?.used_product_used_product_serviceToservice
                      ?.length === 0 ? (
                      <Typography
                        textAlign="center"
                        fontStyle={"italic"}
                        width="100%"
                      >
                        Aún no hay refacciones agregadas
                      </Typography>
                    ) : (
                      <Grid item>
                        <SnacksTable />
                      </Grid>
                    )}
                    <Grid item textAlign="end" lg={10}>
                      <Button
                        sx={{ display: "inline" }}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          setModalType("PRODUCT");
                          setRecordModalIsOpen(true);
                        }}
                      >
                        Agregar
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              textAlign={"center"}
              marginTop={10}
            >
              <Button
                variant="outlined"
                size="medium"
                color="error"
                onClick={() => {
                  setCurrentAction("CANCEL");
                  setServiceModalIsOpen(true);
                }}
              >
                Cancelar Servicio
              </Button>

              <LoadingButton
                sx={{ marginLeft: 1 }}
                type="submit"
                size="medium"
                loading={false}
                variant="contained"
                color="success"
                onClick={() => {
                  setCurrentAction("FINISH");
                  setServiceModalIsOpen(true);
                }}
              >
                Finalizar
              </LoadingButton>
            </Grid>
          </>
        )}
      </MainCard>
      {recordModalIsOpen && modalType === "WORK" && (
        <AddWorkModal
          handleOnClose={handleCloseRecordModal}
          serviceId={id}
          open
        />
      )}
      {recordModalIsOpen && modalType === "PRODUCT" && (
        <AddUsedProductModal handleOnClose={handleCloseRecordModal} open />
      )}
      {serviceModalIsOpen && currentAction === "CANCEL" && (
        <ServiceActionModal
          open
          title="Cancelar servicio"
          inputLabel="Razón de cancelación"
          text="Se cancelará el servicio del vehículo Sentra - Eduardo Ramírez"
          isLoading={false}
          type="CANCEL"
          onCancel={() => {
            setServiceModalIsOpen(false);
          }}
        />
      )}
      {serviceModalIsOpen && currentAction === "FINISH" && (
        <ServiceActionModal
          open
          title="Finalizar servicio"
          inputLabel="Comentarios adicionales"
          text="Se marcará el servicio como completado con un total de cobro de $2, 500.00"
          isLoading={false}
          type="DONE"
          onCancel={() => {
            setServiceModalIsOpen(false);
          }}
          onAccept={() => {
            setServiceModalIsOpen(false);
            //window.location.href = `${PATH}/#/vehicles/87`;
            navigate("/vehicles/87"); // Target path
          }}
        />
      )}
    </>
  );
}
