import { UUID } from "crypto";
import { IMapperEntity, IPureEntity } from ".";

export interface IQuestionAnswerCategoryMapper extends IMapperEntity {
  questionId: UUID;
  answerTypeId: UUID;
  answerValueType: number;
  categoryId: UUID;
}

export type IQuestionAnswerCategoryMapperCreate =
  IPureEntity<IQuestionAnswerCategoryMapper>;

export type IQuestionAnswerCategoryMapperUpdate =
  Partial<IQuestionAnswerCategoryMapper>;
