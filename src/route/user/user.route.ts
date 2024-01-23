import { Composer } from "grammy";
import { NewContext } from "../../common/types/NewContext.type";
import { UserService } from "./user.service";
import { ReplyGuard } from "../../middleware/ReplyGuard";

export const UserRoute = new Composer<NewContext>();

UserRoute.hears(/^berish (.+)$/i, ReplyGuard, async (ctx) => {
	ctx.reply(await UserService.give(ctx));
});

UserRoute.hears(/^b$/i, async (ctx) => {
	ctx.reply(UserService.getUser(ctx));
});

UserRoute.hears(/^top$/i, async (ctx) => {
	ctx.reply(await UserService.top10(ctx));
});
