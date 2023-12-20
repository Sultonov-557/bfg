import { NextFunction } from "grammy";
import { NewContext } from "../common/types/NewContext.type";

export async function RoleGuard(roles: string[], reply: boolean = false) {
	return (ctx: NewContext, next: NextFunction) => {
		if (roles.includes(ctx.user.role)) {
			next();
		}else{
            if(reply)ctx.reply(ctx.t("no_access"))
        }
	};
}
