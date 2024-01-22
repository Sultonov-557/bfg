import { NewContext } from "../../common/types/NewContext.type";
import { VideoCardController } from "./videocard.controller";

export class VideoCardService {
	static async VideoCards(ctx: NewContext) {
		const videocards = await VideoCardController.videocards(ctx.user.ID);
		if (videocards) {
			return ctx.t("videocards", { videocards: videocards.join(", ") });
		} else {
			return ctx.t("no_videocards");
		}
	}

	static async ShopVideoCard(ctx: NewContext) {
		const message = await VideoCardController.VideoCardModels();
		if (message.success) {
			return { message: ctx.t("videocard_shop"), keyboard: true };
		} else {
			return { message: ctx.t("error") };
		}
	}
}
