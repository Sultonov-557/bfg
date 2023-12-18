import { Composer } from "grammy";
import { NewContext } from "../../common/types/NewContext.type";
import { AuthGuard } from "../../middleware/AuthGuard";
import { BankController } from "./bank.controller";

export const BankRoute = new Composer<NewContext>();

BankRoute.hears(/^bank$/i, async (ctx) => {
	if (!ctx.user.bank) {
		ctx.reply(ctx.t("no_bank"));
		return;
	}

	ctx.reply(ctx.t("bank", { money: ctx.user.bank.money, level: ctx.user.bank.level }));
});

BankRoute.hears(/^bank ochish$/, async (ctx) => {
	if (ctx.user.bank) {
		ctx.reply(ctx.t("have_bank"));
		return;
	}

	const message = await BankController.newBank(ctx.user.ID);

	if (message.success) {
		ctx.reply(ctx.t("new_bank"));
	} else {
		ctx.replyWithDocument(`http://http.cat/${message.code}.jpg`, { caption: "Error code: " + message.code });
	}
});
