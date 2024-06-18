import axios from "axios";
import { API_ROUTES } from "./constants";
import { refreshData } from "./useRequest";
export async function saveProduct(productData) {
  try {
    const res = await axios.post(
      API_ROUTES.ALL_INVENTORY_API,
      JSON.stringify(productData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    refreshData(API_ROUTES.ALL_INVENTORY_API);
    return { error: false, msg: res.data.msg };
  } catch (err) {
    return {
      error: true,
      msg:
        err?.response?.data?.errorMsg ||
        "Error al guardar el producto. Por favor intente de nuevo.",
    };
  }
}

export async function saveProductEntry(entryData) {
  try {
    const res = await axios.post(
      API_ROUTES.ALL_INVENTORY_ENTRIES_API,
      JSON.stringify(entryData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    refreshData(API_ROUTES.ALL_INVENTORY_API);
    refreshData(API_ROUTES.ALL_INVENTORY_ENTRIES_API);
    return { error: false, msg: res.data.msg };
  } catch (err) {
    return {
      error: true,
      msg:
        err?.response?.data?.errorMsg ||
        "Error al guardar la entrada de producto. Por favor intente de nuevo.",
    };
  }
}
