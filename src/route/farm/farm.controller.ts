import { LessThan } from "typeorm";
import { DataBase } from "../../common/managers/database.manager";
import { Farm } from "../../entity/farm.entity";
import { User } from "../../entity/user.entity";
import { VideoCardController } from "../videocards/videocard.controller";

const FarmRepo = DataBase.getRepository(Farm);
const UserRepo = DataBase.getRepository(User);

const FARM_COST = 50000;
const GIVE_MONEY_TIME = 1000 * 60 * 60;
const GIVE_MONEY = 0.1;
const LEVEL_MULTIPLIER = 1;

export class FarmController {
	static async farm(ID: number) {
		const user = await UserRepo.findOne({ where: { ID }, relations: ["farm", "farm.videocards"] });
		if (!user) return;

		const farm = user.farm;
		if (farm) {
			return farm;
		} else {
			return;
		}
	}

	static async newFarm(userID: number) {
		const user = await UserRepo.findOneBy({ ID: userID });
		if (!user) return { success: false, errcode: "301" };
		if (user.farm) return { success: false, errcode: "have_farm" };
		if (user.money < FARM_COST) return { success: false, errcode: "no_money" };

		const farm = FarmRepo.create({ user });
		user.farm = farm;

		await FarmRepo.save(farm);
		await UserRepo.save(user);
		return { success: true };
	}

	static async UpdateFarms() {
		const banks = await FarmRepo.find({ where: { LastMoneyGivenTime: LessThan(Date.now() - GIVE_MONEY_TIME) } });
		for (let bank of banks) {
			await this.UpdateFarm(bank);
		}
	}

	static async UpdateFarm(farm: Farm) {
		if (farm.LastMoneyGivenTime < Date.now() - GIVE_MONEY_TIME) {
			const giveCount = parseInt((Date.now() - farm.LastMoneyGivenTime) / GIVE_MONEY_TIME + "");

			let level = 0;
			if (!farm.videocards) return null;
			for (let videocard of farm.videocards) {
				level += videocard.power;
				await VideoCardController.Damage(videocard.ID, giveCount);
			}
			const giveMoney = parseFloat((GIVE_MONEY * (level * LEVEL_MULTIPLIER) * giveCount).toFixed(2));
			let moneyAdded = await this.AddMoney(farm.ID, giveMoney, true);
			if (moneyAdded) {
				return moneyAdded;
			}
		}
		return null;
	}

	static async AddMoney(ID: number, amount: number, resetTime: boolean = false) {
		const farm = await FarmRepo.findOneBy({ ID });
		if (!farm) return null;
		farm.bitcoin += amount;
		if (resetTime) {
			farm.LastMoneyGivenTime = Date.now();
		}

		return await FarmRepo.save(farm);
	}
}
