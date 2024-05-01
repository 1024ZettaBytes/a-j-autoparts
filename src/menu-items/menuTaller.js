// assets
import { IconClipboardList, IconUser, IconCarGarage, IconTool, IconShoppingCart, IconBuildingWarehouse } from '@tabler/icons-react';

// constant
const icons = {
  IconTool,
  IconClipboardList,
  IconUser,
  IconCarGarage,
  IconShoppingCart,
  IconBuildingWarehouse
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const menuTaller = {
  id: 'utilities',
  title: '',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Nuevo servicio',
      type: 'item',
      url: '/utils/util-typography',
      icon: icons.IconTool,
      breadcrumbs: false
    },
    {
      id: 'util-color',
      title: 'Servicios',
      type: 'item',
      url: '/utils/util-color',
      icon: icons.IconClipboardList,
      breadcrumbs: false
    },
    {
      id: 'util-shadow',
      title: 'Clientes',
      type: 'item',
      url: '/utils/util-shadow',
      icon: icons.IconUser,
      breadcrumbs: false
    },
    {
      id: 'util-shadow',
      title: 'Vehículos',
      type: 'item',
      url: '/utils/util-shadow',
      icon: icons.IconCarGarage,
      breadcrumbs: false
    },
    {
      id: 'util-shadow',
      title: 'Proveedores',
      type: 'item',
      url: '/utils/util-shadow',
      icon: icons.IconShoppingCart,
      breadcrumbs: false
    },
    {
      id: 'util-shadow',
      title: 'Inventario',
      type: 'item',
      url: '/utils/util-shadow',
      icon: icons.IconBuildingWarehouse,
      breadcrumbs: false
    },
  ]
};

export default menuTaller;
