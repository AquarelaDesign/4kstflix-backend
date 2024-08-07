import express from "express";
import asyncHandler from "express-async-handler";
import { check } from "express-validator";
import { handleValidationErrors } from "../util/validation.mjs";
import { getCurrentUser } from "../util/auth.mjs";
import { login, logout } from "../controllers/sessionController.mjs";

const router = express.Router();

const validateLogin = [check("email").exists(), check("password").exists()];

router.get("/", getCurrentUser, function (req, res) {
  return res.json({
    user: req.user || {},
  });
});

router.post(
  "/login",
  validateLogin,
  handleValidationErrors,
  asyncHandler((req, res, next) => login(req, res, next))
);

router.delete(
  "/logout",
  asyncHandler((req, res) => logout(req, res))
);

export default router;
