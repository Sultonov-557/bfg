import { Composer } from "grammy";
import { Context } from "../../common/types/Context.type";
import { AuthGuard } from "../../middleware/AuthGuard";
import { FarmService } from "./farm.service";

export const FarmRoute = new Composer<Context>();

FarmRoute.hears(/^ferma$/i, AuthGuard, async (ctx) => {
	const message = await FarmService.farm(ctx);
	if (message.keyboard) {
		await ctx.reply(message.message);
	} else {
		await ctx.reply(message.message);
	}
});

FarmRoute.hears(/^ferma ochish$/, AuthGuard, async (ctx) => {
	ctx.reply(await FarmService.Newfarm(ctx));
});
