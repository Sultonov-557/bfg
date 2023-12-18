import { DataSourceOptions } from "typeorm";
import { User } from "../../entity/user.entity";
import { Bank } from "../../entity/bank.entity";

export const DBConfig: DataSourceOptions = {
	type: "mysql",
	host: "localhost",
	port: 3306,
	username: "root",
	password: "root",
	database: "bfg",
	synchronize: true,
	entities: [User, Bank],
	connectTimeout: 15000,
};
