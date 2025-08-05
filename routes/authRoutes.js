import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// Registration route with debug logging
router.post("/register", (req, res, next) => {
  console.log("📩 Received registration body:", req.body);
  register(req, res, next);
});

router.post("/login", login);

export default router;