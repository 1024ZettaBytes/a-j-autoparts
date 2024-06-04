import { Alert, Box, CircularProgress, Container, Grid } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import ServicesTable from "ui-component/services/ServicesTable";
import NextBreadcrumbs from "ui-component/reusables/BreadCrums";
import { getFetcher, useGetAllServices } from "client/api/useRequest";
import { useState } from "react";

function AllServices() {
  const paths = [
    { path: "", text: "Inicio" },
    { path: "services", text: "Servicios" },
  ];
  const [searchTerm, setSearchTerm] = useState(null);
  const { servicesList, servicesError, isLoadingServices } = useGetAllServices(
    getFetcher,
    searchTerm,
    null,
    true
  );

  return (
    <>
      <NextBreadcrumbs sx={{ margin: 1 }} paths={paths} lastLoaded={true} />
      <MainCard title="Servicios" titleSx={{ textAlign: "center" }}>
        <Container>
          {servicesError && (
            <Grid item>
              <br />
              <Alert severity="error">{servicesError.message}</Alert>
            </Grid>
          )}
          {isLoadingServices && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {!servicesError && servicesList && (
            <ServicesTable
              rows={servicesList}
              showSearch
              searchTerm={searchTerm}
              onSearchTerm={setSearchTerm}
            />
          )}
        </Container>
      </MainCard>
    </>
  );
}
export default AllServices;
