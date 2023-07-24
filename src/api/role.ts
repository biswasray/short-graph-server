import express from "express";
import RoleService from "../services/role";

export const roleRouter = express.Router();

roleRouter.get("/", async (req, res) => {
  const data = await RoleService.getAll();
  res.json({
    status: true,
    content: {
      data,
    },
  });
});
