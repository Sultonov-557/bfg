import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bank {
	@PrimaryGeneratedColumn()
	ID: number;

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
