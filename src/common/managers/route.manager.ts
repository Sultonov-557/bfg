import { Bot } from "grammy";
import { UserRoute } from "../../route/user/user.route";
import { Context } from "../types/Context.type";
import { BankRoute } from "../../route/bank/bank.route";
import { FarmRoute } from "../../route/farm/farm.route";
import { VideoCardRoute } from "../../route/videocards/videocard.route";
import { CommonRoute } from "../../route/common/common.route";
import { AdminRoute } from "../../route/admin/admin.route";

export const Routes = { UserRoute, BankRoute, FarmRoute, CommonRoute, VideoCardRoute, AdminRoute };
export const RoutesArray = Object.values(Routes);

export function loadRoutes(bot: Bot<Context>) {
	for (let route of RoutesArray) {
		bot.use(route);
	}
}
