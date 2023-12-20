import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Bank } from "./bank.entity";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	ID: number;

	@Column()
	name: string;

	@Column({ default: "oddiy" })
	role: string;

	@Column()
	telegramID: string;

	@Column({ default: 500 })
	money: number;

	@OneToOne(() => Bank)
	@JoinColumn()
	bank: Bank;
}
