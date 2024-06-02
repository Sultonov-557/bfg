import { Composer } from "grammy";
import { Context } from "../../common/types/Context.type";
import { UserService } from "./user.service";
import { ReplyGuard } from "../../middleware/ReplyGuard";

export const UserRoute = new Composer<Context>();

UserRoute.hears(/^b$/i, async (ctx) => {
	await UserService.getUser(ctx);
});

UserRoute.hears(/^top$/i, async (ctx) => {
	await UserService.top10(ctx);
});
