import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("message", { schema: "nest-chat" })
export class Message {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "sender", comment: "发送者", length: 20 })
  sender: string;

  @Column("varchar", { name: "receiver", comment: "接收者", length: 20 })
  receiver: string;

  @Column("varchar", { name: "message", comment: "消息", length: 500 })
  message: string;

  @Column("datetime", { name: "time", comment: "消息发送时间" })
  time: Date;
}
