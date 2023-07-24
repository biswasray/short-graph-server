import { IEntity, IPureEntity, IRequireOnlyEntity } from ".";

export interface ICategory extends IRequireOnlyEntity<IEntity> {
  desc: string;
}

export type ICategoryCreate = IPureEntity<ICategory>;

export type ICategoryUpdate = Partial<ICategory>;
