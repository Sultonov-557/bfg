import { NextFunction } from "grammy";
import { Context } from "../common/types/Context.type";
import { RoleEnum } from "../common/enums/Role.enum";

export function RoleGuard(roles: RoleEnum[], reply: boolean = false) {
	return (ctx: Context, next: NextFunction) => {
		if (roles.includes(ctx.user.role)) {
			next();
		} else {
			if (reply) ctx.reply(ctx.t("no_access"));
		}
	};
}
