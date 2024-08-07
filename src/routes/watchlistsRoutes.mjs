import express from "express";
import asyncHandler from "express-async-handler";
import {
  addWatchListById,
  deleteWatchListContent,
  getWatchListById,
} from "../controllers/watchlistsController.mjs";

const router = express.Router();

router.post(
  "/:watchListId",
  asyncHandler((req, res) => addWatchListById(req, res))
);

router.delete(
  "/:contentId",
  asyncHandler((req, res) => deleteWatchListContent(req, res))
);

router.get(
  "/:watchListId",
  asyncHandler((req, res) => getWatchListById(req, res))
);

export default router;
