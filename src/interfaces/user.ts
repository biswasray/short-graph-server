import { UUID } from "crypto";
import { IEntity, IPureEntity } from ".";

export interface IUser extends IEntity {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  roleId: UUID;
  lastActiveAt?: Date;
}

export type IUserCreate = IPureEntity<IUser>;

export type IUserUpdate = Partial<IUser>;
