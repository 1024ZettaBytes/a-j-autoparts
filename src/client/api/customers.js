import axios from "axios";
import { API_ROUTES } from "./constants";
import { refreshData } from "./useRequest";
export async function saveCustomer(customerData) {
  try {
    const res = await axios.post(
      API_ROUTES.ALL_CUSTOMERS_API,
      JSON.stringify(customerData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    refreshData(API_ROUTES.ALL_CUSTOMERS_API);
    refreshData(API_ROUTES.ALL_CUSTOMERS_API+"?nondetail=true");
    return { error: false, msg: res.data.msg };
  } catch (err) {
    return {
      error: true,
      msg:
        err?.response?.data?.errorMsg ||
        "Error al guardar el cliente. Por favor intente de nuevo.",
    };
  }
}
