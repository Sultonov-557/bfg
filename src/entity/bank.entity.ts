import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Bank {
	@PrimaryGeneratedColumn()
	ID: number;

	@OneToOne(() => User, (user) => user.bank)
	user: User;

	@Column({ default: 0 })
	money: number;

	@Column({ default: 1 })
	level: number;

	@Column({ default: 1 })
	securityLevel: number;

	@Column({ default: Date.now(), type: "bigint" })
	LastMoneyGivenTime: number;

	@Column({ default: Date.now(), type: "bigint" })
	LastRobberyTime: number;
}
