import {
  addCustomerInDb,
  getAllCustomersDB,
  deleteCustomerInDB,
  updateCustomerInDB,
  searchCustomerInDB,
  getOneCustomerFromDb,
  getCurrentPriceFromDb
  
} from "../database/db.js";

const serviceAddCustomer = async (customerData) => {
  const customer = await addCustomerInDb(customerData);
  return customer;
};

const serviceGetCurrentPrice = async () => {
  const currenPrice = await getCurrentPriceFromDb();
  return currenPrice;
}

const serviceGetOneCustomer = async (customerId) => {
  const customer = await getOneCustomerFromDb(customerId);
  return customer; 
}

const serviceSearchCustomer = async (search, page, limit) => {
  const customerFound = await searchCustomerInDB(search, page, limit);
  return customerFound;
};

const serviceGetAllCustomers = async (page, limit) => {
  const customer = await getAllCustomersDB(page, limit);
  return customer;
};

const serviceUpdateCustomerData = async (updateDateCustomer, customerId) => {
  const customer = await updateCustomerInDB(updateDateCustomer, customerId);
  return customer;
};

const serviceDeleteCustomer = async (customerId) => {
  const customer = await deleteCustomerInDB(customerId);
  return customer;
};

export {
  serviceAddCustomer,
  serviceGetAllCustomers,
  serviceUpdateCustomerData,
  serviceDeleteCustomer,
  serviceSearchCustomer,
  serviceGetOneCustomer,
  serviceGetCurrentPrice
};
