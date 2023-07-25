import { UUID } from "crypto";
import { ICategoryCreate, ICategoryUpdate } from "../interfaces/category";
import Models from "../models";

export default class CategoryService {
  //   static async createBulk() {
  //     const Categorys = [
  //       {
  //         desc: "Simple",
  //       },
  //       {
  //         desc: "Interested",
  //       },
  //       {
  //         desc: "Interested in Cement",
  //       },
  //       {
  //         desc: "Not interested in Cement",
  //       },
  //     ];
  //     const transaction = await sequelize.transaction();
  //     for (const Category of Categorys) {
  //       await Models("category").Create(Category, { transaction });
  //     }
  //     transaction.commit();
  //     return true;
  //   }
  static async getAll() {
    const categories = await Models("category").FindAll({
      where: {
        isActive: true,
      },
    });
    return categories;
  }
  static async create(payload: ICategoryCreate) {
    await Models("category").Create(payload);
    return true;
  }
  static async update(id: UUID, payload: ICategoryUpdate) {
    await Models("category").Update(payload, { where: { id } });
    return true;
  }
  static async remove(id: UUID) {
    await Models("category").Update({ isActive: false }, { where: { id } });
    return true;
  }
}
