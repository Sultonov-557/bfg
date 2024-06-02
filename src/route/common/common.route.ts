import { Composer } from "grammy";
import { Context } from "../../common/types/Context.type";
import { CommonService } from "./common.service";

export const CommonRoute = new Composer<Context>();

CommonRoute.hears(/^help$/i, async (ctx) => {
	ctx.reply(CommonService.help(ctx));
});

CommonRoute.hears(/^\/start$/i, async (ctx) => {
	ctx.reply(await CommonService.start(ctx));
});
