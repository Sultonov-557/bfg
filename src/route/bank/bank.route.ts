import { Composer } from "grammy";
import { NewContext } from "../../common/types/NewContext.type";
import { BankService } from "./bank.service";
import { Menus } from "../../common/managers/menus.manager";
import { BankController } from "./bank.controller";

export const BankRoute = new Composer<NewContext>();

setInterval(async () => {
	await BankController.CheckUpdatesForMoney();
	await BankController.CheckUpdatesForRobbery();
}, 30000);

BankRoute.hears(/^bank$/i, async (ctx) => {
	const message = await BankService.getBank(ctx);
	if (message.keyboard) {
		ctx.reply(message.text, { reply_markup: Menus.bankMenu });
	} else {
		ctx.reply(message.text);
	}
});

BankRoute.hears(/^bank ochish$/i, async (ctx) => {
	ctx.reply(await BankService.newBank(ctx));
});
