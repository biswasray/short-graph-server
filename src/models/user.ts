import { UUID } from "crypto";
import { Sequelize, DataTypes } from "sequelize";
import { IUser, IUserCreate } from "../interfaces/user";
import BaseModel from "./base";

export class UserModel extends BaseModel<IUser, IUserCreate> implements IUser {
  firstName!: string;
  lastName!: string;
  userName!: string;
  email!: string;
  password!: string;
  roleId!: UUID;
  lastActiveAt?: Date | undefined;
  id!: UUID;
  isActive!: boolean;
  createdAt!: Date;
  createdBy?: UUID | null;
  updatedAt!: Date;
  updatedBy?: UUID | null;
  deletedAt?: Date | undefined;
  deletedBy?: UUID | null;
  static initModel(sequelize: Sequelize) {
    return UserModel.init(
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        firstName: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        userName: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        email: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        password: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        roleId: {
          type: DataTypes.UUID,
          allowNull: false,
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: {
            model: "role",
            key: "id",
          },
        },
        lastActiveAt: {
          type: DataTypes.DATE,
          allowNull: true,
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
      },
      {
        sequelize,
        tableName: "user",
        timestamps: false,
      },
    );
  }
}
