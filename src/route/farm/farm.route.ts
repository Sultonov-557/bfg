import { Composer } from "grammy";
import { NewContext } from "../../common/types/NewContext.type";
import { AuthGuard } from "../../middleware/AuthGuard";
import { FarmService } from "./farm.service";
import { Menus } from "../../common/managers/menus.manager";

export const FarmRoute = new Composer<NewContext>();

FarmRoute.hears(/^ferma$/i, AuthGuard, async (ctx) => {
  const message = await FarmService.farm(ctx);
  if (message.keyboard) {
    await ctx.reply(message.message, { reply_markup: Menus.farmMenu });
  } else {
    await ctx.reply(message.message);
  }
});

FarmRoute.hears(/^ferma ochish$/, AuthGuard, async (ctx) => {
  ctx.reply(await FarmService.Newfarm(ctx));
});
