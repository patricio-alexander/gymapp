import express from "express";
import {
  getAllCustomers,
  addCustomer,
  deleteCustomer,
  updateCustomerData,
  searchCustomer,
  getOneCustomer,
  currentPrice,
} from "../controllers/customerController.js";
import {
  removePhoto,
  upload,
  uploadUpdatePhoto,
} from "../middlewares/uploadMiddleware.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();
router
  .get("/", isAuthenticated, getAllCustomers)
  .get("/search", isAuthenticated, searchCustomer)
  .get("/currentPrice", currentPrice)
  .get("/:customerId", isAuthenticated, getOneCustomer)
  .put("/:customerId", isAuthenticated, uploadUpdatePhoto, updateCustomerData)
  .delete("/:customerId", isAuthenticated, removePhoto, deleteCustomer)
  .post("/", isAuthenticated, upload, addCustomer);

export default router;
