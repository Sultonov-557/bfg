import { Composer } from "grammy";
import { NewContext } from "../../common/types/NewContext.type";
import { AuthGuard } from "../../middleware/AuthGuard";
import { FarmService } from "./farm.service";

export const FarmRoute = new Composer<NewContext>();

FarmRoute.hears(/^ferma$/i, AuthGuard, async (ctx) => {
	ctx.reply(await FarmService.farm(ctx));
});

FarmRoute.hears(/^ferma ochish$/, AuthGuard, async (ctx) => {
	ctx.reply(await FarmService.Newfarm(ctx));
});
