import { Tree } from "typeorm";
import { NewContext } from "../../common/types/NewContext.type";
import { FarmController } from "./farm.controller";

export class FarmService {
  static async farm(ctx: NewContext) {
    const farm = await FarmController.farm(ctx.user.ID);
    if (farm) {
      return { message: ctx.t("farm", { bitcoin: farm.bitcoin, videocards: farm.videocards.length }), keyboard: true };
    } else {
      return { message: ctx.t("no_farm"), keyboard: false };
    }
  }

  static async Newfarm(ctx: NewContext) {
    const message = await FarmController.newFarm(ctx.user.ID);
    if (message.errcode) {
      return ctx.t(message.errcode);
    } else {
      return ctx.t("new_farm");
    }
  }

  static async TakeBitcoin(ctx: NewContext) {
    const message = await FarmController.TakeBitcoin(ctx.user.ID);
    if (message.errcode) {
      return ctx.t(message.errcode);
    } else {
      return ctx.t("take_bitcoin");
    }
  }
}
