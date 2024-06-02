import { Context } from "../../common/types/Context.type";
import { CommonController } from "./common.controller";

export class CommonService {
	static help(ctx: Context) {
		return ctx.t("help");
	}

	static async start(ctx: Context) {
		return ctx.t("start");
	}
}
