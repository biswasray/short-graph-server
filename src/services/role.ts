import Models from "../models";

export default class RoleService {
  static async getAll() {
    const roles = await Models("role").FindAll({
      where: {
        isActive: true,
      },
    });
    return roles;
  }
}
