import axios from "axios";
import { API_ROUTES } from "./constants";
import { refreshData } from "./useRequest";
export async function saveVehicle(vehicleData) {
  try {
    const res = await axios.post(
      API_ROUTES.ALL_VEHICLES_API,
      JSON.stringify(vehicleData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    refreshData(API_ROUTES.ALL_VEHICLES_API);
    refreshData(API_ROUTES.ALL_VEHICLES_API + "?");
    refreshData(API_ROUTES.ALL_VEHICLES_FOR_SERVICE_API);
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

export async function updateVehicle(vehicleData) {
  try {
    const res = await axios.put(
      API_ROUTES.ALL_VEHICLES_API,
      JSON.stringify(vehicleData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    refreshData(API_ROUTES.ALL_VEHICLES_API + `/${vehicleData.VIN}`);
    refreshData(API_ROUTES.ALL_VEHICLES_API);
    refreshData(API_ROUTES.ALL_VEHICLES_FOR_SERVICE_API);
    return { error: false, msg: res.data.msg };
  } catch (err) {
    return {
      error: true,
      msg:
        err?.response?.data?.errorMsg ||
        "Error al actualizar el vehículo. Por favor intente de nuevo.",
    };
  }
}
