import express from "express";
const router = express.Router();

router.get("/token", function (req, res) {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  return res.json({
    message: "success",
  });
});

export default router;
