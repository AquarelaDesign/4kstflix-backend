import express from "express";
import users from "./usersRoutes.mjs";

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.json({ name: "API 4KSTFlix" });
});

export { routes as default };
