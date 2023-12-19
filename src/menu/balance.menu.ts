import { Menu } from "@grammyjs/menu";
import { NewContext } from "../common/types/NewContext.type";
import { BankService } from "../route/bank/bank.service";
import { Menus } from "../common/managers/menus.manager";

export const balanceMenu = new Menu<NewContext>("balance");

balanceMenu.text("bank", async (ctx) => {
	const message = await BankService.GetBank(ctx);
	if (message.keyboard) {
		ctx.editMessageText(message.text, { reply_markup: Menus.bankMenu });
	} else {
		ctx.editMessageText(message.text);
	}
});
