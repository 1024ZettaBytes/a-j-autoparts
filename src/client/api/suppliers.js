import axios from "axios";
import { API_ROUTES } from "./constants";
import { refreshData } from "./useRequest";
export async function saveSupplier(supplierData) {
  try {
    const res = await axios.post(
      API_ROUTES.ALL_SUPPLIERS_API,
      JSON.stringify(supplierData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    refreshData(API_ROUTES.ALL_SUPPLIERS_API);
    refreshData(API_ROUTES.ALL_SUPPLIERS_NO_DETAIL_API);
    return { error: false, msg: res.data.msg };
  } catch (err) {
    return {
      error: true,
      msg:
        err?.response?.data?.errorMsg ||
        "Error al guardar el proveedor. Por favor intente de nuevo.",
    };
  }
}

export async function updateSupplier(supplierData) {
  try {
    const res = await axios.put(
      API_ROUTES.ALL_SUPPLIERS_API,
      JSON.stringify(supplierData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    refreshData(API_ROUTES.ALL_SUPPLIERS_API + `/${supplierData.id}`);
    refreshData(API_ROUTES.ALL_SUPPLIERS_API);
    refreshData(API_ROUTES.ALL_SUPPLIERS_NO_DETAIL_API);
    return { error: false, msg: res.data.msg };
  } catch (err) {
    return {
      error: true,
      msg:
        err?.response?.data?.errorMsg ||
        "Error al actualizar el proveedor. Por favor intente de nuevo.",
    };
  }
}
