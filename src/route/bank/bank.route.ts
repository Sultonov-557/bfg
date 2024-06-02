import { Composer } from "grammy";
import { NewContext } from "../../common/types/NewContext.type";
import { BankService } from "./bank.service";

export const BankRoute = new Composer<NewContext>();



BankRoute.hears(/^bank$/i, async (ctx) => {
	
});

BankRoute.hears(/^bank ochish$/i, async (ctx) => {
	ctx.reply(await BankService.NewBank(ctx));
});
