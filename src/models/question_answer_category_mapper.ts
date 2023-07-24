import { UUID } from "crypto";
import {
  IQuestionAnswerCategoryMapper,
  IQuestionAnswerCategoryMapperCreate,
} from "../interfaces/question_answer_category_mapper";
import BaseModel from "./base";
import { DataTypes, Sequelize } from "sequelize";

export class QuestionAnswerCategoryMapperModel
  extends BaseModel<
    IQuestionAnswerCategoryMapper,
    IQuestionAnswerCategoryMapperCreate
  >
  implements IQuestionAnswerCategoryMapper
{
  questionId!: UUID;
  answerTypeId!: UUID;
  answerValueType!: number;
  categoryId!: number;
  id!: UUID;
  createdAt!: Date;
  createdBy?: UUID | undefined;
  static initModel(sequelize: Sequelize) {
    return QuestionAnswerCategoryMapperModel.init(
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        questionId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        answerTypeId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        answerValueType: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        categoryId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "question_answer_category_mapper",
        timestamps: false,
      },
    );
  }
}
