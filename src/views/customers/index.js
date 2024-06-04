import { Button, Container, Grid } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import CustomersTable from "ui-component/customers/CustomersTable";
import NextBreadcrumbs from "ui-component/reusables/BreadCrums";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import AddCustomerModal from "ui-component/reusables/AddCustomerModal";

export default function AllCustomers() {
  const paths = [
    { path: "", text: "Inicio" },
    { path: "customers", text: "Clientes" },
  ];
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [customersList, setCustomersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleCloseCustomer = () => {
    setModalIsOpen(false);
  };

  const fetchData = async () => {
    // Set loading state to indicate data fetching in progress
    /*try {
      const response = await getAllCustomers();
      console.log("Response ->", response); // Replace with your actual function
      setCustomersList(response); // Assuming your function returns an object with a "data" property
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false); // Reset loading state after data retrieval
    }*/
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <NextBreadcrumbs sx={{ margin: 1 }} paths={paths} lastLoaded={true} />
      <MainCard title="Clientes" titleSx={{ textAlign: "center" }}>
        <Container>
          <CustomersTable />
          <Grid item textAlign="end" lg={8}>
            <Button
              startIcon={<AddIcon />}
              size="medium"
              variant="contained"
              sx={{ marginTop: 1 }}
              onClick={() => {
                setModalIsOpen(true);
              }}
            >
              Nuevo
            </Button>
          </Grid>
        </Container>
      </MainCard>
      {modalIsOpen && (
        <AddCustomerModal
          open={modalIsOpen}
          handleOnClose={handleCloseCustomer}
        />
      )}
    </>
  );
}
