import axios from "./axios.js";

export const getCustomersRequest = async (page) =>
  await axios.get("/customers", {
    params: { page, limit: 7 },
  });

export const getOneCustomerRequest = async (customerId) =>
  await axios.get(`/customers/${customerId}`);

export const searchCustomerRequest = async (search, page) =>
  await axios.get("/customers/search", {
    params: { page, search, limit: 7 },
  });

export const addCustomerRequest = async (data) =>
  await axios.post("/customers", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const removeCustomerRequest = async (customerId) =>
  await axios.delete(`/customers/${customerId}`);

export const updataCustomerDataRequest = async (customerData, customerId) =>
  await axios.put(
    `/customers/${customerId}`,
    customerData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

export const getCurrentPriceRequest = async () =>
  await axios.get("/customers/currentPrice");

export const loginRequest = async (data) =>
  await axios.post("/login", data);


export const verifyTokenRequest = async(token) => await axios.get("/auth/verify")