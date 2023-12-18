import { Menu } from "@grammyjs/menu";
import { NewContext } from "../common/types/NewContext.type";

export const bankMenu = new Menu<NewContext>("bank");

bankMenu.dynamic((ctx, range) => {
	range.text(ctx.t("bank_take"));
	range.text(ctx.t("bank_upgrade"));
});
