import { UUID } from "crypto";
import { Sequelize, DataTypes } from "sequelize";
import BaseModel from "./base";
import { IQuestion, IQuestionCreate } from "../interfaces/question";

export class QuestionModel
  extends BaseModel<IQuestion, IQuestionCreate>
  implements IQuestion
{
  categoryId!: UUID;
  answerTypeId!: UUID;
  question!: string;
  id!: UUID;
  isActive!: boolean;
  createdAt!: Date;
  createdBy?: UUID | undefined;
  updatedAt!: Date;
  updatedBy?: UUID | undefined;
  deletedAt?: Date | undefined;
  deletedBy?: UUID | undefined;
  static initModel(sequelize: Sequelize) {
    return QuestionModel.init(
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        createdBy: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedBy: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        deletedBy: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        categoryId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        answerTypeId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        question: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "question",
        timestamps: false,
      },
    );
  }
}
