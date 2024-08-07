import express from "express";
import asyncHandler from "express-async-handler";

import { getContent, getGender } from "../controllers/contentController.mjs";

const router = express.Router();

router.get(
  "/gender/:type",
  asyncHandler((req, res) => getGender(req, res))
);

router.get(
  "/:contentId/:genres?",
  asyncHandler((req, res) => getContent(req, res))
);

export default router;
