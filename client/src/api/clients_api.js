import axios from "./axios.js";

export const getOneCustomerRequest = async (customerId) =>
  await axios.get(`/customers/${customerId}`);

export const getCustomers = async () => await axios.get("/customers");

export const addCustomerRequest = async (data) =>
  await axios.post("/customers", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const removeCustomerRequest = async (customerId) =>
  await axios.delete(`/customers/${customerId}`);

export const updataCustomerDataRequest = async (customerData, customerId) =>
  await axios.put(`/customers/${customerId}`, customerData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getCurrentPriceRequest = async () =>
  await axios.get("/price/currentPrice");

export const loginRequest = async (data) => await axios.post("/login", data);

export const changePriceRequest = async (data) =>
  await axios.put("/price/changePrice", data);

export const verifyTokenRequest = async () => await axios.get("/auth/verify");

export const getCustomersRequest = async (page) =>
  await axios.get("/customers", {
    params: { page, limit: 6 },
  });

export const test = () => token;
