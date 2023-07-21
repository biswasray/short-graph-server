import { UUID } from "crypto";
import { Sequelize, DataTypes } from "sequelize";
import { IRole, IRoleCreate } from "../interfaces/role";
import BaseModel from "./base";

export class RoleModel extends BaseModel<IRole, IRoleCreate> implements IRole {
  roleName!: string;
  roleDesc!: string;
  id!: UUID;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
  static initModel(sequelize: Sequelize) {
    return RoleModel.init(
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
        roleName: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        roleDesc: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "role",
        timestamps: false,
        // indexes: [
        //   {
        //     name: "PRIMARY",
        //     unique: true,
        //     using: "BTREE",
        //     fields: [{ name: "id" }],
        //   },
        // ],
      },
    );
  }
}
