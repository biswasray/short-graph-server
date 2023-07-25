// import { CoreContext } from "@theinternetfolks/context";
import PlatformError from "platform-error";
import { IUser } from "../../interfaces/user";

export default class BaseService {
  static readonly CurrentUserKey = "currentUser";
  static CurrentUser() {
    // const user = CoreContext.get<IUser | undefined>(this.CurrentUserKey);
    const user: IUser = {
      id: "a9d32142-22b4-4c1f-bc88-b89a32599eb2",
      firstName: "John",
      lastName: "Doe",
      userName: "john.doe",
      email: "john.doe@gmail.com",
      password: "Internet@123",
      roleId: "8ac8157a-7bd4-4dd5-8145-18f894f83a34",
      lastActiveAt: new Date("2023-07-21T08:00:02.472Z"),
      isActive: true,
      createdAt: new Date("2023-07-21T08:00:02.472Z"),
      createdBy: null,
      updatedAt: new Date("2023-07-21T08:00:02.472Z"),
      updatedBy: null,
      deletedAt: null,
      deletedBy: null,
    };
    if (!user) {
      throw new PlatformError("Not Found", {
        messages: "Authorized User",
      });
    }
    return user;
  }
  static CurrentUserName() {
    return this.CurrentUser()?.userName;
  }
  static CurrentUserID() {
    return this.CurrentUser()?.id;
  }
  static CurrentUserEmailID() {
    return this.CurrentUser()?.email;
  }
  static CurrentUserRoleId() {
    return this.CurrentUser()?.roleId;
  }
}
