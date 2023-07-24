import { IEntity, IPureEntity, IRequireOnlyEntity } from ".";

export interface IAnswerType extends IRequireOnlyEntity<IEntity> {
  type: string;
  values?: string | null;
}

export type IAnswerTypeCreate = IPureEntity<IAnswerType>;

export type IAnswerTypeUpdate = Partial<IAnswerType>;
