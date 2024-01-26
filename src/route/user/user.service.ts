import { NewContext } from "../../common/types/NewContext.type";
import { UserController } from "./user.controller";

export class UserService {
  static getUser(ctx: NewContext) {
    return ctx.t("balance");
  }

  static async top10(ctx: NewContext) {
    const top10 = await UserController.Top10();
    let list = "";
    for (let i in top10) {
      list += `${parseInt(i) + 1}. ${top10[i].name} - ${top10[i].money}\n`;
    }

    return ctx.t("top10", { list });
  }

  static async giveMoney(ctx: NewContext) {
    const toUser = await UserController.GetUser(ctx.message?.reply_to_message?.from?.id || 0);

    if (!ctx.match) return ctx.t("error");
    if (!toUser) return ctx.t("error");

    const message = await UserController.GiveMoney(ctx.user.ID, toUser.ID, +ctx.match[1]);
    if (!message.success) return ctx.t(message.errcode);

    return ctx.t("money_give");
  }

  static async giveBitcoin(ctx: NewContext) {
    const toUser = await UserController.GetUser(ctx.message?.reply_to_message?.from?.id || 0);

    if (!ctx.match) return ctx.t("error");
    if (!toUser) return ctx.t("error");

    const message = await UserController.GiveBitcoin(ctx.user.ID, toUser.ID, +ctx.match[1]);
    if (!message.success) return ctx.t(message.errcode);

    return ctx.t("bitcoin_give");
  }
}
