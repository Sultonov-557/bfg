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
}
