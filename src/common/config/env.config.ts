import { config } from "dotenv";
import { cleanEnv, num, str } from "envalid";

config();

export const env = cleanEnv(process.env, { TOKEN: str(), DB_NAME: str(), DB_USER: str(), DB_PASSWORD: str(), DB_HOST: str(), DB_PORT: num() });
