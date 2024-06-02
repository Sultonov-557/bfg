import { DataSource } from "typeorm";
import { DBConfig } from "../config/db.config";
import { User } from "../../entity/user.entity";
import { Bank } from "../../entity/bank.entity";
import { Farm } from "../../entity/farm.entity";
import { VideoCard } from "../../entity/videocard.entity";
import { VideoCardModel } from "../../entity/videocardmodel.entity";

export const DataBase = new DataSource(DBConfig);

export const UserRepo = DataBase.getRepository(User);
export const BankRepo = DataBase.getRepository(Bank);
export const FarmRepo = DataBase.getRepository(Farm);
export const VideoCardRepo = DataBase.getRepository(VideoCard);
export const VideoCardModelRepo = DataBase.getRepository(VideoCardModel);
