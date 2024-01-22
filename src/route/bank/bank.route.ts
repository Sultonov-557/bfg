import { Composer } from "grammy";
import { NewContext } from "../../common/types/NewContext.type";
import { BankService } from "./bank.service";
import { Menus } from "../../common/managers/menus.manager";

export const BankRoute = new Composer<NewContext>();

BankRoute.hears(/^bank$/i, async (ctx) => {
	const message = await BankService.GetBank(ctx);
	if (message.keyboard) {
		ctx.reply(message.text, { reply_markup: Menus.bankMenu });
	} else {
		ctx.reply(message.text);
	}
});

BankRoute.hears(/^bank ochish$/i, async (ctx) => {
	ctx.reply(await BankService.NewBank(ctx));
});
