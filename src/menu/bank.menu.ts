import { Menu } from "@grammyjs/menu";
import { NewContext } from "../common/types/NewContext.type";
import { BankService } from "../route/bank/bank.service";

export const bankMenu = new Menu<NewContext>("bank");

bankMenu.dynamic((ctx, range) => {
	range.text(ctx.t("bank_take"), async (ctx) => {
		const message = await BankService.TakeMoney(ctx);
		ctx.reply(message);
	});
	range.text(ctx.t("bank_upgrade"));
});
