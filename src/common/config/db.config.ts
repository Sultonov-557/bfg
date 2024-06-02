import { DataSourceOptions } from "typeorm";
import { User } from "../../entity/user.entity";
import { Bank } from "../../entity/bank.entity";
import { Farm } from "../../entity/farm.entity";
import { VideoCard } from "../../entity/videocard.entity";
import { VideoCardModel } from "../../entity/videocardmodel.entity";

export const DBConfig: DataSourceOptions = {
	type: "sqlite",
	entities: [User, Bank, Farm, VideoCard, VideoCardModel],
	database: "./db.sqlite",
	synchronize: true,
};
