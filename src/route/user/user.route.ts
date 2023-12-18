import { Composer } from "grammy";
import { NewContext } from "../../common/types/NewContext.type";
import { AuthGuard } from "../../middleware/AuthGuard";
import { UserService } from "./user.service";

export const UserRoute = new Composer<NewContext>();

UserRoute.hears(/^b$/i, async (ctx) => {
	ctx.reply(UserService.getUser(ctx));
});
