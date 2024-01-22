import { Menu } from "@grammyjs/menu";
import { NewContext } from "../common/types/NewContext.type";
import { VideoCardController } from "../route/videocards/videocard.controller";
import { VideoCardService } from "../route/videocards/videocard.service";

export const videocardShopMenu = new Menu<NewContext>("bank");

videocardShopMenu.dynamic(async (ctx, range) => {
  const models = await VideoCardController.VideoCardModels();
  if (models.success) {
    for (let model of models.videoCardModels) {
      range.text(model.type, async () => {
        ctx.reply((await VideoCardService.BuyVideoCard(ctx, model.ID)).message);
      });
    }
  }
});
