import { API_URL } from "../../localConst";

export const API_ROUTES = {
  // Customers
  ALL_CUSTOMERS_API: `${API_URL}/customers`,
  ALL_CUSTOMERS_NON_DETAIL_API: `${API_URL}/customers?nondetail=true`,
  ALL_CUSTOMER_TYPES_API: `${API_URL}/customers/types`,
  CUSTOMER_BY_ID_API: "/api/customers/:id",
  // Vehicles
  ALL_VEHICLES_API: `${API_URL}/vehicles`,
  ALL_VEHICLES_FOR_SERVICE_API: `${API_URL}/vehicles?forService=true`,
  ALL_VEHICLES_CATALOG_API: `${API_URL}/vehicles/catalog`,
  // Services
  ALL_SERVICES_API: `${API_URL}/services`,
  // Works
  ALL_WORKS_API: `${API_URL}/works`,
  // Inventory
  ALL_INVENTORY_API: `${API_URL}/inventory`,
  ALL_INVENTORY_EMTRIES_API: `${API_URL}/inventory/entries`,
  ALL_INVENTORY_ISSUES_API: `${API_URL}/inventory/issues`,
