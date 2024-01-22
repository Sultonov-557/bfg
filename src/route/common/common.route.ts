import { Composer } from "grammy";
import { NewContext } from "../../common/types/NewContext.type";
import { CommonService } from "./common.service";

export const CommonRoute = new Composer<NewContext>();

CommonRoute.hears(/^help$/i, async (ctx) => {
	ctx.reply(CommonService.help(ctx));
});

CommonRoute.hears(/^\/start$/i, async (ctx) => {
	ctx.reply(await CommonService.start(ctx));
});
