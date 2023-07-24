import Models from "../models";

export default class UserService {
  static async getAll() {
    const users = await Models("user").FindAll({
      where: {
        isActive: true,
      },
    });
    return users;
  }
}
