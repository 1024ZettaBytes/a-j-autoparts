import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
import { element } from "prop-types";

// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import("views/dashboard/Default"))
);
// servicies routing
const NewService = Loadable(lazy(() => import("views/services/New")));
const AllServicies = Loadable(lazy(() => import("views/services")));
const ByServiceId = Loadable(lazy(() => import("views/services/ByServiceId")));

// Customers routing
const AllCustomers = Loadable(lazy(() => import("views/customers")));
const ByCustomerId = Loadable(
  lazy(() => import("views/customers/ByCustomerId"))
);

// Vehicles routing
const AllVehicles = Loadable(lazy(() => import("views/vehicles")));
const ByVehicleId = Loadable(lazy(() => import("views/vehicles/ByVehicleId")));

// Suppliers routing
const AllSuppliers = Loadable(lazy(() => import("views/suppliers")));
const BySupplierId = Loadable(
  lazy(() => import("views/suppliers/BySupplierId"))
);

// Inventory routing
const Inventory = Loadable(lazy(() => import("views/inventory")));

// utilities routing

const UtilsColor = Loadable(lazy(() => import("views/utilities/Color")));
const UtilsShadow = Loadable(lazy(() => import("views/utilities/Shadow")));
const UtilsMaterialIcons = Loadable(
  lazy(() => import("views/utilities/MaterialIcons"))
);
const UtilsTablerIcons = Loadable(
  lazy(() => import("views/utilities/TablerIcons"))
);

// sample page routing
const SamplePage = Loadable(lazy(() => import("views/sample-page")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <DashboardDefault />,
    },
    {
      path: "dashboard",
      children: [
        {
          path: "default",
          element: <DashboardDefault />,
        },
      ],
    },
    {
      path: "new-service",
      element: <NewService />,
    },
    {
      path: "services",
      children: [
        { path: "", element: <AllServicies /> },
        { path: ":id", index: true, element: <ByServiceId /> },
      ],
    },
    {
      path: "customers",
      children: [
        { path: "", element: <AllCustomers /> },
        { path: ":id", index: true, element: <ByCustomerId /> },
      ],
    },

    {
      path: "vehicles",
      children: [
        { path: "", element: <AllVehicles /> },
        { path: ":id", index: true, element: <ByVehicleId /> },
      ],
    },

    {
      path: "suppliers",
      children: [
        { path: "", element: <AllSuppliers /> },
        { path: ":id", index: true, element: <BySupplierId /> },
      ],
    },
    {
      path: "inventory",
      children: [
        { path: "", element: <Inventory /> },
        { path: ":id", index: true, element: <BySupplierId /> },
      ],
    },
    {
      path: "utils",
      children: [
        {
          path: "util-color",
          element: <UtilsColor />,
        },
      ],
    },
    {
      path: "utils",
      children: [
        {
          path: "util-shadow",
          element: <UtilsShadow />,
        },
      ],
    },
    {
      path: "icons",
      children: [
        {
          path: "tabler-icons",
          element: <UtilsTablerIcons />,
        },
      ],
    },
    {
      path: "icons",
      children: [
        {
          path: "material-icons",
          element: <UtilsMaterialIcons />,
        },
      ],
    },
    {
      path: "sample-page",
      element: <SamplePage />,
    },
  ],
};

export default MainRoutes;
