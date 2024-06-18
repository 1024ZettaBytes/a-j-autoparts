import axios from "axios";
import { API_ROUTES } from "./constants";
import { refreshData } from "./useRequest";
export async function saveReminder(reminderData) {
  try {
    const res = await axios.post(
      API_ROUTES.ALL_SERVICE_REMINDERS_API,
      JSON.stringify(reminderData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    refreshData(API_ROUTES.ALL_SERVICE_REMINDERS_API);
    refreshData(API_ROUTES.VEHICLE_BY_ID.replace(":id", reminderData.vehicle));
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

