import { NewContext } from "../../common/types/NewContext.type";
import { BankController } from "./bank.controller";

export const BankService = {
	getBank(ctx: NewContext) {
		if (!ctx.user.bank) {
			return ctx.t("no_bank");
		}

		return ctx.t("bank", { money: ctx.user.bank.money, level: ctx.user.bank.level });
	},
	async newBank(ctx: NewContext) {
		if (ctx.user.bank) {
			return ctx.t("have_bank");
		}

		const message = await BankController.newBank(ctx.user.ID);

		if (!message.success) return ctx.t("error");

		return ctx.t("new_bank");
	},
};
