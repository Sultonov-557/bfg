import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Farm {
	@PrimaryGeneratedColumn()
	ID: number;

	@Column()
	bitcoin: number;

	@OneToOne(() => User, (user) => user.farm)
	user: User;
}
