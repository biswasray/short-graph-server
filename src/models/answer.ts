import { UUID } from "crypto";
import { Sequelize, DataTypes } from "sequelize";
import BaseModel from "./base";
import { IAnswer, IAnswerCreate } from "../interfaces/answer";

export class AnswerModel
  extends BaseModel<IAnswer, IAnswerCreate>
  implements IAnswer
{
  questionId!: UUID;
  questionAnswerCategoryId?: UUID | null | undefined;
  answer!: string;
  id!: UUID;
  isActive!: boolean;
  createdAt!: Date;
  createdBy?: UUID | null;
  updatedAt!: Date;
  updatedBy?: UUID | null;
  deletedAt?: Date | undefined;
  deletedBy?: UUID | null;
  static initModel(sequelize: Sequelize) {
    return AnswerModel.init(
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
        questionId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        answer: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        questionAnswerCategoryId: {
          type: DataTypes.UUID,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "answer",
        timestamps: false,
      },
    );
  }
}
