import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bank {
	@PrimaryGeneratedColumn()
	ID: number;

	@Column({ default: 0 })
	money: number;

	@Column({ default: 1 })
	level: number;
}
