import { NewContext } from "../../common/types/NewContext.type";
import { BankController } from "./bank.controller";

export class BankService {
	static async GetBank(ctx: NewContext) {
		if (!ctx.user.bank) {
			return { text: ctx.t("no_bank"), keyboard: false };
		}

		return {
			text: ctx.t("bank", {
				money: ctx.user.bank.money,
				level: ctx.user.bank.level,
				secLevel: ctx.user.bank.securityLevel
			}),
			keyboard: true,
		};
	}

	static async NewBank(ctx: NewContext) {
		if (ctx.user.bank) {
			return ctx.t("have_bank");
		}

		const message = await BankController.newBank(ctx.user.ID);

		if (!message.success) {
			if (message.errcode == 3) {
				return ctx.t("no_money");
			}
			if (message.errcode == 2) {
				return ctx.t("have_bank");
			}
		}

		return ctx.t("new_bank");
	}

	static async TakeMoney(ctx: NewContext) {
		if (!ctx.user.bank) {
			return ctx.t("no_bank");
		}

		const message = await BankController.TakeAllMoney(ctx.user.bank.ID);
		if (message.success) {
			return ctx.t("bank_take_success");
		}
		return ctx.t("bank_no_money");
	}

	static async UpgradeForMoney(ctx: NewContext) {
		if (!ctx.user.bank) {
			return ctx.t("no_bank");
		}

		const message = await BankController.UpgradeForMoney(ctx.user.bank.ID);

		if (message.success) {
			return ctx.t("bank_upgrade_success");
		} else {
			return ctx.t("no_money");
		}
	}

	static async UpgradeForSecrity(ctx: NewContext) {
		if (!ctx.user.bank) {
			return ctx.t("no_bank");
		}

		const message = await BankController.UpgradeForSecurity(ctx.user.bank.ID);

		if (message.success) {
			return ctx.t("bank_upgrade_success");
		} else {
			return ctx.t("no_money");
		}
	}
}
