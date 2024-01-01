import { Bot } from "grammy";
import { UserRoute } from "../../route/user/user.route";
import { NewContext } from "../types/NewContext.type";
import { BankRoute } from "../../route/bank/bank.route";
import { FarmRoute } from "../../route/farm/farm.route";

export const Routes = { UserRoute, BankRoute, FarmRoute };
export const RoutesArray = Object.values(Routes);

export function loadRoutes(bot: Bot<NewContext>) {
	for (let route of RoutesArray) {
		bot.use(route);
	}
}
