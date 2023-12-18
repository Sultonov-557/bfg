import { DataBase } from "../../common/managers/database.manager";
import { User } from "../../entity/user.entity";

const userRepo = DataBase.getRepository(User);

export const UserController = {
	async getUser(ID: number) {
		const user = await userRepo.findOneBy({ ID });

		return user;
	},
};
