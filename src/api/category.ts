import express from "express";
import CategoryService from "../services/category";

export const categoryRouter = express.Router();

categoryRouter.get("/", async (req, res) => {
  const data = await CategoryService.getAll();
  res.json({
    status: true,
    content: {
      data,
    },
  });
});
