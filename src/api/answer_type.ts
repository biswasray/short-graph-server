import express from "express";
import AnswerTypeService from "../services/answer_type";

export const answerTypeRouter = express.Router();

answerTypeRouter.get("/", async (req, res) => {
  const data = await AnswerTypeService.getAll();
  res.json({
    status: true,
    content: {
      data,
    },
  });
});
