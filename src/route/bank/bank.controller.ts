import { DataBase } from "../../common/managers/database.manager";
import { Bank } from "../../entity/bank.entity";
import { User } from "../../entity/user.entity";

const UserRepo = DataBase.getRepository(User);
const BankRepo = DataBase.getRepository(Bank);

export const BankController = {
	async newBank(ID: number) {
		const user = await UserRepo.findOne({ where: { ID } });
		if (!user) return { success: false, code: 404 };
		if (user.bank) return { success: false, code: 304 };

		const bank = BankRepo.create();
		user.bank = bank;

		await BankRepo.save(bank);
		await UserRepo.save(user);
		return { success: true, code: 200 };
	},
};
