import { Bot } from "grammy";
import { env } from "./common/config/env.config";
import { loadRoutes } from "./common/managers/route.manager";
import { DataBase } from "./common/managers/database.manager";
import { NewContext } from "./common/types/NewContext.type";
import { I18n } from "@grammyjs/i18n";
import path from "path";
import { loadMenus } from "./common/managers/menus.manager";
import { AuthGuard } from "./middleware/AuthGuard";

start();

async function start() {
	const bot = new Bot<NewContext>(env.TOKEN);

	bot.start({
		onStart: () => {
			console.log("bot started");
		},
		drop_pending_updates: true,
	});

	bot.use(AuthGuard);

	const i18n = new I18n<NewContext>({
		defaultLocale: "uz",
		directory: path.join(__dirname, "../src/locale"),
		globalTranslationContext(ctx) {
			return { name: ctx.user.name ?? "", money: ctx.user.money ?? "" };
		},
	});

	bot.use(i18n);

	await DataBase.initialize();

	loadMenus(bot);
	loadRoutes(bot);
	console.log("bot loaded");
}
