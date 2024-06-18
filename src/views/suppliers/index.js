import { Button, Container, Grid } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import NextBreadcrumbs from "ui-component/reusables/BreadCrums";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import SuppliersTable from "ui-component/suppliers/SuppliersTable";
import AddSupplierModal from "ui-component/reusables/AddSupplierModal";
import { enqueueSnackbar } from "notistack";

export default function AllSuppliers() {
  const paths = [
    { path: "", text: "Inicio" },
    { path: "suppliers", text: "Proveedores" },
  ];
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleCloseModal = (addedRecord, successMessage = null) => {
    setModalIsOpen(false);
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
      <NextBreadcrumbs sx={{ margin: 1 }} paths={paths} lastLoaded={true} />
      <MainCard title="Proveedores" titleSx={{ textAlign: "center" }}>
        <Container>
          <SuppliersTable showSearch />
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
        <AddSupplierModal open={modalIsOpen} handleOnClose={handleCloseModal} />
      )}
    </>
  );
}
