import axios from "axios";
import { API_ROUTES } from "./constants";
import { refreshData } from "./useRequest";
export async function saveWork(workData) {
  try {
    const res = await axios.post(
      API_ROUTES.ALL_WORKS_API,
      JSON.stringify(workData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    refreshData(API_ROUTES.ALL_SERVICES_API + "/" + workData.service);
    return { error: false, msg: res.data.msg };
  } catch (err) {
    return {
      error: true,
      msg:
        err?.response?.data?.errorMsg ||
        "Error al guardar el trabajo. Por favor intente de nuevo.",
    };
  }
}
