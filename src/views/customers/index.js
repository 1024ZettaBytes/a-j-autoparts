import { Button, Container, Grid } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import CustomersTable from "ui-component/customers/CustomersTable";
import NextBreadcrumbs from "ui-component/reusables/BreadCrums";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import AddCustomerModal from "ui-component/reusables/AddCustomerModal";
import { enqueueSnackbar } from "notistack";

export default function AllCustomers() {
  const paths = [
    { path: "", text: "Inicio" },
    { path: "customers", text: "Clientes" },
  ];
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleCloseCustomer = (addedCustomer, successMessage = null) => {
    setModalIsOpen(false);
    if (addedCustomer && successMessage) {
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
      <NextBreadcrumbs sx={{ margin: 1 }} paths={paths} lastLoaded={true} />
      <MainCard title="Clientes" titleSx={{ textAlign: "center" }}>
        <Container>
          <CustomersTable showSearch />
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
