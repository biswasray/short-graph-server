import { UUID } from "crypto";
import { IEntity, IPureEntity } from ".";

export interface IQuestion extends IEntity {
  categoryId: UUID;
  answerTypeId: UUID;
  question: string;
}

export type IQuestionCreate = IPureEntity<IQuestion>;

export type IQuestionUpdate = Partial<IQuestion>;
