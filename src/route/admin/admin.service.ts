import { NewContext } from "../../common/types/NewContext.type";
import { AdminController } from "./admin.controller";

export class AdminService {
  static async getUser(ctx: NewContext) {
    const user = await AdminController.GetUser(ctx.message?.reply_to_message?.from?.id || 0);

    if (user) {
      const { ID, money, name, role } = user;
      return ctx.t("admin_info", { ID, money, name, role });
    } else {
      return ctx.t("error");
    }
  }
}
