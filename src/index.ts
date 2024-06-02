import { Bot } from "grammy";
import { env } from "./common/config/env.config";
import { loadRoutes } from "./common/managers/route.manager";
import { DataBase } from "./common/managers/database.manager";
import { Context } from "./common/types/Context.type";
import { I18n } from "@grammyjs/i18n";
import path from "path";
import { AuthGuard } from "./middleware/AuthGuard";

export const bot = new Bot<Context>(env.TOKEN);
bot.catch(async (error) => {
	console.error(`Error: ${error.message}`);
	await error.ctx.reply("botda xatolik yuz berdi");
});
start();

async function start() {
	bot.start({
		onStart: async () => {
			console.log("bot started");

			bot.use(AuthGuard);

			const i18n = new I18n<Context>({
				defaultLocale: "en",
				directory: path.join(__dirname, "../src/locale"),
				globalTranslationContext(ctx) {
					return {
						name: ctx.user.name ?? "",
						money: ctx.user.money ?? "",
						role: ctx.user.role ?? "",
						bitcoin: ctx.user.bitcoin,
					};
				},
			});

			bot.use(i18n);

			await DataBase.initialize();

			loadRoutes(bot);
			console.log("bot loaded");
		},
		drop_pending_updates: true,
	});
}
