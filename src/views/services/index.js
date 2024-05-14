import { Container } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import ServicesTable from "ui-component/services/ServicesTable";
import SecondaryAction from "ui-component/cards/CardSecondaryAction";
import NextBreadcrumbs from "ui-component/reusables/BreadCrums";

function AllServices() {
  const paths = [
    { path: "", text: "Inicio" },
    { path: "services", text: "Servicios" },
  ];
  function createData(status, customer, vehicle, billed, date) {
    return { status, customer, vehicle, billed, date };
  }
  
  const rows = [
    createData(
      "IN_PROGRESS",
      "Eduardo Ramirez",
      "Sentra-2023",
      "$1,500.00",
      "02/05/2024"
    ),
    createData(
      "IN_PROGRESS",
      "Juan Pérez",
      "Ranger-2001",
      "$2,500.00",
      "01/05/2024"
    ),
    createData("CANCELED", "Pedro López", "Civic-2015", "$500.00", "29/04/2024"),
    createData(
      "COMPLETED",
      "Maria Hernández",
      "Accord-2019",
      "$950.00",
      "25/04/2024"
    ),
  ];
  return (
    <>
      <NextBreadcrumbs sx={{ margin: 1 }} paths={paths} lastLoaded={true} />
      <MainCard title="Servicios" titleSx={{ textAlign: "center" }}>
        <Container>
          <ServicesTable rows={rows} showSearch />
        </Container>
      </MainCard>
    </>
  );
}
export default AllServices;
