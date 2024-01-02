import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { VideoCard } from "./videocard.entity";

@Entity()
export class Farm {
	@PrimaryGeneratedColumn()
	ID: number;

	@Column({ default: 0 })
	bitcoin: number;

	@OneToMany(() => VideoCard, (vd) => vd.farm)
	videocards: VideoCard[];

	@OneToOne(() => User, (user) => user.farm)
	user: User;
}
