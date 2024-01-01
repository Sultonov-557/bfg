//IMPORTS
import { LessThan } from "typeorm";
import { DataBase } from "../../common/managers/database.manager";
import { Bank } from "../../entity/bank.entity";
import { User } from "../../entity/user.entity";
import { UserController } from "../user/user.controller";
import { randomInt } from "crypto";

//REPOSITORYIES
const UserRepo = DataBase.getRepository(User);
const BankRepo = DataBase.getRepository(Bank);

//CONSTS
const GIVE_MONEY_TIME = 1000 * 60 * 60;
const ROBBERY_TIME = 1000 * 60 * 60 * 24 * 2;
const GIVE_MONEY = 100;
const BANK_COST = 400;
const LEVEL_MULTIPLIER = 1000;
const LEVEL_COST_MULTIPLIER = 10000;
const SECURITY_COST_MULTIPLIER = 1000;

//CONTROLLER
export class BankController {
	static async newBank(ID: number) {
		const user = await UserRepo.findOne({ where: { ID } });
		if (!user) return { success: false, errcode: 1 };
		if (user.bank) return { success: false, errcode: 2 };

		if (!(await UserController.RemoveMoney(ID, BANK_COST))) {
			return { success: false, errcode: 3 };
		}

		const bank = BankRepo.create();
		user.bank = bank;

		await BankRepo.save(bank);
		await UserRepo.save(user);
		return { success: true };
	}

	static async UpgradeForMoney(ID: number) {
		const bank = await BankRepo.findOneBy({ ID });
		if (!bank) return { success: false, errcode: 1 };
		const user = await UserRepo.findOneBy({ bank });
		if (!user) return { success: false, errcode: 2 };
		const cost = bank.level * LEVEL_COST_MULTIPLIER;
		const success = await UserController.RemoveMoney(user.ID, cost);
		if (success) {
			bank.level += 1;
			await BankRepo.save(bank);
		}
		return { success, errcode: 3 };
	}

	static async UpgradeForSecurity(ID: number) {
		const bank = await BankRepo.findOneBy({ ID });
		if (!bank) return { success: false, errcode: 1 };
		const user = await UserRepo.findOneBy({ bank });
		if (!user) return { success: false, errcode: 2 };
		const cost = bank.level * SECURITY_COST_MULTIPLIER;
		const success = await UserController.RemoveMoney(user.ID, cost);
		if (success) {
			bank.securityLevel += 1;
			await BankRepo.save(bank);
		}
		return { success, errcode: 3 };
	}

	static async TakeAllMoney(ID: number) {
		const bank = await BankRepo.findOneBy({ ID });
		if (!bank) return { success: false, errcode: 1 };
		const user = await UserRepo.findOneBy({ bank });
		if (!user) return { success: false, errcode: 2 };

		if (bank.money <= 0) return { success: false, errcode: 3 };

		await UserController.AddMoney(user.ID, bank.money);
		await this.RemoveMoney(ID, bank.money);
		return { success: true };
	}

	static async GetUpdateTime(ID: number) {
		const bank = await BankRepo.findOneBy({ ID });
		if (!bank) return 0;

		return (parseInt(bank.LastMoneyGivenTime + "") + GIVE_MONEY_TIME - Date.now()) % GIVE_MONEY_TIME;
	}

	static async CheckUpdatesForMoney() {
		const banks = await BankRepo.find({ where: { LastMoneyGivenTime: LessThan(Date.now() - GIVE_MONEY_TIME) } });
		for (let bank of banks) {
			await this.UpdateForMoney(bank);
		}
	}

	static async CheckUpdatesForRobbery() {
		const banks = await BankRepo.find({ where: { LastRobberyTime: LessThan(Date.now() - ROBBERY_TIME) } });
		for (let bank of banks) {
			await this.UpdateForRobbery(bank);
		}
	}

	static async UpdateForMoney(bank: Bank) {
		if (bank.LastMoneyGivenTime < Date.now() - GIVE_MONEY_TIME) {
			const giveCount = parseInt((Date.now() - bank.LastMoneyGivenTime) / GIVE_MONEY_TIME + "");
			const giveMoney = parseInt((GIVE_MONEY + bank.level * LEVEL_MULTIPLIER) * giveCount + "");
			await this.AddMoney(bank.ID, giveMoney, true);
		}
	}

	static async UpdateForRobbery(bank: Bank) {
		if (bank.LastRobberyTime < Date.now() - ROBBERY_TIME) {
			this.PerformRobbery(bank.ID, randomInt(1, bank.securityLevel + 10));
			bank.LastRobberyTime = Date.now();
			await BankRepo.save(bank);
		}
	}

	static async PerformRobbery(ID: number, robberLevel: number) {
		const bank = await BankRepo.findOneBy({ ID });
		if (!bank) return false;
		const user = await UserRepo.findOneBy({ bank });
		if (!user) return { success: false, errcode: 2 };

		if (robberLevel > bank?.securityLevel) {
			const robbedAmount = randomInt(robberLevel * 100, robberLevel * 500);
			await this.RemoveMoney(ID, robbedAmount);
			await UserController.SendRobbedMessage(user.ID, true);
		} else {
			const robberCaughtAmount = robberLevel * 100;
			await this.AddMoney(bank.ID, robberCaughtAmount);
			await UserController.SendRobbedMessage(user.ID, false);
		}
	}

	static async AddMoney(ID: number, amount: number, resetTime: boolean = false) {
		const bank = await BankRepo.findOneBy({ ID });
		if (!bank) return false;
		bank.money += amount;
		if (resetTime) {
			bank.LastMoneyGivenTime = Date.now();
		}

		await BankRepo.save(bank);
		return true;
	}

	static async RemoveMoney(ID: number, amount: number) {
		const bank = await BankRepo.findOneBy({ ID });
		if (!bank) return false;
		bank.money -= amount;
		if (bank.money > 0) {
			const user = await UserRepo.findOneBy(bank);
			if (!user) return false;
			await UserController.RemoveMoney(user?.ID, -bank.money);
			bank.money = 0;
		}
		await BankRepo.save(bank);
		return true;
	}
}
