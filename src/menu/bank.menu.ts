import { Menu } from "@grammyjs/menu";
import { NewContext } from "../common/types/NewContext.type";
import { BankService } from "../route/bank/bank.service";

export const bankMenu = new Menu<NewContext>("bank", { onMenuOutdated: (ctx) => ctx.deleteMessage() });

bankMenu.dynamic((ctx, range) => {
	range
		.text(ctx.t("bank_take"), async (ctx) => {
			const message = await BankService.TakeMoney(ctx);
			ctx.reply(message);
		})
		.row();
	range
		.text(ctx.t("bank_upgrade"), async (ctx) => {
			const message = await BankService.UpgradeForMoney(ctx);
			ctx.reply(message);
		})
		.row();
	range
		.text(ctx.t("bank_security_upgrade"), async (ctx) => {
			const message = await BankService.UpgradeForSecrity(ctx);
			ctx.reply(message);
		})
		.row();
});
