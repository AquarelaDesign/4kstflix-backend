import express from "express";
import asyncHandler from "express-async-handler";
import { handleValidationErrors } from "../util/validation.mjs";
import {
  findAll,
  getToken,
  validateSignup,
} from "../controllers/usersController.mjs";

const router = express.Router();

router.get(
  "/",
  asyncHandler((req, res) => findAll(req, res))
);

router.post(
  "/signup",
  validateSignup,
  handleValidationErrors,
  asyncHandler((req, res) => getToken(req, res))
);

export default router;
