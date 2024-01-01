import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Farm {
	@PrimaryGeneratedColumn()
	ID: number;

	@Column()
	bitcoin: number;
}
