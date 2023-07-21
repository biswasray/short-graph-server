import { IEntity, IPureEntity, IRequireOnlyEntity } from ".";

export interface IRole extends IRequireOnlyEntity<IEntity> {
  roleName: string;
  roleDesc: string;
}

export type IRoleCreate = IPureEntity<IRole>;

export type IRoleUpdate = Partial<IRole>;
