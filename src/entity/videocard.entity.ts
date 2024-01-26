import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Farm } from "./farm.entity";
import { VideoCardModel } from "./videocardmodel.entity";

@Entity()
export class VideoCard extends VideoCardModel {
  @Column({ default: Date.now(), type: "bigint" })
  createdTime: number;

  @ManyToOne(() => Farm, (farm) => farm.videocards)
  @JoinColumn()
  farm: Farm;
}
