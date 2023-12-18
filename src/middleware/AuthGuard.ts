import { NextFunction } from "grammy";
import { NewContext } from "../common/types/NewContext.type";
import { DataBase } from "../common/managers/database.manager";
import { User } from "../entity/user.entity";
import { clearString } from "../common/utils/utils";

const userRepo = DataBase.getRepository(User);

export async function AuthGuard(ctx: NewContext, next: NextFunction) {
	if (!ctx.from) return;

	const telegramID = ctx.from.id + "";

	let user = await userRepo.findOne({ where: { telegramID }, relations: ["bank"] });

	if (!user) {
		user = await userRepo.create({ name: ctx.from.username || clearString(ctx.from.first_name), telegramID });
		await userRepo.save(user);
		console.log("created user", user.name);
	}

	ctx.user = user;
	next();
}
