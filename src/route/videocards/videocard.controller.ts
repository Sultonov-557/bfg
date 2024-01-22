import { DataBase } from "../../common/managers/database.manager";
import { VideoCard } from "../../entity/videocard.entity";
import { User } from "../../entity/user.entity";
import { VideoCardModel } from "../../entity/videocardmodel.entity";
import { Farm } from "../../entity/farm.entity";
import { UserController } from "../user/user.controller";

const VideoCardRepo = DataBase.getRepository(VideoCard);
const VideoCardModelRepo = DataBase.getRepository(VideoCardModel);
const UserRepo = DataBase.getRepository(User);
const FarmRepo = DataBase.getRepository(Farm);

export class VideoCardController {
	static async VideoCards(ID: number) {
		const user = await UserRepo.findOne({ where: { ID }, relations: ["farm.videocards"] });
		if (!user) return;

		const videocards = user.farm.videocards;
		if (videocards) {
			return videocards;
		} else {
			return;
		}
	}

	static async NewVideoCard(userID: number, videoCardModelID: number) {
		const user = await UserRepo.findOne({ where: { ID: userID }, relations: ["farm", "farm.videocards"] });
		const videoCardModel = await VideoCardModelRepo.findOneBy({ ID: videoCardModelID });
		if (!user) return { success: false, errcode: "301" };
		if (!user.farm) return { success: false, errcode: "no_farm" };
		if (!videoCardModel) return { success: false, errcode: "no_videocardmodel" };
		if (!(await UserController.RemoveMoney(userID, videoCardModel.cost))) return { success: false, errcode: "no_money" };

		const videocard = VideoCardRepo.create({ farm: user.farm, ...videoCardModel });
		user.farm.videocards.push(videocard);

		await VideoCardRepo.save(videocard);
		await FarmRepo.save(user.farm);
		return { success: true };
	}

	static async VideoCardModels() {
		const videoCardModels = await VideoCardModelRepo.find();

		return { success: true, videoCardModels };
	}

	static async Damage(ID: number, damage: number) {
		const videoCard = await VideoCardRepo.findOneBy({ ID });
		if (!videoCard) return { success: false, errcode: "no_videocard" };
		videoCard.durability -= damage;
	}
}
