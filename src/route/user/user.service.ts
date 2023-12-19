import { NewContext } from "../../common/types/NewContext.type";
import { UserController } from "./user.controller";

export const UserService = {
	getUser(ctx: NewContext) {
		return ctx.t("balance");
	},
	async top10(ctx: NewContext) {
		const top10 = await UserController.top10();
		let list = "";
		for (let i in top10) {
			list += `${parseInt(i) + 1}. ${top10[i].name} - ${top10[i].money}\n`;
		}

		return ctx.t("top10", { list });
	},
};
