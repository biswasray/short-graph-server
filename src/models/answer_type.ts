import { UUID } from "crypto";
import { Sequelize, DataTypes } from "sequelize";
import { IAnswerType, IAnswerTypeCreate } from "../interfaces/answer_type";
import BaseModel from "./base";

export class AnswerTypeModel
  extends BaseModel<IAnswerType, IAnswerTypeCreate>
  implements IAnswerType
{
  type!: string;
  values?: string | null;
  id!: UUID;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
  static initModel(sequelize: Sequelize) {
    return AnswerTypeModel.init(
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

        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        type: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        values: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "answer_type",
        timestamps: false,
      },
    );
  }
}
