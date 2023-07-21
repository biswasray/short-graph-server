import { CoreContext } from "@theinternetfolks/context";
import PlatformError from "platform-error";
import { IUser } from "../../interfaces/user";

export default class BaseService {
  static readonly CurrentUserKey = "currentUser";
  static CurrentUser() {
    const user = CoreContext.get<IUser | undefined>(this.CurrentUserKey);
    // if (!user) {
    //   throw new PlatformError("Not Found", {
    //     messages: "Authorized User",
    //   });
    // }
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
