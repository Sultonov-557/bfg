import { NextFunction } from "grammy";
import { Context } from "../common/types/Context.type";

export function ReplyGuard(ctx: Context, next: NextFunction) {
	if (!ctx.message?.reply_to_message) return;
	next();
}
