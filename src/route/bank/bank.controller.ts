import { LessThan } from "typeorm";
import { DataBase } from "../../common/managers/database.manager";
import { Bank } from "../../entity/bank.entity";
import { User } from "../../entity/user.entity";
import { UserController } from "../user/user.controller";

const UserRepo = DataBase.getRepository(User);
const BankRepo = DataBase.getRepository(Bank);

const GIVE_MONEY_TIME = 1000 * 60 * 60;
const GIVE_MONEY = 100;
const BANK_COST = 400;
const LEVEL_MULTIPLIER = 1000;
const LEVEL_COST_MULTIPLIER = 1000; 

export const BankController = {
	async newBank(ID: number) {
		const user = await UserRepo.findOne({ where: { ID } });
		if (!user) return { success: false, errcode: 1 };
		if (user.bank) return { success: false, errcode: 2 };

		if (!(await UserController.removeMoney(ID, BANK_COST))) {
			return { success: false, errcode: 3 };
		}

		const bank = BankRepo.create();
		user.bank = bank;

		await BankRepo.save(bank);
		await UserRepo.save(user);
		return { success: true };
	},
	async Upgrade(ID: number) {
		const bank = await BankRepo.findOneBy({ ID });
		if (!bank) return { success: false, errcode: 1 };
		const user = await UserRepo.findOneBy({ bank });
	},
	async GetUpdateTime(ID: number) {
		const bank = await BankRepo.findOneBy({ ID });
		if (!bank) return 0;

		return parseInt(bank.LastMoneyGivenTime + "") + GIVE_MONEY_TIME - Date.now();
	},
	async CheckUpdates() {
		const banks = await BankRepo.find({ where: { LastMoneyGivenTime: LessThan(Date.now() - GIVE_MONEY_TIME) } });
		for (let bank of banks) {
			await this.Update(bank);
		}
	},
	async Update(bank: Bank) {
		if (bank.LastMoneyGivenTime < Date.now() - GIVE_MONEY_TIME) {
			const giveCount = parseInt(bank.LastMoneyGivenTime / GIVE_MONEY_TIME + "");
			const giveMoney = parseInt((GIVE_MONEY + bank.level * LEVEL_MULTIPLIER) * giveCount + "");
			await this.AddMoney(bank.ID, giveMoney, true);
		}
	},
	async AddMoney(ID: number, amount: number, resetTime: boolean = false) {
		const bank = await BankRepo.findOneBy({ ID });
		if (!bank) return false;
		bank.money += amount;
		if (resetTime) {
			bank.LastMoneyGivenTime = Date.now();
		}

		await BankRepo.save(bank);
		return true;
	},
};
