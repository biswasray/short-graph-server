import express from "express";
import UserService from "../services/user";

export const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const data = await UserService.getAll();
  res.json({
    status: true,
    content: {
      data,
    },
  });
});
