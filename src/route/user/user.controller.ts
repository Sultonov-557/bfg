import { bot } from "../..";
import { DataBase } from "../../common/managers/database.manager";
import { User } from "../../entity/user.entity";

const UserRepo = DataBase.getRepository(User);

export class UserController {
	static async GetUser(ID: number) {
		const user = await UserRepo.findOneBy({ ID });

		return user;
	}

	static async Top10() {
		const top10 = await UserRepo.find({ order: { money: "DESC" }, take: 10 });
		return top10;
	}

	static async SendRobbedMessage(ID: number, success: boolean) {
		const user = await this.GetUser(ID);
		if (!user) return;
		try {
			if (success) {
				bot.api.sendMessage(user.telegramID, "Sizning bankingiz o'marildi");
			} else {
				bot.api.sendMessage(user.telegramID, "Sizning bankingizni o'marishga urunishdi");
			}
		} catch {}
	}

	static async AddMoney(ID: number, money: number) {
		const user = await UserRepo.findOneBy({ ID });
		if (!user) return false;

		user.money += money;

		await UserRepo.save(user);
		return true;
	}

	static async RemoveMoney(ID: number, money: number, ignore: boolean = false) {
		const user = await UserRepo.findOneBy({ ID });
		if (!user) return false;

		if (user.money < money && !ignore) return false;

		user.money -= money;

		if (user.money < 0 && ignore) user.money = 0;
		await UserRepo.save(user);
		return true;
	}
}
