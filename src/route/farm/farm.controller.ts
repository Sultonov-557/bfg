import { DataBase } from "../../common/managers/database.manager";
import { Farm } from "../../entity/farm.entity";
import { User } from "../../entity/user.entity";

const FarmRepo = DataBase.getRepository(Farm);
const UserRepo = DataBase.getRepository(User);

const FARM_COST = 5000;

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

	static async updateFarms(){
		const banks = await FarmRepo.find({ where: { LastMoneyGivenTime: LessThan(Date.now() - GIVE_MONEY_TIME) } });
		for (let bank of banks) {
			await this.UpdateForMoney(bank);
		}
	}

	static async updateFarm(ID:number){
		const farm = await FarmRepo.findOneBy({ ID });
		if (!farm) return { success: false, errcode: 1 };
		const user = await UserRepo.findOneBy({ bank });
		if (!user) return { success: false, errcode: 2 };
		const cost = bank.level * LEVEL_COST_MULTIPLIER;
		const success = await UserController.RemoveMoney(user.ID, cost);
		if (success) {
			farm.level += 1;
			await FarmRepo.save(farm);
		}
		return { success, errcode: 3 };
	}
}
