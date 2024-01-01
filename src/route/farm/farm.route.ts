import { Composer } from "grammy";
import { NewContext } from "../../common/types/NewContext.type";
import { AuthGuard } from "../../middleware/AuthGuard";

export const FarmRoute = new Composer<NewContext>();

FarmRoute.hears(/^farm$/i, AuthGuard, (ctx) => {
	ctx.user
});
