import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Farm } from "./farm.entity";
import { VideoCardModel } from "./videocardmodel.entity";

@Entity()
export class VideoCard extends VideoCardModel {
	@ManyToOne(() => VideoCardModel)
	@JoinColumn()
	model: VideoCardModel;

	@Column()
	createdTime: number;

	@OneToOne(() => Farm, (farm) => farm.videocards)
	@JoinColumn()
	farm: Farm;
}
