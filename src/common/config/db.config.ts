import { DataSourceOptions } from "typeorm";
import { User } from "../../entity/user.entity";
import { Bank } from "../../entity/bank.entity";
import { Farm } from "../../entity/farm.entity";
import { VideoCard } from "../../entity/videocard.entity";
import { VideoCardModel } from "../../entity/videocardmodel.entity";

export const DBConfig: DataSourceOptions = {
	type: "mysql",
	host: "localhost",
	port: 3306,
	username: "root",
	password: "root",
	database: "bfg",
	synchronize: true,
	entities: [User, Bank, Farm, VideoCard, VideoCardModel],
	connectTimeout: 20000,
	cache: true,
	bigNumberStrings: true,
	supportBigNumbers: true,
};
