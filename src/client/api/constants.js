const API_URL = "https://aj-autoparts-server-test.up.railway.app/api"
export const API_ROUTES = {
  // Customers
  ALL_CUSTOMERS_API: `${API_URL}/customers`,
  ALL_CUSTOMERS_NON_DETAIL_API: `${API_URL}/customers?nondetail=true`,
  ALL_CUSTOMER_TYPES_API: `${API_URL}/customers/types/get`,
  CUSTOMER_BY_ID_API: `${API_URL}/customers/:id`,
  // Vehicles
  ALL_VEHICLES_API: `${API_URL}/vehicles`,
  ALL_VEHICLES_FOR_SERVICE_API: `${API_URL}/vehicles?forService=true`,
  ALL_VEHICLES_CATALOG_API: `${API_URL}/catalogs/vehicles`,
  VEHICLE_BY_ID: `${API_URL}/vehicles/:id`,
  // Services
  ALL_SERVICES_API: `${API_URL}/services`,
  SERVICES__ATTACHMENT_API: `${API_URL}/services/attachment/:id`,
  ALL_USED_PRODUCT_API: `${API_URL}/services/service/usedProduct`,
  // Works
  ALL_WORKS_API: `${API_URL}/works`,
  // Inventory
  ALL_INVENTORY_API: `${API_URL}/inventory`,
  ALL_INVENTORY_ENTRIES_API: `${API_URL}/inventory/entries`,
  ALL_INVENTORY_ISSUES_API: `${API_URL}/inventory/issues`,
  // Suppliers
  ALL_SUPPLIERS_API: `${API_URL}/suppliers`,
  ALL_SUPPLIERS_NO_DETAIL_API: `${API_URL}/suppliers?nondetail=true`,
  // Service Reminders
  ALL_SERVICE_REMINDERS_API: `${API_URL}/service-reminders`,
  // Summary
  SUMMARY_ACTIVE_SERVICES_API: `${API_URL}/summary/activeServices`,
  SUMMARY_REMINDERS_API: `${API_URL}/summary/reminders`,
  SUMMARY_INVENTORY_API: `${API_URL}/summary/inventory`,
}