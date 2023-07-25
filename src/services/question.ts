import { UUID } from "crypto";
import Models, { sequelize } from "../models";
import { IQuestionCreate, IQuestionUpdate } from "../interfaces/question";
import PlatformError from "platform-error";

export default class QuestionService {
  //   static async createBulk() {
  //     const Questions = [
  //       {
  //         desc: "Simple",
  //       },
  //       {
  //         desc: "Interested",
  //       },
  //       {
  //         desc: "Interested in Cement",
  //       },
  //       {
  //         desc: "Not interested in Cement",
  //       },
  //     ];
  //     const transaction = await sequelize.transaction();
  //     for (const Question of Questions) {
  //       await Models("category").Create(Question, { transaction });
  //     }
  //     transaction.commit();
  //     return true;
  //   }
  static async get(id: UUID) {
    const question = await Models("question").FindOne({
      where: {
        isActive: true,
        id,
      },
    });
    return question;
  }
  static async getAll() {
    const questions = await Models("question").FindAll({
      where: {
        isActive: true,
      },
    });
    return questions;
  }
  static async create(
    payload: IQuestionCreate & {
      nextCategories?: UUID[];
    },
  ) {
    const answerType = await Models("answerType").FindOne({
      where: {
        id: payload.answerTypeId,
        isActive: true,
      },
    });
    if (!answerType) {
      throw new PlatformError("Not Found", { resource: "answerType" });
    }
    const transaction = await sequelize.transaction();
    const question = await Models("question").Create(payload, { transaction });
    if (answerType.values && payload.nextCategories) {
      const answerValues = answerType.values.split(",");
      for (const answerValue in answerValues) {
        const answerValueType = parseInt(answerValue);
        payload.nextCategories[answerValueType] &&
          (await Models("questionAnswerCategoryMapper").Create(
            {
              questionId: question.id,
              answerTypeId: answerType.id,
              answerValueType,
              categoryId: payload.nextCategories[answerValueType],
            },
            { transaction },
          ));
      }
    }
    await transaction.commit();
    return true;
  }
  static async update(id: UUID, payload: IQuestionUpdate) {
    await Models("question").Update(payload, { where: { id } });
    return true;
  }
  static async remove(id: UUID) {
    await Models("question").Update({ isActive: false }, { where: { id } });
    return true;
  }
}
