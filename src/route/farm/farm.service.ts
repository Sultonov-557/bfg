import { NewContext } from "../../common/types/NewContext.type";
import { FarmController } from "./farm.controller";

export class FarmService {
	static async farm(ctx: NewContext) {
		const farm = await FarmController.farm(ctx.user.ID);
		if (farm) {
			return ctx.t("farm", { bitcoin: farm.bitcoin, videocards: farm.videocards.length });
		} else {
			return ctx.t("no_farm");
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
}
