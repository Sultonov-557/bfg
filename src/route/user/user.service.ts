import { NewContext } from "../../common/types/NewContext.type";

export const UserService = {
	getUser(ctx: NewContext) {
		return ctx.t("balance");
	},
};
