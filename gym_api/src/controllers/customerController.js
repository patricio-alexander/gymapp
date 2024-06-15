import {
  serviceGetAllCustomers,
  serviceAddCustomer,
  serviceUpdateCustomerData,
  serviceDeleteCustomer,
  serviceSearchCustomer,
  serviceGetOneCustomer,
} from "../services/clientService.js";

// import { unlink, readdir } from "fs/promises";
// import fileDirName from "../file-dir-name.js";
// import { join } from "path";

// const { __dirname } = fileDirName(import.meta);



const searchCustomer = async (req, res) => {
  const { search, page, limit } = req.query;
  const customerFound = await serviceSearchCustomer(
    search,
    parseInt(page, 10),
    parseInt(limit, 10)
  );
  res.json(customerFound);
};



const getOneCustomer = async (req, res) => {
  const customer = await serviceGetOneCustomer(req.params.customerId);
  res.json(customer);
};

const getAllCustomers = async (req, res) => {

  const data = await serviceGetAllCustomers( );
  // console.log(page, limit);
  res.json(data);
};

const addCustomer = async (req, res) => {
  const customerData = {
    ...req.body,
    photo: req.file.filename,
  };

  const customer = await serviceAddCustomer(customerData);
  res.json(customer);
};

const updateCustomerData = async (req, res) => {
  const customer = await serviceUpdateCustomerData(
    req.body,
    req.params.customerId
  );

  res.json(customer);
};

const deleteCustomer = async (req, res) => {
  const customer = await serviceDeleteCustomer(req.params.customerId);

  res.json(customer);
};

export {
  getAllCustomers,
  addCustomer,
  updateCustomerData,
  deleteCustomer,
  searchCustomer,
  getOneCustomer,
};
