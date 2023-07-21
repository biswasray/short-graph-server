import { Sequelize } from "sequelize";
import { UserModel } from "./user";
import { RoleModel } from "./role";
export function initModels(sequelize: Sequelize) {
  const user = UserModel.initModel(sequelize);
  const role = RoleModel.initModel(sequelize);

  user.belongsTo(role, {
    foreignKey: "roleId",
    as: "role",
  });
  role.hasMany(user, {
    foreignKey: "roleId",
    as: "users",
  });
  return { user, role };
}
