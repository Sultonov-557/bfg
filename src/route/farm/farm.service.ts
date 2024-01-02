import { NewContext } from "../../common/types/NewContext.type";
import { FarmController } from "./farm.controller";

export class FarmService {
	static async farm(ctx: NewContext) {
		const message = await FarmController.farm(ctx.user.farm.ID);
		if (message.success) {
			return ctx.t("farm");
		} else {
			return ctx.t("no_farm");
		}
	}
}
