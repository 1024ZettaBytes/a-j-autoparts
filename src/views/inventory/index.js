import {
  Box,
  Button,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
  styled,
} from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import NextBreadcrumbs from "ui-component/reusables/BreadCrums";
import InventoryTable from "ui-component/inventory/InventoryTable";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import AddProductModal from "ui-component/reusables/AddProductModal";
import InventoryEntriesTable from "ui-component/inventory/InventoryEntriesTable";
import InventoryIssuesTable from "ui-component/inventory/InventoryIssuesTable";
import AddEntryModal from "ui-component/reusables/AddEntryModal";
import { enqueueSnackbar } from "notistack";

function Inventory() {
  const tabs = [
    { value: "inv", label: "Lista de Inventario" },
    { value: "ent", label: "Entradas" },
    { value: "iss", label: "Salidas" },
  ];
  const [currentTab, setCurrentTab] = useState("inv");

  const handleTabsChange = (_event, value) => {
    setCurrentTab(value);
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const paths = [
    { path: "", text: "Inicio" },
    { path: "inventory", text: "Inventario" },
  ];
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
 
  const issuesRows = [
    {
      code: "FRE-BAR-350",
      name: "Líquido Frenos Bardahl 350ml",
      qty: 2,
      billed: "$400.00",
      date: "05/05/2024",
    },
  ];
  return (
    <>
      <NextBreadcrumbs sx={{ margin: 1 }} paths={paths} lastLoaded={true} />
      <MainCard title="Inventario" titleSx={{ textAlign: "center" }}>
        <Grid container>
          <Grid item lg={12}>
            <Tabs
              onChange={handleTabsChange}
              value={currentTab}
              variant="fullWidth"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
              centered
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
          </Grid>
          {currentTab === "inv" && (
            <>
              <Grid item textAlign="end" lg={12}>
                <InventoryTable showSearch />
              </Grid>
              <Grid item textAlign="end" lg={12}>
                <Button
                  startIcon={<AddIcon />}
                  size="medium"
                  variant="contained"
                  sx={{ marginTop: 1 }}
                  onClick={() => {
                    setModalType("PRODUCT");
                    setModalIsOpen(true);
                  }}
                >
                  Nuevo Producto/Pieza
                </Button>
              </Grid>
            </>
          )}
          {currentTab === "ent" && (
            <>
              <Grid item lg={12}>
                <InventoryEntriesTable showSearch />
              </Grid>
              <Grid item textAlign="end" lg={12}>
                <Button
                  startIcon={<PlaylistAddOutlinedIcon />}
                  size="medium"
                  variant="contained"
                  color="secondary"
                  sx={{ marginTop: 1 }}
                  onClick={() => {
                    setModalType("ENTRY");
                    setModalIsOpen(true);
                  }}
                >
                  Registrar Entrada
                </Button>
              </Grid>
            </>
          )}
          {currentTab === "iss" && (
            <Grid item lg={12}>
              <InventoryIssuesTable rows={issuesRows} showSearch />
            </Grid>
          )}
        </Grid>
      </MainCard>
      {modalIsOpen && modalType === "PRODUCT" && (
        <AddProductModal open={modalIsOpen} handleOnClose={handleCloseModal} />
      )}
      {modalIsOpen && modalType === "ENTRY" && (
        <AddEntryModal open={modalIsOpen} handleOnClose={handleCloseModal} />
      )}
    </>
  );
}
export default Inventory;
