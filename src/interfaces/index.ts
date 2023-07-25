import { UUID } from "crypto";

export interface IEntity {
  id: UUID;
  isActive: boolean;
  createdAt: Date;
  createdBy?: UUID | null;
  updatedAt: Date;
  updatedBy?: UUID | null;
  deletedAt?: Date | null;
  deletedBy?: UUID | null;
}

export interface IMapperEntity {
  id: UUID;
  createdAt: Date;
  createdBy?: UUID | null;
}

export type IPureEntity<T> = Omit<T, keyof IEntity>;

export type IRequireOnlyEntity<T> = Pick<
  T,
  {
    [K in keyof T]-?: undefined extends T[K] ? never : K;
  }[keyof T]
>;
