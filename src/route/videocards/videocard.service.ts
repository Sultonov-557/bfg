import { NewContext } from "../../common/types/NewContext.type";
import { VideoCardController } from "./videocard.controller";

export class VideoCardService {
	static async VideoCards(ctx: NewContext) {
		const videocards = await VideoCardController.VideoCards(ctx.user.ID);
		if (videocards) {
			return ctx.t("videocards", { videocards: videocards.map((v) => `${v.type} - ${v.durability}D`).join("\n") });
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

	static async BuyVideoCard(ctx: NewContext, modelID: number) {
		const message = await VideoCardController.NewVideoCard(ctx.user.ID, modelID);
		if (!message.errcode) {
			return { message: ctx.t("new_videocard") };
		} else {
			return { message: ctx.t(message.errcode) };
		}
	}
}
