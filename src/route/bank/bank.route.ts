import { Composer } from "grammy";
import { NewContext } from "../../common/types/NewContext.type";
import { AuthGuard } from "../../middleware/AuthGuard";
import { BankController } from "./bank.controller";
import { BankService } from "./bank.service";
import { Menus } from "../../common/managers/menus.manager";

export const BankRoute = new Composer<NewContext>();

BankRoute.hears(/^bank$/i, async (ctx) => {
	ctx.reply(BankService.getBank(ctx), { reply_markup: Menus.bankMenu });
});

BankRoute.hears(/^bank ochish$/, async (ctx) => {
	ctx.reply(await BankService.newBank(ctx));
});
