import { Bot } from "grammy";
import { NewContext } from "../types/NewContext.type";
import { balanceMenu } from "../../menu/balance.menu";
import { bankMenu } from "../../menu/bank.menu";
import { videocardShopMenu } from "../../menu/videocardShop.menu";

export const Menus = { balanceMenu, bankMenu, videocardShopMenu };
export const MenusArray = Object.values(Menus);

export function loadMenus(bot: Bot<NewContext>) {
	for (let menu of MenusArray) {
		bot.use(menu);
	}
}
