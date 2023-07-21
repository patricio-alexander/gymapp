import { Router } from "express";
import { login, verifyToken } from "../controllers/authController.js";

const router = Router();
router
  .post("/login", login)
  // .post("/logout", logout)
  .get("/auth/verify", verifyToken);

export default router;
