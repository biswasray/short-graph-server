import { Sequelize } from "sequelize";
import { UserModel } from "./user";
import { RoleModel } from "./role";
import { AnswerTypeModel } from "./answer_type";
import { AnswerModel } from "./answer";
import { CategoryModel } from "./category";
import { QuestionAnswerCategoryMapperModel } from "./question_answer_category_mapper";
import { QuestionModel } from "./question";
export function initModels(sequelize: Sequelize) {
  const answerType = AnswerTypeModel.initModel(sequelize);
  const answer = AnswerModel.initModel(sequelize);
  const category = CategoryModel.initModel(sequelize);
  const questionAnswerCategoryMapper =
    QuestionAnswerCategoryMapperModel.initModel(sequelize);
  const question = QuestionModel.initModel(sequelize);
  const role = RoleModel.initModel(sequelize);
  const user = UserModel.initModel(sequelize);

  question.belongsTo(answerType, {
    foreignKey: "answerTypeId",
    as: "answerType",
  });
  answerType.hasMany(question, {
    foreignKey: "answerTypeId",
    as: "questions",
  });

  question.belongsTo(category, {
    foreignKey: "categoryId",
    as: "category",
  });
  category.hasMany(question, {
    foreignKey: "categoryId",
    as: "questions",
  });

  answer.belongsTo(question, {
    foreignKey: "questionId",
    as: "question",
  });
  question.hasMany(answer, {
    foreignKey: "questionId",
    as: "answers",
  });

  questionAnswerCategoryMapper.belongsTo(category, {
    foreignKey: "categoryId",
    as: "category",
  });
  questionAnswerCategoryMapper.belongsTo(question, {
    foreignKey: "questionId",
    as: "question",
  });
  questionAnswerCategoryMapper.belongsTo(answerType, {
    foreignKey: "answerTypeId",
    as: "answerType",
  });

  user.belongsTo(role, {
    foreignKey: "roleId",
    as: "role",
  });
  role.hasMany(user, {
    foreignKey: "roleId",
    as: "users",
  });

  return {
    answerType,
    answer,
    category,
    questionAnswerCategoryMapper,
    question,
    role,
    user,
  };
}
