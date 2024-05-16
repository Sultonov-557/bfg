#!/usr/bin/env tsx

import { serve } from "@hono/node-server";
import { onShutdown } from "node-graceful-shutdown";
import { createBot } from "#root/bot/index.js";
import { config } from "#root/config.js";
import { logger } from "#root/logger.js";

try {
  const bot = createBot(config.BOT_TOKEN,{});

  // graceful shutdown
  onShutdown(async () => {
    logger.info("Shutdown");

    await bot.stop();
  });

 
    await bot.start({
      onStart: ({ username }) =>
        logger.info({
          msg: "Bot running...",
          username,
        }),
    });
  
} catch (error) {
  logger.error(error);
  process.exit(1);
}
