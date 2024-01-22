import { NewContext } from "../../common/types/NewContext.type";
import { CommonController } from "./common.controller";

export class CommonService {
	static help(ctx: NewContext) {
		return ctx.t("help");
	}

	static async start(ctx: NewContext) {
		return ctx.t("start");
	}
}
