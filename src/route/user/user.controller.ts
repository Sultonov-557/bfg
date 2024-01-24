import { bot } from "../..";
import { DataBase } from "../../common/managers/database.manager";
import { User } from "../../entity/user.entity";

const UserRepo = DataBase.getRepository(User);

export class UserController {
	static async GetUser(telegramID: number) {
		const user = await UserRepo.findOneBy({ telegramID: telegramID.toString() });

		return user;
	}

	static async Top10() {
		const top10 = await UserRepo.find({ order: { money: "DESC" }, take: 10 });
		return top10;
	}

	static async SendRobbedMessage(ID: number, success: boolean) {
		const user = await UserRepo.findOneBy({ ID });
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

	static async GiveMoney(fromID: number, toID: number, money: number) {
		if (fromID === toID) return { success: false, errcode: "equal_ids" };
		const remove = await this.RemoveMoney(fromID, money);
		if (!remove) return { success: false, errcode: "no_money" };
		const add = await this.AddMoney(toID, money);
		if (!add) return { success: false, errcode: "no_user" };

		return { success: true, errcode: "" };
	}

	static async RemoveMoney(ID: number, money: number, ignore: boolean = false) {
		const user = await UserRepo.findOneBy({ ID });
		if (!user) return null;

		if (user.money < money && !ignore) return null;

		user.money -= money;

		if (user.money < 0 && ignore) user.money = 0;
		return await UserRepo.save(user);
	}
}
