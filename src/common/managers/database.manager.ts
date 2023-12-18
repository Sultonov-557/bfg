import { DataSource } from "typeorm";
import { DBConfig } from "../config/db.config";

export const DataBase = new DataSource(DBConfig);
