import { NextFunction } from "grammy";
import { NewContext } from "../common/types/NewContext.type";

export function ReplyGuard(ctx: NewContext, next: NextFunction) {
  if (!ctx.message?.reply_to_message) return;
  next();
}
