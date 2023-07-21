import { Sequelize } from "sequelize";
import { initModels } from "./init-models";

// const sequelize = new Sequelize('sqlite::memory:');
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "path/to/database.sqlite",
});

(async function () {
  // await sequelize.query("PRAGMA foreign_keys = false;");
  // await sequelize.sync({ force: true });
  // await sequelize.query("PRAGMA foreign_keys = true;");
  await sequelize.authenticate();
})();
//

export const models = initModels(sequelize);

export default function Models<K extends keyof typeof models>(
  key: K,
): (typeof models)[K] {
  return models[key];
}
