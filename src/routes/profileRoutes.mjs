import express from "express";
import asyncHandler from "express-async-handler";

import {
  create,
  getProfiles,
  deleteProfile,
} from "../controllers/profileController.mjs";

const router = express.Router();

router.post(
  "/",
  asyncHandler((req, res) => create(req, res))
);
router.get(
  "/:userId",
  asyncHandler((req, res) => getProfiles(req, res))
);
router.delete(
  "/:profileId",
  asyncHandler((req, res) => deleteProfile(req, res))
);

export default router;
