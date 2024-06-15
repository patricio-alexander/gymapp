import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { changePrice, currentPrice } from "../controllers/priceController.js";

const router = express.Router();

router
    .get("/currentPrice", currentPrice)
    .put("/changePrice", changePrice);

export default router;
