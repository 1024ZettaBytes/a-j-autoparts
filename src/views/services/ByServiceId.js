import { LoadingButton } from "@mui/lab";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import MainCard from "ui-component/cards/MainCard";
import AddUsedProductModal from "ui-component/reusables/AddUsedProductModal";
import AddWorkModal from "ui-component/reusables/AddWorkModal";
import NextBreadcrumbs from "ui-component/reusables/BreadCrums";
import ServiceActionModal from "ui-component/reusables/ServiceActionModal";
import { getStatusLabel } from "ui-component/services/ServicesTable";
import SnacksTable from "ui-component/snacks/SnacksTable";
import WorksTable from "ui-component/works/WorksTable";
import { PATH } from "shared/const";
const getSubHeader = (text, fullWidth = false, marginTop = 2) => {
  return (
    <Grid marginTop={marginTop} item lg={fullWidth ? 12 : 2}>
      <Typography variant="h4">{text}</Typography>
    </Grid>
  );
};
export default function ByServiceId() {
  const navigate = useNavigate();
  const paths = [
    { path: "", text: "Inicio" },
    { path: "services", text: "Servicios" },
  ];
  const { id } = useParams();
  const [workModalIsOpen, setWorkModalIsOpen] = useState(false);
  const [productModalIsOpen, setProductModalIsOpen] = useState(false);
  const [serviceModalIsOpen, setServiceModalIsOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const data = {
    status: "IN_PROGRESS",
    customer: "Eduardo Ramírez",
    vehicle: "Nissan Sentra 2023",
  };
  paths.push({ path: id, text: id });
  return (
    <>
      {" "}
      <NextBreadcrumbs sx={{ margin: 1 }} paths={paths} lastLoaded={true} />
      <MainCard title={`Servicio: #${id}`} titleSx={{ textAlign: "center" }}>
        <Grid
          container
          direction="row"
          justifyContent="left"
          alignItems="left"
          spacing={1}
        >
          {getSubHeader("Estado", true)}

          <Grid item>{getStatusLabel(data.status)}</Grid>
          {getSubHeader("Cliente", true)}
          <Grid item>
            <TextField
              disabled
              id="filled-basic"
              variant="outlined"
              value={data.customer}
            />
          </Grid>
          {getSubHeader("Vehículo", true)}
          <Grid item>
            <TextField
              disabled
              id="filled-basic"
              variant="outlined"
              value={data.vehicle}
            />
          </Grid>
          {getSubHeader("Trabajos realizados", true, 6)}
          <Grid item container lg={8}>
            <Grid item>
              <WorksTable />
            </Grid>
          </Grid>
          <Grid item textAlign="end" lg={8}>
            <Button
              sx={{ display: "inline" }}
              variant="contained"
              color="secondary"
              onClick={() => {
                setWorkModalIsOpen(true);
              }}
            >
              Agregar
            </Button>
          </Grid>
          {getSubHeader("Refacciones", true, 4)}
          <Grid item container lg={10}>
            <Grid item lg={12}>
              <SnacksTable />
            </Grid>
          </Grid>
          <Grid item textAlign="end" lg={10}>
            <Button
              sx={{ display: "inline" }}
              variant="contained"
              color="secondary"
              onClick={() => {
                setProductModalIsOpen(true);
              }}
            >
              Agregar
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} textAlign={"center"} marginTop={10}>
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
      </MainCard>
      {workModalIsOpen && (
        <AddWorkModal
          handleOnClose={() => {
            setWorkModalIsOpen(false);
          }}
          open
        />
      )}
      {productModalIsOpen && (
        <AddUsedProductModal
          handleOnClose={() => {
            setProductModalIsOpen(false);
          }}
          open
        />
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
           navigate('/vehicles/87'); // Target path
          }}
        />
      )}
    </>
  );
}
