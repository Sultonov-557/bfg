import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Farm } from "./farm.entity";
import { VideoCardModel } from "./videocardmodel.entity";

@Entity()
export class VideoCard {
	@PrimaryGeneratedColumn()
	ID: number;

	@ManyToOne(() => VideoCardModel)
	@JoinColumn()
	model: VideoCardModel;

	@Column()
	time: number;

	@OneToOne(() => Farm, (farm) => farm.videocards)
	@JoinColumn()
	farm: Farm;
}
