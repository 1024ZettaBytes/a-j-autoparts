// assets
import {
  IconClipboardList,
  IconUser,
  IconCarGarage,
  IconTool,
  IconShoppingCart,
  IconBuildingWarehouse,
} from "@tabler/icons-react";

// constant
const icons = {
  IconTool,
  IconClipboardList,
  IconUser,
  IconCarGarage,
  IconShoppingCart,
  IconBuildingWarehouse,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const menuTaller = {
  id: "menu",
  title: "",
  type: "group",
  children: [
    {
      id: "new-service",
      title: "Nuevo servicio",
      type: "item",
      url: "/new-service",
      icon: icons.IconTool,
      breadcrumbs: false,
    },
    {
      id: "services",
      title: "Servicios",
      type: "item",
      url: "/services",
      icon: icons.IconClipboardList,
      breadcrumbs: false,
    },
    {
      id: "customers",
      title: "Clientes",
      type: "item",
      url: "/customers",
      icon: icons.IconUser,
      breadcrumbs: false,
    },
    {
      id: "vehicles",
      title: "Vehículos",
      type: "item",
      url: "/vehicles",
      icon: icons.IconCarGarage,
      breadcrumbs: false,
    },
    {
      id: "suppliers",
      title: "Proveedores",
      type: "item",
      url: "/suppliers",
      icon: icons.IconShoppingCart,
      breadcrumbs: false,
    },
    {
      id: "inventory",
      title: "Inventario",
      type: "item",
      url: "/inventory",
      icon: icons.IconBuildingWarehouse,
      breadcrumbs: false,
    },
  ],
};

export default menuTaller;
