import { DataSourceOptions } from "typeorm";
import { User } from "../../entity/user.entity";
import { Bank } from "../../entity/bank.entity";
import { Farm } from "../../entity/farm.entity";
import { VideoCard } from "../../entity/videocard.entity";
import { VideoCardModel } from "../../entity/videocardmodel.entity";
import { env } from "./env.config";

export const DBConfig: DataSourceOptions = {
	type: "mysql",
	host: env.DB_HOST,
	port: env.DB_PORT,
	username: env.DB_USER,
	password: env.DB_PASSWORD,
	database: env.DB_NAME,
	synchronize: true,
	entities: [User, Bank, Farm, VideoCard, VideoCardModel],
	connectTimeout: 20000,
	cache: true,
	bigNumberStrings: true,
	supportBigNumbers: true,
	insecureAuth: true,
};
