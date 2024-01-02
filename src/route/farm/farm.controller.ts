import { DataBase } from "../../common/managers/database.manager";
import { Farm } from "../../entity/farm.entity";

const FarmRepo = DataBase.getRepository(Farm);

export class FarmController {
	static async farm(farmID: number) {
		if (!farmID) return { success: false };
		const farm = await FarmRepo.findOneBy({ ID: farmID });
		if (farm) {
			return { success: true, farm };
		} else {
			return { success: false };
		}
	}
}
