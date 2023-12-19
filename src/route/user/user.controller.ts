import { DataBase } from "../../common/managers/database.manager";
import { User } from "../../entity/user.entity";

const UserRepo = DataBase.getRepository(User);

export const UserController = {
	async getUser(ID: number) {
		const user = await UserRepo.findOneBy({ ID });

		return user;
	},
	async removeMoney(ID: number, money: number) {
		const user = await UserRepo.findOneBy({ ID });
		if (!user) return false;

		if (user.money < money) return false;

		user.money -= money;
		await UserRepo.save(user);
		return true;
	},
};
