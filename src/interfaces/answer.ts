import { UUID } from "crypto";
import { IEntity, IPureEntity } from ".";

export interface IAnswer extends IEntity {
  questionId: UUID;
  questionAnswerCategoryId?: UUID | null;
  answer: string;
}

export type IAnswerCreate = IPureEntity<IAnswer>;

export type IAnswerUpdate = Partial<IAnswer>;
