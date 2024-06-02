import { Composer } from "grammy";
import { Context } from "../../common/types/Context.type";
import { BankService } from "./bank.service";

export const BankRoute = new Composer<Context>();

BankRoute.hears(/^bank$/i, async (ctx) => {});

BankRoute.hears(/^bank ochish$/i, async (ctx) => {
	ctx.reply(await BankService.NewBank(ctx));
});
