import { Composer } from "grammy";
import { NewContext } from "../../common/types/NewContext.type";
import { AuthGuard } from "../../middleware/AuthGuard";
import { BankController } from "./bank.controller";
import { BankService } from "./bank.service";

export const BankRoute = new Composer<NewContext>();

BankRoute.hears(/^bank$/i, async (ctx) => {
	ctx.reply(BankService.getBank(ctx));
});

BankRoute.hears(/^bank ochish$/, async (ctx) => {
	ctx.reply(await BankService.newBank(ctx));
});
