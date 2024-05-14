import { Button, Container, Grid } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import CustomersTable from "ui-component/customers/CustomersTable";
import NextBreadcrumbs from "ui-component/reusables/BreadCrums";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import AddCustomerModal from "ui-component/reusables/AddCustomerModal";
import SuppliersTable from "ui-component/suppliers/SuppliersTable";
import AddSupplierModal from "ui-component/reusables/AddSupplierModal";

export default function AllSuppliers() {
  const paths = [
    { path: "", text: "Inicio" },
    { path: "suppliers", text: "Proveedores" },
  ];
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleCloseSupplier = () => {
    setModalIsOpen(false);
  };
  return (
    <>
      <NextBreadcrumbs sx={{ margin: 1 }} paths={paths} lastLoaded={true} />
      <MainCard title="Proveedores" titleSx={{ textAlign: "center" }}>
        <Container>
          <SuppliersTable />
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
        <AddSupplierModal
          open={modalIsOpen}
          handleOnClose={handleCloseSupplier}
        />
      )}
    </>
  );
}
