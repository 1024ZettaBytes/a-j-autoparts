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

export async function updateService(serviceData) {
  try {
    const res = await axios.put(
      API_ROUTES.ALL_SERVICES_API,
      JSON.stringify(serviceData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    refreshData(API_ROUTES.ALL_SERVICES_API);
    refreshData(`${API_ROUTES.ALL_SERVICES_API}/${serviceData.id}`);
    return { ...res.data, error: false };
  } catch (err) {
    return {
      error: true,
      msg:
        err?.response?.data?.errorMsg ||
        "Error al actualizar el servicio. Por favor intente de nuevo.",
    };
  }
}
export async function saveServiceAttachment(attachment, serviceId) {
  try {
    const data = new FormData();
    data.append("file", attachment);
    const res = await axios.post(
      API_ROUTES.SERVICES__ATTACHMENT_API.replace(":id", serviceId),
      data,
      {
        headers: {
          Accept: "application/json ,text/plain, */*",
          "Content-Type": "multipart/form-data",
        },
      }
    );
    refreshData(`${API_ROUTES.ALL_SERVICES_API}/${serviceId}`);
    return { error: false, msg: res.data.msg };
  } catch (err) {
    return {
      error: true,
      msg:
        err?.response?.data?.errorMsg ||
        "Error al guardar la imagen. Por favor intente de nuevo.",
    };
  }
}
