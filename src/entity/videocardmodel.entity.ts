import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VideoCardModel {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  type: string;

  @Column()
  power: number;

  @Column()
  durability: number;

  @Column()
  cost: number;
}
