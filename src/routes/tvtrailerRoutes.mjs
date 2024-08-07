import express from "express";
import asyncHandler from "express-async-handler";
import getVideos from "../controllers/tvtrailerController.mjs";

const router = express.Router();

router.get(
  "/:id",
  asyncHandler((req, res) => getVideos(req, res))
);

export default router;
