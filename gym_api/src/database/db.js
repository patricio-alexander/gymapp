import pool from "mysql2/promise";

const connection = pool.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "ironFitness",
});

const getAllCustomersDB = async () => {
  const [customerData] = await connection.query("SELECT * FROM customers");

  return { items: customerData };
};

const getOneCustomerFromDb = async (customerId) => {
  const [getOneCustomer] = await connection.query(
    "SELECT * FROM customers WHERE customerId = ?",
    [customerId]
  );
  return getOneCustomer;
};

const getCurrentPriceFromDb = async () => {
  const [currentPrice] = await connection.query(
    "SELECT currentPrice FROM price"
  );
  return currentPrice;
};

const changePriceInDb = async ({ price }) => {
  const [rows] = await connection.query(
    "UPDATE price SET currentPrice = ? WHERE id = 1",
    [price]
  );
  return rows;
};

const userFound = async ({ username }) => {
  const [[user]] = await connection.query(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );
  return user;
};

const searchCustomerInDB = async (search, page, limit) => {
  const skips = (page - 1) * limit;
  const [totalCustomerFound] = await connection.query(
    "SELECT COUNT(customerId) as totalCustomers FROM customers WHERE fullname LIKE ? OR startDate LIKE ?",
    [`%${search}%`, `%${search}%`]
  );
  const [customerFound] = await connection.query(
    "SELECT * FROM customers WHERE dni LIKE ? LIMIT ?, ?",
    [`%${search}%`, skips, limit]
  );
  const totalCustomers = totalCustomerFound[0].totalCustomers;
  const totalPages = Math.ceil(totalCustomers / limit);

  return { totalPages, totalCustomers, items: customerFound };
};

const customerExistInDb = async (dni) => {
  const [existCustomer] = await connection.query(
    "SELECT COUNT(customerId) as existCustomer FROM customers WHERE dni = ?",
    [dni]
  );
  return existCustomer[0].existCustomer;
};

const addCustomerInDb = async (customerData) => {
  const {
    dni,
    names,
    lastnames,
    startDate,
    endingDate,
    duration,
    amount,
    phone,
    photo,
  } = customerData;

  const existCustomer = await customerExistInDb(dni);

  if (existCustomer) return { existCustomer };

  const [rows] = await connection.query(
    "INSERT INTO customers (dni, names, phone, lastnames, fullname, startDate, endingDate, duration, amount, photo) VALUES (?, ?, ?, ?, CONCAT(?, ' ', ? ), ?, ?, ?, ?, ?)",
    [
      dni,
      names,
      phone,
      lastnames,
      names,
      lastnames,
      startDate,
      endingDate,
      duration.toString(),
      amount,
      photo,
    ]
  );
  return { existCustomer };
};

const updateCustomerInDB = async (updateDataClient, customerId) => {
  const {
    dni,
    names,
    lastnames,
    startDate,
    endingDate,
    duration,
    amount,
    phone,
  } = updateDataClient;

  const [rows] = await connection.query(
    "UPDATE customers SET dni = ?, names = ?, lastnames = ?, fullname = CONCAT(?, ' ', ?), startDate = ?, endingDate = ?, phone = ?, duration = ?, amount = ?  WHERE customerId = ?",
    [
      dni,
      names,
      lastnames,
      names,
      lastnames,
      startDate,
      endingDate,
      phone,
      duration.toString(),
      amount,
      customerId,
    ]
  );
  return rows;
};

const deleteCustomerInDB = async (customerId) => {
  const [rows] = await connection.query(
    "DELETE FROM customers WHERE customerId = ?",
    [customerId]
  );
  return rows;
};

export {
  getAllCustomersDB,
  addCustomerInDb,
  updateCustomerInDB,
  deleteCustomerInDB,
  searchCustomerInDB,
  getOneCustomerFromDb,
  getCurrentPriceFromDb,
  userFound,
  changePriceInDb,
};
