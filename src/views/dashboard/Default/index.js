import { useState } from "react";

// material-ui
import { Alert, Grid } from "@mui/material";

// project imports
import { gridSpacing } from "store/constant";
import ServicesCard from "./ServicesCard";
import ServicesAlertCard from "./ServicesAlertCard";
import InventoryAlertCard from "./InventoryAlertCard";
import { getFetcher, useGetSummary } from "client/api/useRequest";
import { API_ROUTES } from "client/api/constants";

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const {
    data: servicesList,
    error: servicesError,
    isLoading: isLoadingServices,
  } = useGetSummary(API_ROUTES.SUMMARY_ACTIVE_SERVICES_API, getFetcher);
  const {
    data: remindersList,
    error: remindersError,
    isLoading: isLoadingReminders,
  } = useGetSummary(API_ROUTES.SUMMARY_REMINDERS_API, getFetcher);
  const {
    data: productsList,
    error: productsError,
    isLoading: isLoadingProducts,
  } = useGetSummary(API_ROUTES.SUMMARY_INVENTORY_API, getFetcher);
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} md={4}>
        {servicesError ? (
          <Alert severity="error">{servicesError.message}</Alert>
        ) : (
          <ServicesCard
            isLoading={isLoadingServices}
            list={servicesList}
            title="Servicios Activos"
          />
        )}
      </Grid>
      <Grid item xs={12} md={4}>
        {remindersError ? (
          <Alert severity="error">{remindersError.message}</Alert>
        ) : (
          <ServicesAlertCard
            isLoading={isLoadingReminders}
            list={remindersList}
            title="Alertas Servicios"
          />
        )}
      </Grid>
      <Grid item xs={12} md={4}>
        {productsError ? (
          <Alert severity="error">{productsError.message}</Alert>
        ) : (
          <InventoryAlertCard
            isLoading={isLoadingProducts}
            list={productsList}
            title="Alertas inventario"
          />
        )}
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}></Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
