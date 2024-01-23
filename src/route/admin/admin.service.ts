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

  static async banUser(ctx: NewContext) {
    const user = await AdminController.BanUser(ctx.message?.reply_to_message?.from?.id || 0);

    if (user) {
      return ctx.t("admin_banned", { name: user.name });
    } else {
      return ctx.t("error");
    }
  }
}
