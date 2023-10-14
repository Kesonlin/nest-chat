import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Moments } from "./Moments";

@Entity("userinfo", { schema: "nest-chat" })
export class Userinfo {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "userName", comment: "姓名", length: 20 })
  userName: string;

  @Column("varchar", { name: "password", comment: "密码", length: 255 })
  password: string;

  @Column("varchar", {
    name: "avatar",
    nullable: true,
    comment: "头像",
    length: 255,
  })
  avatar: string | null;

  @Column("timestamp", {
    name: "createTime",
    nullable: true,
    comment: "创建时间",
  })
  createTime: Date | null;

  @Column("varchar", {
    name: "recentText",
    nullable: true,
    comment: "个性签名",
    length: 255,
    default: () => "'nice to meet you!'",
  })
  recentText: string | null;

  @OneToMany(() => Moments, (moments) => moments.owner)
  moments: Moments[];
}
