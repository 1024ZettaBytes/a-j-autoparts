import axios from "axios";
import { API_ROUTES } from "./constants";
import { refreshData } from "./useRequest";
export async function saveUsedProduct(productData) {
  try {
    const res = await axios.post(
      API_ROUTES.ALL_USED_PRODUCT_API,
      JSON.stringify(productData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    refreshData(API_ROUTES.ALL_SERVICES_API + "/" + productData.service);
    return { error: false, msg: res.data.msg };
  } catch (err) {
    return {
      error: true,
      msg:
        err?.response?.data?.errorMsg ||
        "Error al agregar la refacción. Por favor intente de nuevo.",
    };
  }
}
