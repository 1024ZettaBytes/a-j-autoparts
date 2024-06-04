import useSWR, { mutate } from "swr";
import { API_ROUTES } from "./constants";
const noRefreshOptions = {
  revalidateOnMount: true,
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
};
export const refreshData = async (apiUrl) => {
  await mutate(apiUrl);
};
async function errorHandler(res) {
  if (!res.ok) {
    const errorBody = await res?.json();
    const error = new Error(errorBody?.errorMsg);
    throw error;
  }
}
export const getFetcher = async (url) => {
  const res = await fetch(url).catch((err) => {
    return {
      json: () => {
        return {
          ok: false,
          errorMsg:
            "Hubo un problema de conexión. Si persiste contacte al administrador.",
        };
      },
    };
  });
  await errorHandler(res);
  return res.json();
};
// Customers
export const useGetCustomerTypes = (fetcher, noRefresh = false) => {
  const { data, error, isLoading } = useSWR(
    API_ROUTES.ALL_CUSTOMER_TYPES_API,
    fetcher,
    noRefresh ? noRefreshOptions : {}
  );
  return {
    typesList: data?.data,
    typesError: error,
    isLoadingTypes: isLoading,
  };
};

export const useGetAllCustomers = (fetcher, noRefresh = false) => {
  const { data, error, isLoading } = useSWR(
    API_ROUTES.ALL_CUSTOMERS_API,
    fetcher,
    noRefresh ? noRefreshOptions : {}
  );
  return {
    customersList: data?.data,
    customersError: error,
    isLoadingCustomers: isLoading,
  };
};

export const useGetAllCustomersNonDetail = (fetcher, noRefresh = false) => {
  const { data, error, isLoading } = useSWR(
    API_ROUTES.ALL_CUSTOMERS_NON_DETAIL_API,
    fetcher,
    noRefresh ? noRefreshOptions : {}
  );
  return {
    customersList: data?.data,
    customersError: error,
    isLoadingCustomers: isLoading,
  };
};

// Vehicles
export const useGetAllVehicles = (
  fetcher,
  searchTerm,
  forService = false,
  noRefresh = false
) => {
  const search =
    searchTerm && searchTerm !== "" ? `searchTerm=${searchTerm.trim()}` : "";
  let apiUrl = forService
    ? API_ROUTES.ALL_VEHICLES_FOR_SERVICE_API +
      (search !== "" ? `&${search}` : "")
    : API_ROUTES.ALL_VEHICLES_API + `?${search}`;

  const { data, error, isLoading } = useSWR(
    apiUrl,
    fetcher,
    noRefresh ? noRefreshOptions : {}
  );
  return {
    vehiclesList: data?.data,
    vehiclesError: error,
    isLoadingVehicles: isLoading,
  };
};
export const useGetVehiclesCatalog = (
  shouldFetch,
  fetcher,
  year,
  make,
  noRefresh = false
) => {
  let apiUrl = API_ROUTES.ALL_VEHICLES_CATALOG_API;
  if (year) apiUrl += "?year=" + year;
  if (make) apiUrl += "&make=" + make;
  const { data, error, isLoading } = useSWR(
    shouldFetch ? apiUrl : null,
    fetcher,
    noRefresh ? noRefreshOptions : {}
  );
  return {
    yearList: data?.data,
    makeList: data?.data,
    modelList: data?.data,
    yearError: error,
    makeError: error,
    modelError: error,
    isLoadingYears: isLoading,
    isLoadingMakes: isLoading,
    isLoadingModels: isLoading,
  };
};

export const useGetCustomerById = (fetcher, id) => {
  const { data, error } = useSWR(
    id ? API_ROUTES.CUSTOMER_BY_ID_API.replace(":id", id) : null,
    fetcher
  );
  return { customer: data?.data, customerByIdError: error };
};
// Services
export const useGetAllServices = (
  fetcher,
  searchTerm,
  byCustomerId = null,
  noRefresh = false
) => {
  const search =
    searchTerm && searchTerm !== "" ? `searchTerm=${searchTerm.trim()}` : "";
  let apiUrl = byCustomerId
    ? API_ROUTES.ALL_SERVICES_API + `?customerId=${byCustomerId}&${search}`
    : API_ROUTES.ALL_SERVICES_API + `?${search}`;

  const { data, error, isLoading } = useSWR(
    apiUrl,
    fetcher,
    noRefresh ? noRefreshOptions : {}
  );
  return {
    servicesList: data?.data,
    servicesError: error,
    isLoadingServices: isLoading,
  };
};

export const useGetServiceById = (fetcher, serviceId, noRefresh = false) => {
  const { data, error, isLoading } = useSWR(
    `${API_ROUTES.ALL_SERVICES_API}/${serviceId}`,
    fetcher,
    noRefresh ? noRefreshOptions : {}
  );
  return {
    serviceData: data?.data,
    serviceError: error,
    isLoadingService: isLoading,
  };
};
// Works
export const useGetAllWorks = (
  fetcher,
  searchTerm,
  byCustomerId = null,
  noRefresh = false
) => {
  const search =
    searchTerm && searchTerm !== "" ? `searchTerm=${searchTerm.trim()}` : "";
  let apiUrl = byCustomerId
    ? API_ROUTES.ALL_SERVICES_API + `?customerId=${byCustomerId}&${search}`
    : API_ROUTES.ALL_SERVICES_API + `?${search}`;

  const { data, error, isLoading } = useSWR(
    apiUrl,
    fetcher,
    noRefresh ? noRefreshOptions : {}
  );
  return {
    servicesList: data?.data,
    servicesError: error,
    isLoadingServices: isLoading,
  };
};
// Inventory
export const useGetAllProducts = (
  fetcher,
  searchTerm,
  noRefresh = false
) => {
  const search =
    searchTerm && searchTerm !== "" ? `?searchTerm=${searchTerm.trim()}` : "";

  const { data, error, isLoading } = useSWR(
    API_ROUTES.ALL_INVENTORY_API + search,
    fetcher,
    noRefresh ? noRefreshOptions : {}
  );
  return {
    productsList: data?.data,
    productsError: error,
    isLoadingProducts: isLoading,
  };
};
