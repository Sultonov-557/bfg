import { DataBase } from "../../common/managers/database.manager";
import { User } from "../../entity/user.entity";

const UserRepo = DataBase.getRepository(User);

export const UserController = {
	async getUser(ID: number) {
		const user = await UserRepo.findOneBy({ ID });

		return user;
	},
	async top10() {
		const top10 = await UserRepo.find({ order: { money: "DESC" }, take: 10 });
		return top10;
	},
	async removeMoney(ID: number, money: number, ignore: boolean = false) {
		const user = await UserRepo.findOneBy({ ID });
		if (!user) return false;

		if (user.money < money && !ignore) return false;

		user.money -= money;

		if (user.money < 0 && ignore) user.money = 0;
		await UserRepo.save(user);
		return true;
	},
};
