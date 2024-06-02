import { Composer } from "grammy";
import { NewContext } from "../../common/types/NewContext.type";
import { AuthGuard } from "../../middleware/AuthGuard";
import { VideoCardService } from "./videocard.service";

export const VideoCardRoute = new Composer<NewContext>();

VideoCardRoute.hears(/^videokartalar$/i, AuthGuard, async (ctx) => {
  ctx.reply(await VideoCardService.VideoCards(ctx));
});

VideoCardRoute.hears(/^videokarta olish$/i, AuthGuard, async (ctx) => {
  const message = await VideoCardService.ShopVideoCard(ctx);
  if (message.keyboard) {
    ctx.reply(message?.message);
  } else {
    ctx.reply(message?.message);
  }
});
