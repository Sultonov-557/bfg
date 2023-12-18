import { Composer } from "grammy";
import { NewContext } from "../../common/types/NewContext.type";
import { AuthGuard } from "../../middleware/AuthGuard";

export const UserRoute = new Composer<NewContext>();

UserRoute.hears(/^b$/i, async (ctx) => {
	ctx.reply(ctx.t("balance"));
});
