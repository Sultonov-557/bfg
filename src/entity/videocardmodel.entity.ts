import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VideoCardModel {
	@PrimaryGeneratedColumn()
	ID: number;

	@Column()
	type: string;

	@Column()
	Power: number;

	@Column()
	durability: number;

	@Column()
	cost: number;
}
