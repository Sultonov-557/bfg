import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VideoCardModel {
	@PrimaryGeneratedColumn()
	ID: number;

	@Column()
	name: string;

	@Column()
	Power: number;

	@Column()
	WorkTime: number;
}
