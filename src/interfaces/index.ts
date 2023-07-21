import { UUID } from "crypto";

export interface IEntity {
  id: UUID;
  isActive: boolean;
  createdAt: Date;
  createdBy?: UUID;
  updatedAt: Date;
  updatedBy?: UUID;
  deletedAt?: Date;
  deletedBy?: UUID;
}

export type IPureEntity<T> = Omit<T, keyof IEntity>;

export type IRequireOnlyEntity<T> = Pick<
  T,
  {
    [K in keyof T]-?: undefined extends T[K] ? never : K;
  }[keyof T]
>;
