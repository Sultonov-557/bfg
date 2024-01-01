import { Composer } from "grammy";
import { NewContext } from "../../common/types/NewContext.type";
import { AuthGuard } from "../../middleware/AuthGuard";

export const FarmRoute = new Composer<NewContext>();

FarmRoute.hears(/^ferma$/i, AuthGuard, async (ctx) => {
});

FarmRoute.hears(/^ferma ochish$/, AuthGuard, (ctx) => {
	if (ctx.user.farm) return ctx.t("have_farm");
});
