import { Context as DefaultContext } from "grammy";
import { User } from "../../entity/user.entity";
import { I18nFlavor } from "@grammyjs/i18n";

export type Context = DefaultContext & { user: User } & I18nFlavor;
