import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Farm } from "./farm.entity";
import { VideoCardModel } from "./videocardmodel.entity";

@Entity()
export class VideoCard extends VideoCardModel {
  @Column({ default: Date.now(), type: "bigint" })
  createdTime: number;

  @OneToMany(() => Farm, (farm) => farm.videocards)
  @JoinColumn()
  farm: Farm;
}
