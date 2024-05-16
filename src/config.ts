import { loadEnvFile } from "node:process";
import z from "zod";
import { parseEnv, port } from "znv";
import { API_CONSTANTS } from "grammy";

try {
  loadEnvFile();
} catch {
  // No .env file found
}

const createConfigFromEnvironment = (environment: NodeJS.ProcessEnv) => {
  const config = parseEnv(environment, {
    NODE_ENV: z.enum(["development", "production"]),
    LOG_LEVEL: z
      .enum(["trace", "debug", "info", "warn", "error", "fatal", "silent"])
      .default("info"),
    BOT_TOKEN: z.string(),

    DB_HOST:z.string(),
    DB_USER:z.string(),
    DB_PASS:z.string(),
    DB_PORT:z.number(),
    DB_NAME:z.string(),
  });

  return {
    ...config,
    isDev: process.env.NODE_ENV === "development",
    isProd: process.env.NODE_ENV === "production",
  };
};

export type Config = ReturnType<typeof createConfigFromEnvironment>;

export const config = createConfigFromEnvironment(process.env);
