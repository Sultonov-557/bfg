import { Composer } from "grammy";
import { NewContext } from "../../common/types/NewContext.type";
import { UserService } from "./user.service";

export const UserRoute = new Composer<NewContext>();

UserRoute.hears(/^b$/i, async (ctx) => {
	ctx.reply(UserService.getUser(ctx));
});

UserRoute.hears(/^top10$/i, async (ctx) => {
	ctx.reply(await UserService.top10(ctx));
});
