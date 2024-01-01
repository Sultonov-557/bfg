import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { VideoCardModel } from "../common/enums/VIdeoCardModel.enum";
import { Farm } from "./farm.entity";

@Entity()
export class VideoCard {
	@PrimaryGeneratedColumn()
	ID: number;

	@Column({ enum: VideoCardModel, type: "enum" })
	model: VideoCardModel;

	@OneToOne(() => Farm)
	@JoinColumn()
	farm: Farm;
}
