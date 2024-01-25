import { Menu } from "@grammyjs/menu";
import { NewContext } from "../common/types/NewContext.type";
import { FarmService } from "../route/farm/farm.service";
import { VideoCardService } from "../route/videocards/videocard.service";
import { Menus } from "../common/managers/menus.manager";

export const farmMenu = new Menu<NewContext>("farm", { onMenuOutdated: (ctx) => ctx.deleteMessage() });

farmMenu.dynamic((ctx, range) => {
  range
    .text(ctx.t("farm_take"), async (ctx) => {
      const message = await FarmService.TakeBitcoin(ctx);
      ctx.reply(message);
    })
    .row();
  range
    .text(ctx.t("videocard_shop"), async (ctx) => {
      const message = await VideoCardService.ShopVideoCard(ctx);
      if (message.keyboard) {
        await ctx.reply(message.message, { reply_markup: Menus.videocardShopMenu });
      } else {
        await ctx.reply(message.message);
      }
      ctx.deleteMessage();
    })
    .row();
});
