import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Bank } from "./bank.entity";
import { Farm } from "./farm.entity";
import { RoleEnum } from "../common/enums/Role.enum";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	ID: number;

	@Column()
	name: string;

	@Column({ type: "simple-enum", enum: RoleEnum, default: RoleEnum.Normal })
	role: RoleEnum;

	@Column({ default: false })
	banned: boolean;

	@Column()
	telegramID: string;

	@Column({ default: 500 })
	money: number;

	@OneToOne(() => Bank, (bank) => bank.user)
	@JoinColumn()
	bank: Bank;

	@OneToOne(() => Farm, (farm) => farm.user)
	@JoinColumn()
	farm: Farm;
}
