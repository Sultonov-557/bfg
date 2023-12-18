import { Context } from "grammy";
import { User } from "../../entity/user.entity";
import { I18nFlavor } from "@grammyjs/i18n";

export type NewContext = Context & { user: User } & I18nFlavor;
