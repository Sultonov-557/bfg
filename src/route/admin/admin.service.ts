import { RoleEnum } from "../../common/enums/Role.enum";
import { Context } from "../../common/types/Context.type";
import { AdminController } from "./admin.controller";

export class AdminService {
	static async getUser(ctx: Context) {
		const user = await AdminController.GetUser(ctx.message?.reply_to_message?.from?.id || 0);

		if (user) {
			const { ID, money, name, role } = user;
			return ctx.t("admin_info", { ID, money, name, role });
		} else {
			return ctx.t("error");
		}
	}

	static async banUser(ctx: Context) {
		const user = await AdminController.BanUser(ctx.message?.reply_to_message?.from?.id || 0);

		if (user) {
			return ctx.t("admin_banned", { name: user.name });
		} else {
			return ctx.t("error");
		}
	}

	static async setRole(ctx: Context) {
		if (ctx.match) {
			const user = await AdminController.SetRole(ctx.message?.reply_to_message?.from?.id || 0, RoleEnum[ctx.match[1] as keyof typeof RoleEnum]);

			if (user) {
				return ctx.t("admin_setrole", { name: user.name, role: user.role });
			}
		}
		return ctx.t("error");
	}
}
