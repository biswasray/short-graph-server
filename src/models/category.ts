import { UUID } from "crypto";
import { Sequelize, DataTypes } from "sequelize";
import { ICategory, ICategoryCreate } from "../interfaces/category";
import BaseModel from "./base";

export class CategoryModel
  extends BaseModel<ICategory, ICategoryCreate>
  implements ICategory
{
  desc!: string;
  id!: UUID;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
  static initModel(sequelize: Sequelize) {
    return CategoryModel.init(
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
        desc: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "category",
        timestamps: false,
      },
    );
  }
}
