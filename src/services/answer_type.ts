import { UUID } from "crypto";
import {
  IAnswerTypeCreate,
  IAnswerTypeUpdate,
} from "../interfaces/answer_type";
import Models from "../models";

export default class AnswerTypeService {
  //   static async createBulk() {
  //     const answerTypes = [
  //       {
  //         type: "String",
  //       },
  //       {
  //         type: "Boolean",
  //       },
  //       {
  //         type: "YesOrNo",
  //         values: "yes,no",
  //       },
  //     ];
  //     const transaction = await sequelize.transaction();
  //     for (const answerType of answerTypes) {
  //       await Models("answerType").Create(answerType, { transaction });
  //     }
  //     transaction.commit();
  //     return true;
  //   }
  static async getAll() {
    const answerTypes = await Models("answerType").FindAll({
      where: {
        isActive: true,
      },
    });
    return answerTypes;
  }
  static async create(payload: IAnswerTypeCreate) {
    await Models("answerType").Create(payload);
    return true;
  }
  static async update(id: UUID, payload: IAnswerTypeUpdate) {
    await Models("answerType").Update(payload, { where: { id } });
    return true;
  }
  static async remove(id: UUID) {
    await Models("answerType").Update({ isActive: false }, { where: { id } });
    return true;
  }
}
