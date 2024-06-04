import axios from "axios";
import { API_ROUTES } from "./constants";
import { refreshData } from "./useRequest";
export async function saveService(serviceData) {
  try {
    const res = await axios.post(
      API_ROUTES.ALL_SERVICES_API,
      JSON.stringify(serviceData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    refreshData(API_ROUTES.ALL_SERVICES_API);
    return { ...res.data, error: false };
  } catch (err) {
    return {
      error: true,
      msg:
        err?.response?.data?.errorMsg ||
        "Error al guardar el servicio. Por favor intente de nuevo.",
    };
  }
}
