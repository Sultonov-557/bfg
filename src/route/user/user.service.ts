import { Context } from "../../common/types/Context.type";
import { mainMenu } from "../../menu/main.menu";
import { UserController } from "./user.controller";

export class UserService {
	static getUser(ctx: Context) {
		ctx.reply(ctx.t("balance"), { reply_markup: mainMenu });
	}

	static async top10(ctx: Context) {
		const top10 = await UserController.Top10();
		let list = "";
		for (let i in top10) {
			list += `${parseInt(i) + 1}. ${top10[i].name} - ${top10[i].money}\n`;
		}

		return ctx.t("top10", { list });
	}

	static async giveMoney(ctx: Context) {
		const toUser = await UserController.GetUser(ctx.message?.reply_to_message?.from?.id || 0);

		if (!ctx.match) return ctx.t("error");
		if (!toUser) return ctx.t("error");

		const message = await UserController.GiveMoney(ctx.user.ID, toUser.ID, +ctx.match[1]);
		if (!message.success) return ctx.t(message.errcode);

		return ctx.t("money_give");
	}

	static async giveBitcoin(ctx: Context) {
		const toUser = await UserController.GetUser(ctx.message?.reply_to_message?.from?.id || 0);

		if (!ctx.match) return ctx.t("error");
		if (!toUser) return ctx.t("error");

		const message = await UserController.GiveBitcoin(ctx.user.ID, toUser.ID, +ctx.match[1]);
		if (!message.success) return ctx.t(message.errcode);

		return ctx.t("bitcoin_give");
	}
}
