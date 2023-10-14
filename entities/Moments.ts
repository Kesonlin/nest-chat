import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Userinfo } from "./Userinfo";

@Index("ownerId", ["ownerId"], {})
@Entity("moments", { schema: "nest-chat" })
export class Moments {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", comment: "动态标题", length: 255 })
  title: string;

  @Column("varchar", { name: "content", comment: "动态内容", length: 255 })
  content: string;

  @Column("timestamp", { name: "createTime", comment: "动态创建时间" })
  createTime: Date;

  @Column("varchar", { name: "photo", comment: "动态图片", length: 255 })
  photo: string;

  @Column("bigint", { name: "ownerId", comment: "创建动态的用户id" })
  ownerId: string;

  @ManyToOne(() => Userinfo, (userinfo) => userinfo.moments, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "ownerId", referencedColumnName: "id" }])
  owner: Userinfo;
}
