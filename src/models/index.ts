import { Sequelize } from "sequelize";
import { initModels } from "./init-models";

// const sequelize = new Sequelize('sqlite::memory:');
export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db/database.sqlite",
});

// sequelize.query("PRAGMA foreign_keys = false;");
sequelize.sync({ force: false });
// sequelize.query("PRAGMA foreign_keys = true;");
// sequelize.authenticate();

export const models = initModels(sequelize);

export default function Models<K extends keyof typeof models>(
  key: K,
): (typeof models)[K] {
  return models[key];
}
