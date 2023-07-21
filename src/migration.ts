import { randomUUID } from "crypto";
import { IRoleCreate } from "./interfaces/role";
import Models from "./models";
import { IUserCreate } from "./interfaces/user";
import logger from "./utils/logger";

export async function migration() {
  const roleData: IRoleCreate[] = [
    {
      roleDesc: "Super Admin",
      roleName: "SuperAdmin",
    },
    {
      roleDesc: "Admin or Manager of Organization",
      roleName: "Admin",
    },
    {
      roleDesc: "Employee of Organization",
      roleName: "Employee",
    },
    {
      roleDesc: "Customer",
      roleName: "Client",
    },
  ];
  const createdAt = new Date();
  const roleList = (
    await Models("role").bulkBuild(
      roleData.map((role) => ({
        ...role,
        id: randomUUID(),
        isActive: true,
        createdAt,
        updatedAt: createdAt,
      })),
    )
  ).map((r) => r.toJSON());

  await Models("role").bulkCreate(roleList);

  const userPayload: IUserCreate = {
    firstName: "John",
    lastName: "Doe",
    userName: "john.doe",
    email: "john.doe@gmail.com",
    password: "Internet@123",
    lastActiveAt: new Date(),
    roleId:
      roleList.find((r) => r.roleName === "SuperAdmin")?.id || randomUUID(),
  };
  await Models("user").Create(userPayload);
  logger.info(
    `${await Models("role").count({
      where: {
        isActive: true,
      },
    })}`,
  );
}
