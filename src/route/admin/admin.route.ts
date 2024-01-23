import { Composer } from "grammy";
import { NewContext } from "../../common/types/NewContext.type";
import { AdminService } from "./admin.service";
import { RoleGuard } from "../../middleware/RoleGuard";
import { RoleEnum } from "../../common/enums/Role.enum";
import { ReplyGuard } from "../../middleware/ReplyGuard";

export const AdminRoute = new Composer<NewContext>();

AdminRoute.hears(/^info$/i, RoleGuard([RoleEnum.Admin], true), ReplyGuard, async (ctx) => {
  ctx.reply(await AdminService.getUser(ctx));
});

AdminRoute.hears(/^ban$/i, RoleGuard([RoleEnum.Admin], true), ReplyGuard, async (ctx) => {
  ctx.reply(await AdminService.banUser(ctx));
});

AdminRoute.hears(/^setrole (.+)$/i, RoleGuard([RoleEnum.Admin], true), ReplyGuard, async (ctx) => {
  ctx.reply(await AdminService.setRole(ctx));
});
