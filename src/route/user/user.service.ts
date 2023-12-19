import { DataBase } from "../../common/managers/database.manager";
import { NewContext } from "../../common/types/NewContext.type";
import { User } from "../../entity/user.entity";



export const UserService = {
	getUser(ctx: NewContext) {
		return ctx.t("balance");
	},
	
};
